import { Login, Signup } from "./resolvers";

/**
 * Combines and returns auth resolver mutations
 * @type {{Mutation: {Signup: Signup, Login: Login}}}
 */
const authResolvers = {
    Mutation: { Login, Signup }
};

export default authResolvers;
