// Este código se ejecuta cuando el usuario hace login (por ejemplo, al hacer submit del form)
fetch('http://localhost:3000/api/usuarios/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ usuario, password }),
})
.then(res => res.json())
.then(data => {
  if(data.ok){
    // Guarda el id_usuario y el nombre en localStorage
    localStorage.setItem('id_usuario', data.usuario.id_usuario);
    localStorage.setItem('nombre_usuario', data.usuario.nombre);
    // Redirige a la página principal
    window.location.href = 'index.html';
  } else {
    // Mostrar error de login
    alert('Usuario o contraseña incorrectos');
  }
});