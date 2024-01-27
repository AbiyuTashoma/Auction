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
