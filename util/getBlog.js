import {service} from "./request.js";

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


export async function getBlog(id) {
    let data = await service.get('/blogs', {
        params: {
            id
        }
    })
    data = data.data[0];
    document.title = "Pikachu的博客_" + data.title
    let blogImgContainer = document.querySelector('.blogImgContainer')
    let blogTitle = document.querySelector('.blogTitle')
    let blogTime = document.querySelector('.blogTime')
    let blogContents = document.querySelector('.blogContents')
    blogImgContainer.innerHTML = `<img class="blogImg" src="images/${data.img}" alt="rion">`
    blogImgContainer.href = "./images/"+data.img;
    blogTitle.innerText = data.title;
    blogTime.innerText = dayjs(data.time).format('YYYY-MM-DD HH:mm:ss');
    blogContents.innerHTML = marked.parse(data.content);
}

