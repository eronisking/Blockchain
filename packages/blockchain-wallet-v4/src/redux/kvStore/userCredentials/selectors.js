import { path } from 'ramda'
import { USER_CREDENTIALS } from '../config'
import { kvStorePath } from '../../paths'

export const getMetadata = path([kvStorePath, USER_CREDENTIALS])

export const getUserId = state =>
  getMetadata(state).map(path(['value', 'userId']))
export const getUserToken = state =>
  getMetadata(state).map(path(['value', 'token']))
