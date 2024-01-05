export async function createAListHtml(rspns) {
  const innerCarousel = createListCarousel(rspns["media"]);
  const endDate = truncate(rspns["endsAt"], 0, rspns["endsAt"].indexOf("T"));
  const endHour = truncate(
    rspns["endsAt"],
    rspns["endsAt"].indexOf("T") + 1,
    rspns["endsAt"].length - 2,
  );
  const aHtml = `<div class="card">
          <div class="row g-0">
            <div class="col-md-6">
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
            <div class="col-md-6 bg-light">
              <div class="card-body">
                <h5 class="card-title">${rspns["title"]}</h5>
                <p class="card-text">${rspns["description"]}</p>
                <p class="card-text">Bid ends: ${endDate} at ${endHour}</p>
                <p class="card-text">Bid: ${rspns["_count"]["bids"]}</p>
                <form class="register-form">
                  <div class="mb-3" style="max-width: 300px;">
                    <input
                      type="number"
                      class="form-control"
                      id="bid-value"
                      aria-describedby="bidHelp"
                      min="${rspns["_count"]["bids"]}"
                      placeholder="${rspns["_count"]["bids"]}"
                      />
                    <div class="note-bid"></div>
                    <div class="text-center m-3">
                      <button type="submit" class="custom-btn btn-primary">Bid</button>
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
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

export function truncate(source, from = 0, to = source.length) {
  const trunc = source.slice(from, to);

  return trunc;
}
