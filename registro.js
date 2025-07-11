document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const confirmarContrasena = document.getElementById("confirmarContrasena").value.trim();

    if (!nombreCompleto || !correo || !usuario || !contrasena || !confirmarContrasena) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find(u => u.usuario === usuario)) {
      alert("El usuario ya existe, intenta con otro.");
      return;
    }

    usuarios.push({ nombreCompleto, correo, usuario, contrasena });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
});
