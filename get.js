const SERVER_URL = "http://127.0.0.1:8000";

async function getPosts() {
  let res = await fetch(`${SERVER_URL}/blog/article`);
  let data = await res.json();
  return data;
}

async function insertPostList() {
  let listEl = document.getElementById("postList");
  let posts = await getPosts();

  posts.forEach((post) => {
    listEl.insertAdjacentHTML(
      "beforeend",
      `<div id="${post.id}">
        <span>카테고리 : ${post.category.name} </span><span>작성자 : ${post.author}</span>
        <h3>제목 : ${post.title}</h3>
        <p>내용 : ${post.content}</p>
        <img src="${post.image}">
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

insertPostList();
