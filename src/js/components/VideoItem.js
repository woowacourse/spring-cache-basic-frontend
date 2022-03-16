class VideoItem {
  constructor(videoItem = {}) {
    this.videoItem = videoItem;
    this.element = "";
    this.render();
  }
  render() {
    const {
      id,
      snippet: {
        title,
        description,
        thumbnails: {
          medium: { url: thumbnailUrl },
        },
      },
    } = this.videoItem;
    this.element = document.createElement("div");
    this.element.classList.add("video-item");
    this.element.innerHTML = `
      <img src="${thumbnailUrl}" alt="${title}" />
      <div class="video-item__info">
        <h4>${title}</h4>
        <p>${description}</p>
      </div>
    `;
    return this.element;
  }
}
