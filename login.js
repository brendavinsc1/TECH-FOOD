const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

// Função para mostrar/ocultar senha para o usuario
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        });
    });
});

// Alternar entre login e registro
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        forms.classList.toggle("show-registro");
    });
});

// Função de registro de usuário
document.querySelector("#register-button").addEventListener("click", function (e) {
    e.preventDefault();

    // Captura os valores dos campos de registro
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const age = document.getElementById("register-age").value;
    const phone = document.getElementById("register-phone").value;

    // Verifica se todos os campos estão preenchidos
    if (email && password && age && phone) {
        // Adicionar o novo usuário ao JSON Server
        fetch('https://524a8a6c-954e-4fed-9768-78fd5c2c67fb-00-3q56sbf6na1w3.spock.replit.dev/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, age, phone })
        })
        .then(response => response.json())
        .then(data => {
            alert('Usuário registrado com sucesso!');
            // Limpa os campos do formulário
            document.getElementById("register-email").value = '';
            document.getElementById("register-password").value = '';
            document.getElementById("register-age").value = '';
            document.getElementById("register-phone").value = '';
            // Alterna de volta para o login
            forms.classList.toggle("show-registro");
        })
        .catch(error => {
            alert('Erro ao registrar usuário');
            console.error('Error:', error);
        });
    } else {
        alert('Por favor, preencha todos os campos');
    }
});

// Função de login de usuário
document.querySelector("#login-button").addEventListener("click", function (e) {
    e.preventDefault();

    // Captura os valores dos campos de login
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Para obter todos os usuários do JSON Server
    fetch('https://524a8a6c-954e-4fed-9768-78fd5c2c67fb-00-3q56sbf6na1w3.spock.replit.dev/users')
        .then(response => response.json())
        .then(users => {
            // Verifica no banco de dados se tem o usuario lá
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                alert('Login realizado com sucesso!');
                // volta para a página inicial após o login
                window.location.href = 'inicial.html';
            } else {
                alert('Email ou senha incorretos');
            }
        })
        .catch(error => {
            alert('Erro ao verificar usuário');
            console.error('Error:', error);
        });
});