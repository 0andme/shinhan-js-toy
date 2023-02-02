const SERVER_URL = "http://127.0.0.1:8000";
let params = new URLSearchParams(location.search);
let id = params.get("id");

async function getPosts() {
  let res = await fetch(`${SERVER_URL}/blog/article/${id}`);
  let data = await res.json();
  return data;
}

async function insertPostList() {
  let listEl = document.getElementById("postDetail");
  let post = await getPosts();

  listEl.insertAdjacentHTML(
    "beforeend",
    `<div id="${post.id}"  >
        <span>카테고리 : ${post.category.name} </span><span>작성자 : ${post.author}</span>
        <h3>제목 : ${post.title}</h3>
        <p>내용 : ${post.content}</p>
        <img src="${post.image}">
    </div>
    <button onclick='changeInput()'>수정</button>

    <button onclick='deletePost(${post.id})'>삭제</button>


      `
  );
}
function changeInput() {
  let detailEl = document.getElementById("postDetail");
  let updateEl = document.getElementById("updateUi");
  if (detailEl.style.display === "none") {
    detailEl.style.display = "block";
    updateEl.style.display = "none";
  } else {
    updateEl.style.display = "block";
    detailEl.style.display = "none";
  }
}

async function getCategories() {
  let res = await fetch(`${SERVER_URL}/blog/category`);
  let data = res.json();
  return data;
}

async function addCategory() {
  let category = {name: document.getElementById("category").value};

  let res = await postCategory(category);
  console.log(res);
}

async function insertCategories() {
  let cateEL = document.getElementById("form");
  let cates = await getCategories();
  cates.forEach((cate) => {
    cateEL.insertAdjacentHTML(
      "beforeend",
      `<label>
          <input type="radio" name="category" value="${cate.id}" /> ${cate.name}
        </label>
      `
    );
  });
}

async function putPost(formData) {
  let token = getCookie("access_token"); // 쿠키를 가져와서
  let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // 헤더에 지정
    },
  });
  if (response.status === 403) {
    alert("본인 글만 수정할 수 있습니다");
  }
}
async function changePost() {
  let form = document.getElementById("form");
  let formData = new FormData(form);
  let res = await putPost(formData);
  alert("글이 수정되었습니다");
  location.reload();
}

function toggleDetail() {
  let detailEl = document.getElementById("postDetail");
  if (detailEl.style.display === "none") {
    detailEl.style.display === "block";
  }
  detailEl.style.display === "none";
}
async function deletePost() {
  let token = getCookie("access_token");
  let respose = await fetch(`${SERVER_URL}/blog/article/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 헤더에 지정
    },
  });

  if (respose.status === 204) {
    alert("글이 삭제되었습니다");
    location.href = "index.html";
  }
  if (respose.status === 403) {
    alert("본인 글만 삭제할 수 있습니다");
  }
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
insertPostList();
insertCategories();
