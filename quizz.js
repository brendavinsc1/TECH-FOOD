document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btnMenu").addEventListener("click", function() {
        window.location.href = "inicial.html";
        this.style.textDecoration = "none"; // Remove o sublinhado ao clicar
    });

    document.querySelectorAll(".card-title").forEach(function(cardTitle) {
        cardTitle.addEventListener("mouseover", function() {
            this.style.textDecoration = "underline";
        });

        cardTitle.addEventListener("click", function() {
            const link = this.dataset.link;
            if (link) {
                window.open(link, "_blank");
            }
        });
    });
document.querySelector(".btnConfirmar").addEventListener("click", function() {
        alert("O quizz foi realizado com sucesso");
    });

    document.querySelector(".btnConfirmar").addEventListener("click", enviar);
});

async function enviar(event) {
    event.preventDefault();

    const qualAlergia = document.getElementById('qualAlergia').value;
    const alergia = document.querySelector('input[name="alergia"]:checked') ? document.querySelector('input[name="alergia"]:checked').value : '';
    const qualDieta = document.getElementById('qualDieta').value;
    const dieta = document.querySelector('input[name="dieta"]:checked') ? document.querySelector('input[name="dieta"]:checked').value : '';
    const qualCondicao = document.getElementById('qualCondicao').value;
    const condicao = document.querySelector('input[name="condicao"]:checked') ? document.querySelector('input[name="condicao"]:checked').value : '';
    const lactose = document.querySelector('input[name="lactose"]:checked') ? document.querySelector('input[name="lactose"]:checked').value : '';
    const acordar = document.getElementById('acordar').value;
    const almocar = document.getElementById('almocar').value;
    const dormir = document.getElementById('dormir').value;

    document.getElementById("qualAlergia").value = "";
    document.getElementById("qualDieta").value = "";
    document.getElementById("qualCondicao").value = "";
    document.getElementById("acordar").value = "";
    document.getElementById("almocar").value = "";
    document.getElementById("dormir").value = "";

    await salvarBD(alergia, qualAlergia, dieta, qualDieta, condicao, qualCondicao,lactose, acordar, almocar, dormir);
}

async function salvarBD(alergia, qualAlergia, dieta, qualDieta, condicao, qualCondicao,lactose, acordar, almocar, dormir) {
    try {
        const url = 'https://524a8a6c-954e-4fed-9768-78fd5c2c67fb-00-3q56sbf6na1w3.spock.replit.dev/Quizz';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                alergia: alergia,
                qualAlergia: qualAlergia,
                dieta: dieta,
                qualDieta: qualDieta,
                condicao: condicao,
                qualCondicao: qualCondicao,
                lactose: lactose,
                acordar: acordar,
                almocar: almocar,
                dormir: dormir,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        showSuccessMessage("Dados enviados com sucesso!");
    } catch (error) {
        console.error("Erro na requisição:", error);
        showErrorMessage("Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.");
    }
}

