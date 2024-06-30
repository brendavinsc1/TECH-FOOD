const url = 'https://524a8a6c-954e-4fed-9768-78fd5c2c67fb-00-3q56sbf6na1w3.spock.replit.dev/CadastroNutri';

 document.getElementById('date').min = new Date().toISOString().split('T')[0];

document.getElementById("cep").addEventListener("input", async function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        const endereco = await validarCEP(cep);
        if (endereco) {
            document.getElementById("endereco").value = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`;
        } else {
            document.getElementById("endereco").value = '';
            alert('CEP inválido. Por favor, insira um CEP válido.');
        }
    }
});

document.getElementById("btnConfirmar").addEventListener("click", enviar);

async function validarCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.ok) {
        const data = await response.json();
        return data.erro ? false : data;
    } else {
        return false;
    }
}

async function enviar(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const dataDeNascimento = document.getElementById("dataDeNascimento").value;
    const endereco = document.getElementById("endereco").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const crm = document.getElementById("crm").value;
    const senha = document.getElementById("senha").value;

    if (nome && sobrenome && cpf && dataDeNascimento && endereco && email && telefone && crm && senha) {
        try {
            await salvarBD(nome, sobrenome, cpf, dataDeNascimento, endereco, email, telefone, crm, senha);
            alert("Cadastro realizado com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar. Por favor, tente novamente.");
            console.error("Erro ao salvar no banco de dados:", error);
        }
    } else {
        alert("Por favor, preencha todos os campos antes de confirmar o cadastro.");
    }

    // Limpar campos após enviar os dados
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("dataDeNascimento").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("crm").value = "";
    document.getElementById("senha").value = "";
}

async function salvarBD(nome, sobrenome, cpf, dataDeNascimento, endereco, email, telefone, crm, senha) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            dataDeNascimento: dataDeNascimento,
            endereco: endereco,
            email: email,
            telefone: telefone,
            crm: crm,
            senha: senha,
        }),
    });

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
}
