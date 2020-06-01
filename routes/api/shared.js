async function deleteUserQuest(userQuest) {
    try {
        let user = await User.findById(userQuest.user);
        console.log(user.quests[0].toString(), userQuest.id);
        if (!user || !user.quests.find(id => id.toString() === userQuest.id)) {
            return user;
        }

        console.log("deleting user quest");

        if (userQuest) {
            for (let i = 0; i < userQuest.pages.length; i++) {
                let userPageID = userQuest.pages[i];
                await UserQuestPage.findByIdAndRemove(userPageID)
            }

            user.quests = user.quests.filter(id => id.toString() !== userQuest.id);
            await user.save();
            await UserQuest.findByIdAndRemove(userQuest.id);
        }
        return user;
    } catch (error) {
        console.log(error);
    }
    
}


module.exports = {
    deleteUserQuest
}