function userData() {
  fetch("https://dummyapi.io/data/v1/user?limit=10", {
    headers: { "app-id": "6379da75f6f01a83bace6780" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      const user = data.data
        .map((item) => {
          console.log(item);
          return `<div class="d-flex ms-1">
        <img
          src=${item.picture}
          class="rounded-circle object-fit mt-3"
          width="50px"
          height="50px"
          alt="..."
        />
        <h6 class="ms-3 mt-auto">${item.firstName} ${item.lastName}</h6>
  </div>
        `;
        })
        .join("");
      document.querySelector(".use").innerHTML = user;
    });
}

userData();



