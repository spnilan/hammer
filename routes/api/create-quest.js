const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { auth } = require('../../middleware/auth')
const { AppError, catchAsync } = require('../../middleware/error')
const User = require('../../models/User')
const Quest = require('../../models/Quest')
const QuestPage = require('../../models/QuestPage')
const PageElement = require('../../models/PageElement');
const UserQuest = require('../../models/UserQuest')
const { deleteUserQuest } = require('./shared')

/*
const authQuestOwner =  catchAsync(async (req, res, next) => {
    let quest = await Quest.find({ id: req.params.questId, user: req.user.id })
    if (!quest) next(App)
    req.quest = quest;
    next();
})
*/



router.post('/', auth, catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user.id);
    if (!user) next(AppError.USER_NOT_FOUND);

    let quest = new Quest({
        creator: user.id,
        title: req.body.title
    });
    await quest.save();
    res.json({
        questId: quest.id
    })
}));



router.post('/hack', auth, 
catchAsync(async (req, res, next) => {

    let pages = req.body.pages;

    let user = await User.findById(req.user.id);
    if (!user) return next(AppError.USER_NOT_FOUND);

    let quest = new Quest({
        title: req.body.title || "MyQuest",
        creator: req.user.id
    });

    console.log("first page", pages[0]);
    let pageIds = [];
    for (let i = 0; i < pages.length; i++) {
        let { hint, mapIcon}  = pages[i];
        let elementIds = [];
        for (let j = 0; j < pages[i].elements.length; j++) {
            let element = new PageElement(pages[i].elements[j]);
            await element.save();
            elementIds.push(element.id);

        }
        let page = new QuestPage({
            mapIcon: mapIcon,
            hint: hint,
            elements: elementIds
        })
        await page.save();
        pageIds.push(page.id);
    }

    quest.pages = pageIds;
    await quest.save();
    res.json(quest);
}))



router.get('/', auth, catchAsync(async (req, res, next) => {
    let quests = await Quest.find({ creator: req.user.id })
                                .populate('pages');
    return res.json(quests);
}))


// update order of pages
router.put('/:questId', auth, async (req, res) => {

});


// create new page
router.post('/:questId', auth, async (req, res) => {
    try {
        let page = new QuestPage({
            questId: req.quest.id,
            elements: []
        });

        await page.save();
        return res.json({ page : page });

    } catch (error) {
        console.log(error);
    }


});

// create new element
router.post('/:questId/:pageId', auth, async (req, res) => {

});


// DELETE
router.delete('/:questId', auth, catchAsync(async (req, res, next) => {

    let questId = req.params.questId;
    let user = await User.findById(req.user.id);
    if (!user) return next(AppError.USER_NOT_FOUND);
    let quest = await Quest.findById(questId)
                        .populate('pages');
    if (!quest) return next(AppError.QUEST_NOT_FOUND);

    if (quest.creator.toString() !== req.user.id) return next(AppError.INVALID_CREDENTIALS);

    let userQuests = await UserQuest.find({ quest: questId })
    for (let i = 0; i < userQuests.length; i++) {
        let userQuest = userQuests[i];
        deleteUserQuest(userQuest);
    }

    console.log("quest", quest)
    console.log("pages", quest.pages);
    for (let i = 0; i < quest.pages.length; i++) {
        let page = quest.pages[i];
        for (let j = 0; j < page.elements.length; j++) {
            let elementId = page.elements[j];
            await PageElement.findByIdAndRemove(elementId);
        }
        await QuestPage.findByIdAndRemove(page.id);
    }
    await Quest.findByIdAndRemove(quest.id);
    
    return res.json({ msg: "Successfully deleted"})
}))



module.exports = router;