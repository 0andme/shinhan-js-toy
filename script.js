const SERVER_URL = "http://127.0.0.1:8000";

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

function setCookie(name, value) {
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
  document.cookie = updatedCookie;
}
