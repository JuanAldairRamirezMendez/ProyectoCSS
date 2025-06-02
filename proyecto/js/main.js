// Esperamos a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const welcomeSection = document.getElementById('welcome-section');

  const btnRegister = document.getElementById('btn-register');
  const btnLogin = document.getElementById('btn-login');
  const btnLogout = document.getElementById('btn-logout');

  const showLoginLink = document.getElementById('show-login');
  const showRegisterLink = document.getElementById('show-register');

  const userWelcome = document.getElementById('user-welcome');

  // Mostrar formulario login y ocultar registro
  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    welcomeSection.style.display = 'none';
  });

  // Mostrar formulario registro y ocultar login
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    welcomeSection.style.display = 'none';
  });

  // Funciones de validación
  function validarEmail(email) {
    // Regex simple para validar email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validarUsuario(username) {
    // Min 4 caracteres, letras, números y guion bajo
    const re = /^\w{4,}$/;
    return re.test(username);
  }

  function validarContrasena(password) {
    // Min 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  }

  // Registrar usuario
  btnRegister.addEventListener('click', () => {
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!username || !email || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (!validarUsuario(username)) {
      alert('El usuario debe tener al menos 4 caracteres y solo puede contener letras, números y guiones bajos.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validarContrasena(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.');
      return;
    }

    // Guardamos usuario en localStorage (simple, no seguro para producción)
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[username]) {
      alert('El usuario ya existe, prueba con otro.');
      return;
    }

    users[username] = { email, password };
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso! Ya puedes iniciar sesión.');
    registerForm.reset();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Login usuario
  btnLogin.addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (!users[username]) {
      alert('Usuario no encontrado.');
      return;
    }

    if (users[username].password !== password) {
      alert('Contraseña incorrecta.');
      return;
    }

    // Guardar sesión activa
    localStorage.setItem('activeUser', username);
    showWelcome(username);
  });

  // Cerrar sesión
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('activeUser');
    welcomeSection.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Mostrar bienvenida si hay usuario activo
  function showWelcome(username) {
    userWelcome.textContent = username;
    welcomeSection.style.display = 'block';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
  }

  // Al cargar, si hay sesión activa, mostrar bienvenida
  const activeUser = localStorage.getItem('activeUser');
  if (activeUser) {
    showWelcome(activeUser);
  } else {
    // Mostrar formulario registro por defecto
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    welcomeSection.style.display = 'none';
  }
});


