import {init} from './init.js'
import {getSearch} from "../util/getSearch.js";


window.query = window.location.search.slice(9)
getSearch(false,window.query).then()
init();
