import {service} from "./request.js";
import {createElement} from "./dom.js";

let size = 8;
let pageNumber = 0;
let totalPages;
window.getPreviousSearch = function () {
    getSearch(true, window.query).then()
}
window.getNextSearch = function () {
    getSearch(false, window.query).then()
}

export async function getSearch(isPre, query) {
    if (isPre) {
        pageNumber--;
    } else {
        pageNumber++;
    }
    let data;
    if (pageNumber <= 0) {
        pageNumber++
        alert('已经是第一页')
        return;
    }
    data = await service.get('/blogs', {
        params: {
            "_page": pageNumber,
            "_limit": size,
            "_sort": "time",
            "_order": "desc",
            'q': query
        }
    })
    let total = data.headers['x-total-count']
    totalPages = Math.ceil(total / 8);
    data = data.data;
    if (data.length === 0) {
        if (isPre) {
            pageNumber++;
            alert('已经是第一页')
        } else {
            pageNumber--;
            alert('已经是最后一页')
        }
        return;
    }
    let blogListContainer = document.querySelector('.blogListContainer')
    blogListContainer.innerHTML = ``
    data.forEach((item) => {
        let element = createElement('div', 'blogList');
        element.innerHTML = `<a class="blogListImgContainer" href="./blog.html?id=${item.id}" target="_blank">
           <img class="blogListImg" src="images/${item.img}" alt="rion">
        </div>
           <a class="blogListContentContainer" href="./blog.html?id=${item.id}" target="_blank">
                <h2 class="blogListTitle">${item.title}</h2>
                <p class="blogListContent">${item.content}</p>
                <span class="blogListTime">${dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}</span>
           </a>`
        blogListContainer.appendChild(element)
    })
    blogListContainer.innerHTML += `<div class="pageSelect">
            <div class="pageLeft page">
                <a href="#blogs" class="pageItem" onclick="getPreviousSearch()">上一页</a>
            </div>
            <div  class="pageRight page">
                <a href="#blogs" class="pageItem" onclick="getNextSearch()">下一页</a>
            </div><div class="totalPages">第${pageNumber}/${totalPages}页</div>
       </div>`
}
