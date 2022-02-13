import {init} from './init.js'
import {getBlogs} from "../util/getBlogs.js";

init();

let playMusic = document.querySelector('.playMusic');
let music = document.querySelector('.music');
let backgroundVideo = document.querySelector('.backgroundVideo')
let isPlaying = false;
music.addEventListener("playing", function () {
    isPlaying = true;
    playMusic.innerText = 'Stop'
});
music.addEventListener("pause", function () {
    isPlaying = false;
    playMusic.innerText = 'Play'
});

playMusic.addEventListener('click', function () {
    if (isPlaying) {
        music.pause();
    } else {
        music.play();
    }
    isPlaying = !isPlaying;
})
backgroundVideo.addEventListener('pause', function (e) {
    backgroundVideo.play();
})
getBlogs().then()


