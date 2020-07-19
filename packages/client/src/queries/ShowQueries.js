import { gql } from 'apollo-boost';

export const GET_ALL_SHOWS = gql `
    query($name: String) {
        getAllShows(name: $name) {
            id
            name
            url
            image {
                medium
            }
            genres
            summary
            premiered
        }
    }
`;

export const GET_ALL_SHOWS_IN_SCHEDULE = gql `
    query($userEmail: String!) {
        getAllShowsInUserSchedule(userEmail: $userEmail) {
            _id
            name
            userEmail
            url
            image
            summary
            premiered
            favorite
            __typename @skip(if: true)
        }
    }
`;

