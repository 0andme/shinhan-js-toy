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

async function postCategory(category) {
  let token = getCookie("access_token");
  let res = await fetch(`${SERVER_URL}/blog/category`, {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // 헤더에 지정
    },
  });
  let data = res.json();
  return data;
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

insertCategories();
