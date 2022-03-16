import { request } from "./api/index.js";
import { $ } from "./utils/dom.js";
import VideoItem from "./components/VideoItem.js";
import Store from "./store/index.js";

class App {
  constructor() {
    this.initEventListeners();
    this.responseTimes = [];
    Store.init();
    this.countOfCall = Store.getCountOfCall();
  }

  async onKeywordSubmit(e) {
    if (!e.target.classList.contains("music-request-button")) {
      return;
    }
    if (this.countOfCall >= 20) {
      alert("호출수를 다 사용하셨습니다. 초기화하려면 100만원을 결제하세요.");
      return;
    }
    const keyword = e.target.textContent;
    const url = `http://localhost:8080/api/playlists?keyword=${keyword}`;
    try {
      const requestTimestamp = new Date().getTime();
      const reseponse = await request(url);
      const { items, isCached } = reseponse;
      if (!isCached) {
        this.countOfCall += 1;
        Store.setCountOfCall(this.countOfCall);
      }
      const responseTimestamp = new Date().getTime();
      const time = responseTimestamp - requestTimestamp;
      this.responseTimes.push(time);
      this.render(time, items);
    } catch (e) {
      throw new Error(e);
    }
  }

  getAverageResponseTime() {
    return Math.round(
      this.responseTimes.reduce((acc, curr) => acc + curr, 0) /
        this.responseTimes.length
    );
  }

  render(time, items) {
    if (!items) {
      return;
    }
    $("#response-time").innerText = `응답 시간: ${time}ms`;
    $(
      "#average-response-time"
    ).innerText = `평균 응답 시간: ${this.getAverageResponseTime()}ms`;
    $("#count-of-call").innerText = `${20 - this.countOfCall || "20"}/20`;
    const videoItemsTemplate = items
      .map((item) => new VideoItem(item).render())
      .join("");
    $(".video-list").innerHTML = videoItemsTemplate;
  }

  initEventListeners() {
    $("#keyword-buttons").addEventListener(
      "click",
      this.onKeywordSubmit.bind(this)
    );
  }
}

const app = new App();
app.render();
