import {service} from "../util/request.js";

const rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
let inputTitle = document.querySelector('.inputText');
let inputContent = document.querySelector('.inputTextArea')
let inputImg = document.querySelector('.inputImg');
let inputButton = document.querySelector('.inputButton')
let markdown = document.querySelector('.markdown')


let title;
let content;
let img;
inputTitle.addEventListener('change', function (e) {
    title = e.target.value
})

inputContent.addEventListener('input', function (e) {
    content = e.target.value
    markdown.innerHTML = marked.parse(e.target.value);
})

inputImg.addEventListener('change', function (e) {
    img = e.target.files[0];
})
inputButton.addEventListener('click', function (e) {
    let formData = new FormData()
    formData.append('sdffh.jpeg', img, img.name)
    service.post('/img', formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }).then((res) => {
        service.post('/blogs', {
            title,
            content,
            time: +new Date(),
            img: res.data.fileName
        }).then((res) => {
            alert('发布成功')
        })
    })

})
