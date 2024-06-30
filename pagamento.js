const url = 'https://524a8a6c-954e-4fed-9768-78fd5c2c67fb-00-3q56sbf6na1w3.spock.replit.dev/Pagamento';

document.querySelector(".btnMenu").addEventListener("click", function() {
    window.location.href = 'inicial.html';
});

document.querySelector(".btnContinuar").addEventListener("click", function() {
    var nomeCartao = document.getElementById('nome').value;
    var numCartao = document.getElementById('numero').value;
    var expiracao = document.getElementById('expiração').value;
    var cvc = document.getElementById('cvv').value;

    if (nomeCartao && numCartao && expiracao && cvc) {
        alert("Compra realizada com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos antes de confirmar a compra.");
    }
});

async function enviar(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById("nome").value;
    const numero = document.getElementById("numero").value;
    const expiracao = document.getElementById("expiração").value;
    const cvv = document.getElementById("cvv").value;
    const metodoPagamento = document.querySelector('input[name="paymentMethod"]:checked').value;

    await salvarBD(nome, numero, expiracao, cvv, metodoPagamento);

    document.getElementById("nome").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("expiração").value = "";
    document.getElementById("cvv").value = "";
}

async function salvarBD(nome, numero, expiracao, cvv, metodoPagamento) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                nome: nome,
                numero: numero,
                expiracao: expiracao,
                cvv: cvv,
                metodoPagamento: metodoPagamento,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
