export async function getElement(rspns, elmnt) {
  return rspns[elmnt];
}

export async function getEnddate(rspns) {
  const endDate = truncate(rspns["endsAt"], 0, rspns["endsAt"].indexOf("T"));
  const endHour = truncate(
    rspns["endsAt"],
    rspns["endsAt"].indexOf("T") + 1,
    rspns["endsAt"].indexOf("."),
  );
  return `${endDate} at ${endHour}`;
}

export async function getCurrentBid(rspns) {
  const cntBd = rspns["bids"].length;
  if (cntBd) {
    return rspns["bids"][cntBd - 1]["amount"];
  }

  return 0;
}

export async function getNewBid(rspns) {
  const cntBd = rspns["bids"].length;
  let mxBd = 0;
  if (cntBd) {
    mxBd = rspns["bids"][cntBd - 1]["amount"];
  }
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

  return carousel;
}

export function truncate(source, from = 0, to = source.length) {
  const trunc = source.slice(from, to);

  return trunc;
}
