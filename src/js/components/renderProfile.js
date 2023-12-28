export function viewProfile(prfl, prflContainer) {
  // const html = `<img src="${userPfl["avatar"]}" class="avatar-bigger" alt="avatar"/>
  //           <p class="profile-name">${pfl["name"]}</p>
  //           <p class="profile-credit">${pfl["credits"]}</p>`;

  // return html;

  prflContainer.innerHTML = `<img src="${prfl["avatar"]}" class="avatar-bigger" alt="avatar"/>
            <p class="profile-name">${prfl["name"]}</p>
            <p class="profile-credit">${prfl["credits"]}</p>`;
}
