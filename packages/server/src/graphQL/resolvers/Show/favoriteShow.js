import Schedule from "../../../models/schedule";

/**
 * Adds show to list of favorited shows
 * @param _
 * @param req
 * @returns {Promise<boolean>}
 */
export const favoriteShow = async  (_ , req) => {
    try {
         await Schedule.updateOne({ _id: req.id }, {
            $set: {
                favorite: true
            }
        }, { upsert: true });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 * Lists all favorited shows belonging to a user
 * @param _
 * @param req
 * @returns {Promise<*>}
 */
export const getFavoriteShows = async (_, req) => {
    try {
        return await Schedule.find({ userEmail: req.userEmail, favorite: true });
    } catch(err) {
        console.error(err)
    }
}
