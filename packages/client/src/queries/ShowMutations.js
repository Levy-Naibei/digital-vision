import { gql } from 'apollo-boost';

export const FAVORITE_SHOW = gql `
    mutation($id: String!) {
        favoriteShow(id: $id)
    }
`;


export const ADD_COMMENT_TO_SHOW = gql `
    mutation($id: String!, $comment: String!) {
        AddCommentToShow(data: {
            id: $id,
            comment: $comment
        })
    }
`;

export const ADD_TV_SHOW_TO_SCHEDULE = gql `
    mutation($userEmail: String!,
    $name: String!,
    $url: String!,
    $summary: String!,
    $premiered: String!,
    $image: String!) {
        AddTvShowToSchedule(data: {
            userEmail: $userEmail
            name: $name,
            url: $url,
            summary: $summary,
            premiered: $premiered,
            image: $image
        }) {
            _id
            userEmail
            name
            url
            summary
        }
    }
`;

