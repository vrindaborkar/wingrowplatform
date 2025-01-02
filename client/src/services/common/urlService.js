import Cookies from 'universal-cookie'
import { getApiAsyn } from '../PostAPI'
import { handleAPIError, APIError } from '../common/errorHandler'
const cookies = new Cookies()
const AUTO_SUGGEST = {
  INTENT: 'suggest',
  MATCH_STRATEGY: {
    BEGIN_WITH: 'begin-with',
    CONTAINS: 'contains',
  },
}
export const FILTER = {
  MATCH_STRATEGY: {
    EXACT_MATCH: ':',
    CONTAINS: '::',
  },
}
const API_PARAMS = {
  DEFAULT: {
    PAGE_SIZE: 10,
    PAGE_NUMBER: 1,
    SORT_FIELD: '',
  },
  SORT_ORDER: {
    ASC: 1,
    DESC: -1,
  },
  AUTO_SUGGEST,
}
const decorateWithPaginationParams = payload => {
  const shouldPaginate =
    payload && Object.hasOwn(payload, 'shouldPaginate')
      ? payload.shouldPaginate
      : true
  let appendString = shouldPaginate ? '?paged=true' : '?paged=false'
  // page is indexed by 0 by table, hence need to increment page number by 1.
  if (shouldPaginate) {
    appendString +=
      '&page=' +
      (payload?.pageNumber
        ? payload?.pageNumber + 1
        : API_PARAMS.DEFAULT.PAGE_NUMBER)
    appendString +=
      '&size=' + (payload?.pageSize ?? API_PARAMS.DEFAULT.PAGE_SIZE)
  }
  return appendString
}
const decorateWithSortParams = (payload, shouldSort) => {
  if (payload?.sortField) {
    const sortOrder =
      payload?.sortOrder === API_PARAMS.SORT_ORDER.ASC ? ',asc' : ',desc'
    return (
      '&sort=' +
      (payload?.sortField ?? API_PARAMS.DEFAULT.SORT_FIELD) +
      sortOrder
    )
  }
  return ''
}
const decorateWithFilterParams = payload => {
  const filterQueryPrefix = '&filter='
  if (payload?.filters) {
    return (
      filterQueryPrefix +
      payload.filters.map(
        ({ filterField, query, matchStrategy }) =>
          filterField + matchStrategy + query
      )
    )
  }
  return ''
}

export const getDecoratedUrl = ({
  url,
  payload = {},
  shouldSort = false,
  shouldFilter = false,
}) => {
  let urlString = url
  urlString += decorateWithPaginationParams(payload)
  urlString += decorateWithSortParams(payload, shouldSort)
  urlString += decorateWithFilterParams(payload, shouldFilter)
  // urlString += decorateWithAutoSuggestParams(payload);
  return urlString
}
const decorateWithTypesParams = payload => {
  if (Object.hasOwn(payload, 'params')) {
    let res = `?type=${payload?.params}`

    return res
  }
  return ''
  // const queryParams = new URLSearchParams(payload).toString();
  // return queryParams ? `?${queryParams}` : "";
}
export const getDecoratedTypesUrl = ({ url, payload = {} }) => {
  return url + decorateWithTypesParams(payload)
}
export const generateImageUrl = async url => {
  try {
    let result = await getApiAsyn(url, cookies.get('authorization'), false)
    if (result?.error) {
      throw new APIError(result)
    }
    return result?.message
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
