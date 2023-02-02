async function login(user) {
  let res = await fetch(`${SERVER_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  let data = await res.json();
  return data;
}

async function submitLogin() {
  let user = {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword").value,
  };
  let res = await login(user);
  console.log(res);
  if (res.access_token) {
    setCookie("access_token", res.access_token);
    location.href = "/index.html";
  }
}
