import Schedule from "../../../models/schedule";

/**
 * Adds a comment to a show watched
 * @param _
 * @param req
 * @returns {Promise<boolean>}
 * @constructor
 */
export const AddCommentToShow = async (_, req) => {
    try {
        await Schedule.updateOne({ _id: req.data.id }, {
            $set: {
                comment: req.data.comment
            }
        }, { upsert: true });
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
