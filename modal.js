const showModal = () => {
  let modal = document.getElementById("modal");
  modal.style.display = "flex";
  modal.style.animation = "fadein 1s";
};
const closeModal = () => {
  let modal = document.getElementById("modal");
  modal.style.animation = "fadeout 1s";
  setTimeout(() => (modal.style.display = "none"), 2000);
};
