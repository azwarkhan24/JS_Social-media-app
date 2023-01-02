let postSize = "";
function fetData() {
  fetch(`https://dummyapi.io/data/v1/post?limit=${postSize}`, {
    headers: { "app-id": "6379da75f6f01a83bace6780" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      document.querySelector("#users").innerHTML = "";
      const html = data.data
        .map((item, i) => {
          console.log(item);
          return `<div class="card mb-3 mt-3 bg-light" style="width: 30rem;">
            <div class="card-body d-flex">
                <div>
                  <img class="rounded-circle object-fit"
                  src=${item.owner.picture}
                  width="40px"
                  height="40px"/>
                </div>
                <div class="ms-3">
                <h5 class="card-title">${item.owner.firstName}</h5>
                <h6 class="card-subtitle text-muted">${item.publishDate}</h6>
                </div>
              </div>
            <img src=${item.image} class="border"/>
            <div class="card-body ">
            <div class="d-flex justify-content-between">
             <div> <i class="fa-regular fa-thumbs-up text-primary"></i><i class="">${item.likes}</i></div>
             <div><i class="fa-regular fa-comment text-primary"></i><i class='ms-1' style="cursor:pointer" onClick="fetchData( post${i}, '${item.id}')" >Comment</i></div>
             <div><i class="fa-sharp fa-solid fa-share text-primary"></i><i class="ms-1">Share</i></div>
             </div><hr>
            </div>

            <div class="card-body ">
            <div class="mb-1">
            <h6>Tags:</h6>
            <button type="button" class="btn btn-dark">${item.tags[0]}</button>
            <button type="button" class="btn btn-dark">${item.tags[1]}</button>
            <button type="button" class="btn btn-dark">${item.tags[2]}</button>
            </div>
            <div class="form-floating post-item hidden"  id=post${i}>
            
             </div>
            </div>
            </div>  
            
          </div>`;
        })
        .join("");

      document.querySelector("#users").insertAdjacentHTML("afterbegin", html);
    });
}

fetData();

function fetchData(id, postid) {
  id.classList.toggle("hidden");
  fetch(`https://dummyapi.io/data/v1/post/${postid}/comment?limit=10`, {
    headers: { "app-id": "6379da75f6f01a83bace6780" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      id.innerHTML = "";
      const comment = data.data.map((item) => {
        let html = `<div class="card bg-white" style="width:440px;">
        <div class="card-body d-flex">
                <div>
                  <img class="rounded-circle object-fit"
                  src=${item.owner.picture}
                  width="40px"
                  height="40px"/>
                </div>
                <div class="ms-3">
                <h5 class="card-title">${item.owner.firstName}</h5>
                <h6 class="card-subtitle text-muted">${item.publishDate}</h6>
                </div>
              </div>
             <p class="ms-3"> ${item.message}</p>
             
      </div>
      `;
        console.log(html);
        console.log(id);
        id.insertAdjacentHTML("afterbegin", html);
      });

      id.insertAdjacentHTML(
        "beforeend",
        `<input type="text" class="form-control" placeholder="enter comment" style="width:440px; margin-top:10px; margin-left:-3px">
      `
      );
    });
}

const showMorePosts = () => {
  setTimeout(() => {
    postSize += 10;
    console.log(postSize);
    fetData();
  }, 300);
};

Window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    showMorePosts();
  }
});
