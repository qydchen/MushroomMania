export default const openModal = () => {
  let modal = document.getElementById('modal');

  modal.style.display = "block";

  let span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
};
