document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);

    if (weight > 0 && height > 0) {
        var bmi = weight / (height * height);
        var waterIntake = weight * 0.03; // Calcula a ingestão ideal de água (aproximadamente 30ml por kg de peso)
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = "<p>Seu Índice de Massa Corporal (IMC) é: " + bmi.toFixed(2) + "</p>" +
                                  "<p>A quantidade ideal de água para o seu corpo é: " + waterIntake.toFixed(2) + " litros por dia.</p>";
    } else {
        alert('Por favor, insira valores válidos para peso e altura.');
    }
});
document.querySelector(".btnMenu").addEventListener("click", function() {
    window.location.href = "inicial.html";
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
