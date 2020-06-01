const express = require('express')
const router = express.Router()
const { auth } = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Quest = require('../../models/Quest')
const QuestPage = require('../../models/QuestPage')
const PageElement = require('../../models/PageElement');
const UserQuest = require('../../models/UserQuest')
const UserQuestPage = require('../../models/UserQuestPage')

const { catchAsync, AppError } = require('../../middleware/error')
const { deleteUserQuest } = require('./shared');
const { validateFunction } = require('./validation');


const HINT_TIMEOUT  = 30; // 30 minutes


// @route       GET api/quest
// @desc        Get all user quests
router.get('/', auth, catchAsync(async (req, res, next) => {
        // Want to preserve order for the user
    let user = await User.findById(req.user.id)
                            .populate('quests');
    if (!user) return next(AppError.USER_NOT_FOUND);
    console.log("quests", user.quests);
    return res.json(user.quests);
}));


async function loadUserPage(userQuest, pageIndex) {
    try {

        console.log("load next page", )
        if (userQuest[pageIndex]) return userQuest;
        let quest = await Quest.findById(userQuest.quest);
        if (pageIndex >= quest.pages.length) {
            userQuest.completed = true;
            await userQuest.save();
            return userQuest;
        }

        let questPage = await QuestPage.findById(quest.pages[pageIndex]);
        let userPage = new UserQuestPage({
            mapIcon: questPage.mapIcon,
            questPage: questPage.id
        });
        let elementIds = questPage.elements;

        for (let j = 0; j < elementIds.length; j++) {
            // Show the first element on the page
            let element = await PageElement.findById(elementIds[j]);
            let wrappedElement = {
                element: elementIds[j],
                shown: (j === 0),
                completed: false
            }
            if (element.validation) {
                wrappedElement.validation = {
                    value: element.validation.defaultValue || ""
                }
            }
            userPage.elements.push(wrappedElement);
        }

        await userPage.save();
        userQuest.pages.push(userPage.id);
        //userQuest.pages[pageIndex] = userPage.id;
        userQuest.hasSeenNewestPage = false;
        await userQuest.save();
        return userQuest;
        
    } catch (error) {
        console.log(error);
    }
    
}

// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.post('/add/:questId', auth, catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user.id);
    if (!user) return next(AppError.USER_NOT_FOUND);
    let quest = await Quest.findById(req.params.questId);
    if (!quest) return next(AppError.QUEST_NOT_FOUND);

    //let questStartTime = quest.startTime || Date.now();

    let newQuest = new UserQuest({
        quest: quest.id,
        user: user.id,
        title: quest.title,
        totalSteps: quest.pages.length,
        timeLimitMinutes: quest.timeLimitMinutes,
        pages: []
    });

    await newQuest.save();
    
    // loads the first page into userquest
    await loadUserPage(newQuest, 0);

    user.quests.push(newQuest.id);
    await user.save();
    res.json(user.quests);
}));



// DELETE UserQuest
// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.delete('/:userQuestId', auth, catchAsync(async (req, res, next) => {
    let userQuest = await UserQuest.findById(req.params.userQuestId);
    if (!userQuest) return next(AppError.USER_QUEST_NOT_FOUND);
    if (userQuest.user.toString() !== req.user.id) return next(AppError.INVALID_CREDENTIALS);
    let user = await deleteUserQuest(userQuest);
    return res.json(user.quests);
}));



// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.get('/:questId', auth, catchAsync(async (req, res, next) => {
    let quest = await UserQuest.findOne({ _id: req.params.questId , user: req.user.id});
    if (!quest) return next(AppError.USER_QUEST_NOT_FOUND)
    if (!quest.timeStarted) {
        quest.timeStarted = Date.now();
        await quest.save();
    }

    quest = await UserQuest.findById(req.params.questId).populate("pages");
    res.json(quest);
    quest.hasSeenNewestPage = true;
    await quest.save();
}))


// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.get('/:questId/:pageId', auth, catchAsync(async (req, res, next) => {
    let quest = await UserQuest.findOne({ _id: req.params.questId, user: req.user.id });
    if (!quest) return next(AppError.USER_QUEST_NOT_FOUND)

    let pageId = quest.pages.find(id => id.toString() === req.params.pageId);

    if (!pageId) return next(AppError.USER_QUEST_PAGE_NOT_FOUND)

    // check if first time the page has been loaded
    let page = await UserQuestPage.findById(pageId);
    if (!page) return next(AppError.USER_QUEST_PAGE_NOT_FOUND)
    if (!page.timeStarted) {
        page.timeStarted = Date.now();
        await page.save();
    }
    quest.currentPage = pageId;
    await quest.save();

    page = await UserQuestPage.findById(pageId)
                                    .populate('elements.element', '-validation');
    res.json(page);

}))


// @route       GET /api/quest/:questId/:pageId/hint
// @desc        Get hint for user quest page
router.get('/:questId/:pageId/hint', auth, catchAsync(async (req, res, next) => {
    
    let hintTimeout = HINT_TIMEOUT * 60 * 1000; // 30 minutes in milliseconds
    console.log("getting hint")
    console.log(req.params.questId, req.params.pageId);
    let quest = await UserQuest.findOne({ _id: req.params.questId, user: req.user.id });
    if (!quest) return next(AppError.USER_QUEST_NOT_FOUND)

    let pageId = quest.pages.find(id => id.toString() === req.params.pageId);
    if (!pageId) return next(AppError.USER_QUEST_PAGE_NOT_FOUND)


    let page = await UserQuestPage.findById(pageId);
    if (!page) return next(AppError.USER_QUEST_PAGE_NOT_FOUND);
    console.log("here i am");

    let timeStarted = page.timeStarted ? (new Date(page.timeStarted)).getTime() : null;

    if (timeStarted && timeStarted + hintTimeout < Date.now()) {
        console.log("got here");
        let questPage = await QuestPage.findById(page.questPage);
        if (questPage) {
            page.hint = questPage.hint;
            await page.save();
        } else {
            console.log("uh oh");
        }
    }
    res.json({
        id: pageId,
        hint: page.hint
    })

}))



// VALIDATE USERPAGE ELEMENT
// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.put('/:questId/:pageId/:elementId/validate', auth, catchAsync(async (req, res, next) => {

    let elementId = req.params.elementId;
    let inputValue = req.body.value;
    console.log("VALIDATE ELEMENT", req.body);


    let quest = await UserQuest.findOne({ _id: req.params.questId, user: req.user.id });
    if (!quest) return next(AppError.USER_QUEST_NOT_FOUND);

    let pageId = quest.pages.find(id => id.toString() === req.params.pageId);
    if (!pageId) return next(AppError.USER_QUEST_PAGE_NOT_FOUND);

    let page = await UserQuestPage.findById(pageId);
    let index = page.elements.findIndex(e => e.element.toString() === elementId)
    if (index === -1) return next(AppError.ELEMENT_NOT_FOUND);
    
    let wrappedElement = page.elements[index];

    console.log("valwrapped", wrappedElement);
    if (!wrappedElement.shown  || !wrappedElement.validation) return next(AppError.ELEMENT_VALIDATION_ERROR);
    
    if (!wrappedElement.validation.validated) {
        let element = await PageElement.findById(elementId);
        if (!element) return next(AppError.ELEMENT_NOT_FOUND);
        let validated = validateFunction(element.validation, inputValue);
        console.log("validated", validated);
        wrappedElement.validation = {
            validated: validated,
            value: inputValue
        } 
    }
    // if the element has already been validated, just return things as normal

    page.elements[index] = wrappedElement;
    console.log(page.elements[index]);
    await page.save();
    return res.json(page.elements[index]);

}))



// COMPLETE USERPAGE ELEMENT
// @route       POST api/quest/add/:questId
// @desc        Create UserQuest for logged in user
router.put('/:questId/:pageId/:elementId/complete', auth, catchAsync(async (req, res, next) => {
    let elementId = req.params.elementId;

    console.log("COMPLETE ELEMENT", req.body);

    let quest = await UserQuest.findOne({ _id: req.params.questId, user: req.user.id });
    if (!quest) return next(AppError.USER_QUEST_NOT_FOUND);

    let pageIndex = quest.pages.findIndex(id => id.toString() === req.params.pageId);
    if (pageIndex === -1) return next(AppError.USER_QUEST_PAGE_NOT_FOUND);
    let pageId = quest.pages[pageIndex];

    let page = await UserQuestPage.findById(pageId);
    let index = page.elements.findIndex(e => e.element.toString() === elementId)
    if (index === -1) return next(AppError.ELEMENT_NOT_FOUND);
    
    let wrappedElement = page.elements[index];
    if (!wrappedElement.shown) return next(AppError.ELEMENT_COMPLETION_ERROR);
    if (wrappedElement.validation && !wrappedElement.validation.validated) {
        return next(AppError.ELEMENT_COMPLETION_ERROR);
    }
    // already completed
    if (wrappedElement.completed) {
        return res.json(page.elements[index]);
    }

    console.log("complete made it here");

    wrappedElement.completed = true;
    page.elements[index] = wrappedElement;
    await page.save();
    // Find next index and show it
    if (index + 1 < page.elements.length) {
        page.elements[index + 1].shown = true;
        await page.save();
    } else {
        page.endTime = Date.now();
        page.completed = true;
        await page.save();
        loadUserPage(quest, pageIndex + 1);
    }

    console.log(page.elements);
    return res.json(page.elements[index]);
}))

module.exports = router;