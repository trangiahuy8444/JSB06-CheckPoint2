// news.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const newsContainer = document.querySelector(".row");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      const newsItem = {
        title: title,
        content: content,
        image: reader.result,
      };

      let newsList = JSON.parse(localStorage.getItem("newsList")) || [];
      newsList.push(newsItem);
      localStorage.setItem("newsList", JSON.stringify(newsList));

      window.location.href = "/index.html";
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      reader.onloadend();
    }
  });

  if (newsContainer) {
    let newsList = JSON.parse(localStorage.getItem("newsList")) || [];
    newsList.forEach(function (newsItem) {
      const newsCard = document.createElement("div");
      newsCard.className = "col-md-4";
      newsCard.innerHTML = `
                <div class="card mb-4">
                    <img src="${newsItem.image}" class="card-img-top" alt="Hình ảnh tin tức">
                    <div class="card-body">
                        <h5 class="card-title">${newsItem.title}</h5>
                        <p class="card-text">${newsItem.content}</p>
                        <a href="#" class="btn btn-primary">Đọc thêm</a>
                    </div>
                </div>
            `;
      newsContainer.appendChild(newsCard);
    });
  }
});
