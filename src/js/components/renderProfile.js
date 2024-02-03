/**
 * creates and displays profile information inside an html element
 * @param {Response} prfl json response object
 * @param {HTMLElement} prflContainer
 */
export function viewProfile(prfl, prflContainer) {
  prflContainer.innerHTML = `<div class="avatar-container border position-relative mx-auto">
                                <img src="${prfl["avatar"]}" class="avatar-bigger mx-auto" alt="avatar"/>
                                <a class="custom-btn btn-primary position-absolute top-100 start-100 translate-middle badge rounded-pill" id="edit-btn" data-bs-toggle="modal" data-bs-target="#modal-edit">
                                  edit
                                </a>
                             </div>
                            
                          <p class="my-3">${prfl["name"]}</p>
                          <p class="my-3">${prfl["credits"]}</p>

                           <div class="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="editmodal" aria-hidden="true">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-body p-3">
                                          <div class="note-update"></div>             
                                          <form id="update-form">
                                              <div class="input-group my-2">
                                                  <input type="url" id="edit-avatar" class="form-control" aria-label="edit avatar url">
                                              </div>
                                              <div class="d-flex justify-content-center gap-2 mt-2">
                                                  <input type="submit" id="update-btn" class="custom-btn btn-primary" value="Update avatar">
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>`;
}

/**
 * creates html element from api response object
 * @param {Response} rspns json response object
 * @param {string} path relative patch
 * @returns {HTMLElement}
 */
export function createProfileHtml(rspns, path = "") {
  let html = "";
  let i = 0;
  rspns.forEach((element) => {
    const innerCarousel = createProfileCarousel(
      element["media"],
      element["id"],
      path,
    );

    let btnState = "disabled";
    const newDate = new Date();
    const dateDate = new Date(element["endsAt"]);
    if (dateDate > newDate) {
      btnState = "enabled";
    }

    html += `<div class="col">
            <div class="card h-100 position-relative">
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
                        <a href="${path}alist.html?id=${element["id"]}" class="custom-btn btn-primary">View Item</a>
                    </div>
                </div>
                <button class="custom-btn btn-primary position-absolute top-100 end-0 translate-middle badge rounded-pill" id="btn-edit-${i}" data-bs-toggle="modal" data-bs-target="#modal-edit-${i}" ${btnState}=true>
                    edit
                </button>
            </div>
            <div class="modal fade" id="modal-edit-${i}" tabindex="-1" aria-labelledby="editmodal" aria-hidden="true">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-body p-3">
                                          <div class="note-createlist"></div>
                                            <form id="update-item-form" name=${element["id"]}>
                                                <div class="input-group my-2">
                                                <input
                                                    type="text"
                                                    id="list-title"
                                                    class="form-control"
                                                    aria-label="Add title"
                                                    value=${element["title"]}
                                                />
                                                </div>
                                                <div class="note-title mb-2"></div>
                                                <div class="input-group my-2">
                                                <textarea
                                                    id="list-description"
                                                    class="form-control"
                                                    aria-label="Add description"
                                                >${element["description"]}</textarea>
                                                </div>
                                                <div class="note-description mb-2"></div>
                                                <div type="url" class="input-group my-2">
                                                <input
                                                    id="list-media"
                                                    class="form-control"
                                                    aria-label="Add media url"
                                                    value=${element["media"]}
                                                />
                                                </div>
                                                <div class="note-media mb-2"></div>
                                                <div class="input-group my-2">
                                                <input
                                                    type="datetime-local"
                                                    id="list-enddate"
                                                    class="form-control"
                                                    aria-label="Ending date"
                                                    value=${element["endsAt"]}
                                                />
                                                </div>
                                                <div class="note-enddate mb-2"></div>
                                                <div class="d-flex justify-content-center gap-2 mt-2">
                                                  <input type="submit" id="btn-update-item" class="custom-btn btn-primary" value="Update Item">
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                              </div>
                                            </form>
                                      </div>
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
export function createProfileCarousel(mda, eid, relativePath) {
  let carousel = "";
  let j = 0;
  let active = "active";
  mda.forEach((element) => {
    if (j > 0) {
      active = "";
    }
    carousel += `<div class="carousel-item ${active}">
                        <a href="${relativePath}alist.html?id=${eid}">
                            <img src="${element}" class="card-img-top d-block w-100" alt="failed to load image"/>
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
