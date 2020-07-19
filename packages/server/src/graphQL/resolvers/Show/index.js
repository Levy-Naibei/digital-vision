import { getSingleShow, getAllShows, getAllShowsInUserSchedule } from './getAllShows';
import { AddTvShowToSchedule, RemoveTvShowFromSchedule } from './addTvShowsToSchedule';
import { favoriteShow, getFavoriteShows } from './favoriteShow';
import { AddCommentToShow } from './addCommentToTvShow';

const showResolvers = {
    Query: {
        getAllShows,
        getSingleShow,
        getFavoriteShows,
        getAllShowsInUserSchedule
    },
    Mutation: {
        AddTvShowToSchedule,
        AddCommentToShow,
        RemoveTvShowFromSchedule,
        favoriteShow
    }
};

export default showResolvers;
