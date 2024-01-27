/**
 * creates html element from api response object
 * @param {Response} rspns json response object
 * @param {string} path relative patch
 * @returns {HTMLElement}
 */
export async function createFeedHtml(rspns, path = "") {
  let html = "";
  let i = 0;
  rspns.forEach((element) => {
    const innerCarousel = createCarousel(element["media"], element["id"], path);

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
                        <a href="${path}alist.html?id=${element["id"]}" class="custom-btn btn-primary">View List</a>
                    </div>
                </div>
            </div>
        </div>`;

    i++;
  });

  return html;
}

/**
 * creates carousel html element out of an array of media url's
 * assign default media value if not
 * @param {Array} mda
 * @param {string} eid
 * @param {string} relativePath
 * @returns {HTMLElement}
 */
export function createCarousel(mda, eid, relativePath) {
  let carousel = "";
  let j = 0;
  let active = "active";
  mda.forEach((element) => {
    if (j > 0) {
      active = "";
    }
    carousel += `<div class="carousel-item ${active}">
                        <a href="${relativePath}alist.html?id=${eid}">
                            <img src="${element}" class="card-img-top d-block w-100" alt="..."/>
                        </a>
                    </div>`;
    j++;
  });

  if (!j) {
    carousel = `<div class="carousel-item active">
                        <a href="${relativePath}alist.html?id=${eid}">
                            <img src="https://i.ibb.co/P6z4mw0/no-image-available.jpg" class="card-img-top d-block w-100" alt="no image"/>
                        </a>
                    </div>`;
  }
  return carousel;
}
