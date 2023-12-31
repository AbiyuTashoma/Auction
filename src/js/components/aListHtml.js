export async function createAListHtml(rspns) {
  const innerCarousel = createListCarousel(rspns["media"]);
  const aHtml = `<div class="card">
          <div class="row g-0">
            <div class="col-md-5">
              <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${innerCarousel}                  
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">${rspns["title"]}</h5>
                <p class="card-text">${rspns["description"]}</p>
                <a href="#" class="custom-btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <small class="text-body-secondary">Last updated 3 mins ago</small>
          </div>
        </div>`;

  return aHtml;
}

export function createListCarousel(mda) {
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
