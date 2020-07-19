import { merge } from 'lodash';
import showResolver from './Show';
import authResolvers from "./auth";

/**
 * creates root resolver by merging child resolvers
 */
const rootResolver = merge(showResolver, authResolvers);
export default rootResolver;
