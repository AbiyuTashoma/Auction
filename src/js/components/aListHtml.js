export async function getElement(rspns, elmnt) {
  return rspns[elmnt];
}

export async function getEnddate(edAt) {
  const endDate = truncate(edAt, 0, edAt.indexOf("T"));
  const endHour = truncate(edAt, edAt.indexOf("T") + 1, edAt.indexOf("."));
  return `${endDate} at ${endHour}`;
}

export async function getNewBid(rspns) {
  const mxBd = await getMaxBid(rspns["bids"]);
  return `<input type="number"
                  class="form-control"
                  id="bid-value"
                  aria-describedby="bidHelp"
                  min="${mxBd + 1}"
                  value="${mxBd + 1}"
                  />`;
}

export async function createListCarousel(mda) {
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

  if (!j) {
    carousel = `<div class="carousel-item active">
                <img src="https://i.ibb.co/P6z4mw0/no-image-available.jpg" class="card-img-top d-block w-100" alt="no image"/>
              </div>`;
  }

  return carousel;
}

export function truncate(source, from = 0, to = source.length) {
  const trunc = source.slice(from, to);

  return trunc;
}

export async function getMaxBid(bids) {
  const bidLength = bids.length;
  let maxBid = 0;
  if (bidLength) {
    bids.forEach((bd) => {
      if (bd["amount"] >= maxBid) {
        maxBid = bd["amount"];
      }
    });
  }

  return maxBid;
}
