import axios from 'axios';

/**
 * A simple wrapper for console
 */
export const logger = console;

const headers = {
    'Content-Type': 'application/json'
};
export const axiosConfig = axios.create({
    baseURL: 'http://api.tvmaze.com/',
    headers
});

export const destructureData = (data) => {
    const {
        id, name, url, genres, rating, premiered, weight, officialSite, image, summary, status
    } = data;
    return {
        id, name, url, genres, rating, premiered, weight, officialSite, image, summary, status
    }
}
