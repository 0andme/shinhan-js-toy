const SERVER_URL = "http://127.0.0.1:8000";
let nowCate = "";
async function getPosts() {
  let res = await fetch(`${SERVER_URL}/blog/article`);
  let data = await res.json();
  return data;
}

function gotoDetail(id) {
  location.href = `detail.html?id=${id}`;
}

function changeCate(event) {
  if (event.target.tagName == "SPAN") {
    nowCate = event.target.innerText;
    insertPostList();
  }
}

async function insertPostList() {
  let listEl = document.getElementById("postList");
  let posts = await getPosts();
  if (nowCate != "") {
    posts = posts.filter((post) => post.category.name === nowCate);
    listEl.innerHTML = "";
  }
  posts.forEach((post) => {
    listEl.insertAdjacentHTML(
      "beforeend",
      `<div id="${post.id}" onclick="gotoDetail(${post.id})" >
        <span>카테고리 : ${post.category.name} </span><span>작성자 : ${post.author}</span>
        <h3>제목 : ${post.title}</h3>
      </div>
      <hr/>
    `
    );
  });
}

async function postPost(formData) {
  let token = getCookie("access_token"); // 쿠키를 가져와서
  let response = await fetch(`${SERVER_URL}/blog/article`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`, // 헤더에 지정
    },
  });
  let data = await response.json();
  return data;
}
async function submitPost() {
  let form = document.getElementById("form");
  console.log(form);
  let formData = new FormData(form);
  let res = await postPost(formData);
  console.log(res);
  location.reload();
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
async function getCategories() {
  let res = await fetch(`${SERVER_URL}/blog/category`);
  let data = res.json();
  return data;
}

async function insertCategories() {
  let cateEL = document.getElementById("categoryList");
  let cates = await getCategories();
  cates.forEach((cate) => {
    cateEL.insertAdjacentHTML(
      "beforeend",
      `
          <span   value="${cate.name}" >${cate.name}</span>
        
      `
    );
  });
}

insertCategories();

insertPostList();
