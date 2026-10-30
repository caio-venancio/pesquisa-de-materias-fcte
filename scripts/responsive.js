/* Ajustes responsivos leves. Hoje: encurta o placeholder da barra de busca
   em telas pequenas (item do to-do: "alterar texto da barra de pesquisa no
   celular"). Vanilla, sem dependencias. */
(function () {
    var PONTO_MOBILE = 650; // deve casar com a media query em style-nav-buttons.css

    function ajustarPlaceholder() {
        var input = document.getElementById("search-input");
        if (!input) {
            return;
        }
        var cheio = input.getAttribute("data-placeholder-full");
        var curto = input.getAttribute("data-placeholder-short");
        if (!cheio || !curto) {
            return;
        }
        input.setAttribute(
            "placeholder",
            window.innerWidth <= PONTO_MOBILE ? curto : cheio
        );
    }

    function iniciar() {
        ajustarPlaceholder();
        window.addEventListener("resize", ajustarPlaceholder);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
