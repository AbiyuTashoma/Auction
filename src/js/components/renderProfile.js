export function viewProfile(prfl, prflContainer) {
  prflContainer.innerHTML = `<div class="avatar-container border position-relative mx-auto">
                                <img src="${prfl["avatar"]}" class="avatar-bigger mx-auto" alt="avatar"/>
                                <a class="custom-btn btn-primary position-absolute top-100 start-100 translate-middle badge rounded-pill">
                                  edit
                                </a>
                             </div>
            <p class="my-3">${prfl["name"]}</p>
            <p class="my-3">${prfl["credits"]}</p>`;
}
