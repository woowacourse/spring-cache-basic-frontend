import { request } from "./api/index.js";
import { $ } from "./utils/dom.js";
import { API_KEY } from "./utils/constants.js";

class App {
  constructor() {
    this.initEventListeners();
  }

  async onKeywordSubmit(e) {
    if (!e.target.classList.contains("music-request-button")) {
      return;
    }
    const keyword = e.target.textContent;
    const url = `https://localhost:8080/api/playlists?keyword=${keyword}`;
    const requestTimestamp = new Date().getTime();
    const data = await request(url);
    const responseTimestamp = new Date().getTime();
    const time = responseTimestamp - requestTimestamp;
    this.render({ time, data });
  }

  render({ time, data }) {
    if (!data) {
      return;
    }
    const { videos, countOfCall } = data;
    $("#response-time").innerText = `${time}ms`;
    $("#number-of-calls").innerText = `${countOfCall}/1000`;
    const videoItemsTemplate = videos
      .map((video) => new VideoItem(video).render())
      .join("");
    $(".video-list").innerHTML = videoItemsTemplate;
  }

  initEventListeners() {
    $("#keyword-buttons").addEventListener("click", onKeywordSubmit);
  }
}

const app = new App();
app.render();
