import { axiosConfig, destructureData } from '../../../utils';
import Schedule from "../../../models/schedule";

/**
 * Fetches all shows from the API
 * @returns {Promise<*>}
 */
const getAllShows = async (_, req) => {
    try {
        console.log(req.name)
        const dataUrl = req && req.hasOwnProperty('name') && req.name !== "" ? `search/shows?q=:${req.name}`: 'shows'
        const { data } = await axiosConfig.request({
            method: 'get',
            url: `/${dataUrl}`
        });
        return data.map((show) => {
            return req && req.hasOwnProperty('name') && req.name !== "" ? destructureData(show.show): destructureData(show)
        });
    } catch (err) {
        throw err;
    }
};

/**
 * Fetches a single show from the API
 * @returns {Promise<*>}
 */
const getSingleShow = async (_ , req) => {
    try {
        const { data } = await axiosConfig.request({
            method: 'get',
            url: `/shows/${req.id}`
        });
        return destructureData(data)
    } catch (err) {
        throw err;
    }
};

/**
 * returns a list of shows in user schedule
 * @param _
 * @param req
 * @returns {Promise<*>}
 */
export const getAllShowsInUserSchedule = async (_, req) => {
    try {
        return await Schedule.find({ userEmail: req.userEmail });
    } catch(err) {
        console.error(err)
    }
}


export { getSingleShow, getAllShows };
