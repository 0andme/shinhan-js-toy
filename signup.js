async function register(user) {
  let res = await fetch(`${SERVER_URL}/user/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
}

async function submitRegister() {
  let user = {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword").value,
    fullname: document.getElementById("userName").value,
  };

  let res = await register(user);
  location.href = "index.html";
}
