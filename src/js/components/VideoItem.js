export default class VideoItem {
  constructor(videoItem) {
    this.videoItem = videoItem;
    this.render();
  }
  render() {
    const {
      title,
      channelTitle,
      publishTime,
      thumbnails: {
        default: { url },
      },
    } = this.videoItem;
    return ` 
    <li class="video-item">
      <img
        src="${url}"
        alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${publishTime}</p>
    </li>`;
  }
}
