const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        getAllShows(name: String): [Show!]
        getSingleShow(id: Int!): Show!
        getFavoriteShows(userEmail: String!): [ScheduledShow!]
        getAllShowsInUserSchedule(userEmail: String!): [ScheduledShow!]
    }
    type Show {
        id: Int
        name: String
        url: String
        genres: [String]
        rating: Rating
        premiered: String
        weight: Int
        officialSite: String
        image: Image
        summary: String
        status: String
    }

    input TvShow {
        name: String
    }

    type ShowSchedule {
        show: [Show!]
    }

    type FavoriteShows {
        shows: [Show!]
    }

    type Comment {
        _id: String!
        show: Show!
        body: String!
    }

    type Crew {
        type: String!
        person: Person!
    }

    type Person {
        id: String!
        name: String!
        gender: String!
        image: Image!
        birthday: String!
    }

    type Image {
        medium: String!
        original: String!
    }

    input ScheduledShowInput {
        userEmail: String!,
        name: String!,
        url: String!,
        summary: String!,
        premiered: String!,
        image: String!
    }

    type ScheduledShow {
        _id: String
        userEmail: String!,
        name: String!,
        url: String!,
        comment: String!,
        favorite: Boolean!
        summary: String,
        premiered: String!,
        image: String!
    }

    type Rating {
        average: String
    }

    input ShowComment {
        id: String!
        comment: String!
    }
    
    type LoginData {
        token: String!
        message: String!
        status: String!
    }
    type SignupResponse {
        message: String!
    }

    type Mutation {
        AddTvShowToSchedule(data: ScheduledShowInput!): ScheduledShow!
        RemoveTvShowFromSchedule(id: String!): Boolean!
        favoriteShow(id: String!): Boolean!
        AddCommentToShow(data: ShowComment!): Boolean
        Login(email: String!, password: String!): LoginData!
        Signup(email: String!, password: String!): SignupResponse!
    }

    schema {
        mutation: Mutation, query: Query
    }
`;

export default  typeDefs;

