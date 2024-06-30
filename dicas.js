$(document).ready(function(){
    $('.btnPeso').click(function(){
        $('.sidebar').toggleClass('active');
        $('.content').toggleClass('active');
    });

    // Adiciona classe 'active' ao item do menu que corresponde à seção visível
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.sidebar ul li a.active').removeClass('active');
                $('.sidebar ul li a').eq(i).addClass('active');
            }
        });
    }).scroll();

    // Adiciona efeito de deslizamento suave ao clicar nos links do menu
    $('.sidebar ul li a').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
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
