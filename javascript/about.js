const video = document.getElementById("background-video");

function setVideo() {
    const source =
        window.innerWidth <= 768
            ? "aboutbg-mobile.mp4"
            : "aboutbg.mp4";

    if (video.src !== new URL(source, location.href).href) {
        video.src = source;
        video.load();
        video.play();
    }
}

setVideo();
window.addEventListener("resize", setVideo);