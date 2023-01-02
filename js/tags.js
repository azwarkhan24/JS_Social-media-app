function fatchData() {
  fetch("https://dummyapi.io/data/v1/tag?limit=1", {
    headers: { "app-id": "6379da75f6f01a83bace6780" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const tag = data.data.map((item, index) => {
        return `<button type="button" class="btn btn-dark m-1" onClick="postbytag(event)">${item}</button>
        `;
      });
      document
        .querySelector(".tags")
        .insertAdjacentHTML("beforeend", tag.slice(9, 25));
    });
}

fatchData();

function postbytag(e) {
  let tag = e.target.innerText;
  fetch(`https://dummyapi.io/data/v1/tag/${tag}/post?limit=10`, {
    headers: { "app-id": "6379da75f6f01a83bace6780" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data);
      document.querySelector("#users").innerHTML = "";
      const tags = data.data.map((item) => {
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
         <div><i class="fa-regular fa-comment text-primary"></i><i class='ms-1' style="cursor:pointer" >Comment</i></div>
         <div><i class="fa-sharp fa-solid fa-share text-primary"></i><i class="ms-1">Share</i></div>
         </div><hr>
        </div>

        <div class="card-body ">
        <div class="mb-1">
        <button type="button" class="btn btn-dark">${item.tags[0]}</button>
        <button type="button" class="btn btn-dark">${item.tags[1]}</button>
        <button type="button" class="btn btn-dark">${item.tags[2]}</button>
        </div>
        <div class="form-floating post-item">
        <input type="text" class="form-control" id="floatingPassword" placeholder="Enter Your Comment Here" style="width:440px; margin-top:10px; margin-left:-3px">
        <label for="floatingPassword">Enter Your Comment Here</label>
         </div>
        </div>
        </div>  
        
      </div>
        `;
      });
      document.querySelector("#users").insertAdjacentHTML("afterbegin", tags);
    });
}
