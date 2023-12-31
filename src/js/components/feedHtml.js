export async function createFeedHtml(rspns) {
  let html = "";
  let i = 0;
  rspns.forEach((element) => {
    const innerCarousel = createCarousel(element["media"]);

    html += `<div class="col">
            <div class="card h-100">
                <div id="carousel-${i}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${innerCarousel}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${i}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${i}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${element["title"]}</h5>
                    <p class="card-text">
                        ${element["description"]}
                    </p>
                    <div class="text-center">
                        <a href="src/html/alist.html" class="custom-btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">Last updated 3 mins ago</small>
                </div>
            </div>
        </div>`;

    i++;
  });

  return html;
}

function createCarousel(mda) {
  let carousel = "";
  let j = 0;
  let active = "active";
  mda.forEach((element) => {
    if (j > 0) {
      active = "";
    }
    carousel += `<div class="carousel-item ${active}"> 
                            <img src="${element}" class="card-img-top d-block w-100" alt="..."/>
                        </div>`;
    j++;
  });

  return carousel;
}
