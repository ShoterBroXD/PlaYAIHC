document.addEventListener("DOMContentLoaded", () => {
  fetch('pages/components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error("Error cargando navbar:", error));
});
