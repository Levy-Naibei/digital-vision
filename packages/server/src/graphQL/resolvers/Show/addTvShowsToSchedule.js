import Schedule from "../../../models/schedule";

/**
 * Adds tv show to schedule
 * @param _
 * @param req the request from graphql
 * @returns {Promise<*>}
 * @constructor
 */
export const AddTvShowToSchedule = async (_ , req) => {
    if(req && req.hasOwnProperty('data')) {
        try {
            return await Schedule.findOneAndUpdate({name: req.data.name, userEmail: req.data.userEmail},
                {
                    $setOnInsert: req.data,
                },
                {
                    returnOriginal: false,
                    upsert: true,
                });
        } catch(err) {
            console.error(err)
        }
    }
}

/**
 * Removes tv show from schedule
 * @param _
 * @param req
 * @returns {Promise<boolean>}
 * @constructor
 */
export const RemoveTvShowFromSchedule = async(_, req) => {
    if(req && req.hasOwnProperty('id')) {
        try {
            await Schedule.findOneAndDelete( { _id: req.id })
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }
}
