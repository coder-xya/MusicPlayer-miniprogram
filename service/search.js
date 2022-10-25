import {request} from "./index"

export function getSearchHot() {
    return request("/search/hot","GET",{})
  }
export function getSearchSuggest(keywords) {
    return request("/search/suggest","GET", {
      keywords,
      type: "mobile"
    })
  }
export function getSearchResult(keywords) {
    return request("/search","GET", {
      keywords
    })
  }  
