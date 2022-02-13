let timeoutId;
let menu = document.querySelector('.menu')
let menuList = document.querySelector('.menuList')
let header = document.querySelector('.header');
let qq = document.querySelectorAll('.qq')
let searchButton = document.querySelector('.searchButton')
let searchBox = document.querySelector('.searchBox')

export function init() {
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        qq.forEach((item) => {
            item.href = 'mqqwpa://im/chat?chat_type=wpa&uin=530394623&version=1&src_type=web&web_src=oicqzone.com'
        })
    }
    if (parseInt(window.innerWidth) < 400) {
        document.documentElement.style.fontSize = (window.innerWidth / 375) * 16 + 'px';
        console.log(document.documentElement.style.fontSize)
    }
    menu.addEventListener('mouseenter', function () {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined;
        }
        menuList.style.display = 'flex'
    })
    menu.addEventListener('mouseleave', function () {
        timeoutId = setTimeout(() => {
            menuList.style.display = 'none'
            timeoutId = undefined;
        }, 300)
    })
    menu.addEventListener('click', function () {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined;
        }
        menuList.style.display = 'flex'
    })
    searchButton.addEventListener('click', function (e) {
        window.open('search.html?content=' + searchBox.value);
    })
    if (typeof query !== 'undefined') {
        searchBox.value = decodeURIComponent(window.query)
    }
    searchBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            window.open('search.html?content=' + searchBox.value);
        }
    })
    window.addEventListener('scroll', function () {
        if (header.offsetTop - document.documentElement.scrollTop < -1) {
            header.style.backgroundColor = 'black'
            header.style.color = 'white'
            searchButton.style.backgroundColor = 'rgb(1, 112, 254)'
            searchButton.style.border = 'none'
            searchBox.style.backgroundColor = 'white'
            searchBox.style.color = 'black'
        } else {
            header.style.backgroundColor = ''
            header.style.color = ''
            searchButton.style.backgroundColor = ''
            searchButton.style.border = ''
            searchBox.style.backgroundColor = ''
            searchBox.style.color = ''
        }
        menuList.style.display = 'none'
        timeoutId = undefined;
    })
}
