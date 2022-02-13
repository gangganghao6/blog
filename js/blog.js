import {init} from './init.js'
import {getBlog} from "../util/getBlog.js";

init();
hljs.initHighlightingOnLoad();
let query = window.location.search.slice(4)
getBlog(query).then()
