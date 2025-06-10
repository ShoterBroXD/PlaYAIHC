function toggleTab(tab) {
    // Cambiar la visibilidad de los formularios
    if (tab === 'usuario') {
        // Mostrar formulario de Usuario
        document.getElementById('usuarioForm').style.display = 'block';
        document.getElementById('artistaForm').style.display = 'none';
        
        // Cambiar estilo de los botones
        document.getElementById('usuarioBtn').classList.add('active');
        document.getElementById('artistaBtn').classList.remove('active');
    } else {
        // Mostrar formulario de Artista
        document.getElementById('usuarioForm').style.display = 'none';
        document.getElementById('artistaForm').style.display = 'block';
        
        // Cambiar estilo de los botones
        document.getElementById('artistaBtn').classList.add('active');
        document.getElementById('usuarioBtn').classList.remove('active');
    }
}

// Establecer el estado inicial 
toggleTab('usuario');


// Registro de usuario
document.getElementById("usuarioForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("usuarioApodo").value;
  const correo = document.getElementById("usuarioEmail").value;
  const password = document.getElementById("usuarioPassword").value;

  const usuario = {
    nombre,
    correo,
    password,
    rol: "usuario"
  };

  localStorage.setItem(correo, JSON.stringify(usuario));

  localStorage.setItem("sesionActiva", JSON.stringify({
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  }));

  window.location.href = "/pages/dashboard.html";
});

// Registro de artista
document.getElementById("artistaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("artistaApodo").value;
  const correo = document.getElementById("artistaEmail").value;
  const password = document.getElementById("artistaPassword").value;
  const pais = document.getElementById("artistaPais").value;

  const artista = {
    nombre,
    correo,
    password,
    pais,
    rol: "artista"
  };

  localStorage.setItem(correo, JSON.stringify(artista));

  localStorage.setItem("sesionActiva", JSON.stringify({
    nombre: artista.nombre,
    correo: artista.correo,
    rol: artista.rol
  }));

  window.location.href = "/pages/dashboard.html";
});


// Cerrar sesión
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("btnLogout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("sesionActiva");
      window.location.href = "/pages/login.html";
    });
  }
});

// Manejo de inicio de sesión
document.addEventListener("DOMContentLoaded", function () {
  // Usuario
  const usuarioForm = document.getElementById("usuarioForm");
  usuarioForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("usuarioEmail").value;
    const password = document.getElementById("usuarioPassword").value;

    const data = JSON.parse(localStorage.getItem(email));

    if (data && data.password === password && data.rol === "usuario") {
      localStorage.setItem("sesionActiva", JSON.stringify(data));
      window.location.href = "/pages/dashboard.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });

  // Artista
  const artistaForm = document.getElementById("artistaForm");
  artistaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("artistaEmail").value;
    const password = document.getElementById("artistaPassword").value;

    const data = JSON.parse(localStorage.getItem(email));

    if (data && data.password === password && data.rol === "artista") {
      localStorage.setItem("sesionActiva", JSON.stringify(data));
      window.location.href = "/pages/dashboard.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});

