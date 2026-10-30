/* Modo noturno: aplica o tema salvo o mais cedo possivel (evita flash),
   cria o botao de alternancia no header e persiste a escolha em localStorage.
   Vanilla, sem dependencias. */
(function () {
    var STORAGE_KEY = "tema";

    function getPreferido() {
        var salvo = null;
        try {
            salvo = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            // localStorage pode estar indisponivel (ex.: modo privado); ignora.
        }
        if (salvo === "dark" || salvo === "light") {
            return salvo;
        }
        // respeita a preferencia do sistema operacional, se houver
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    }

    function aplicar(tema) {
        if (tema === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }

    // Aplica imediatamente, antes do body renderizar.
    aplicar(getPreferido());

    function atualizarBotao(botao) {
        var escuro = document.documentElement.getAttribute("data-theme") === "dark";
        botao.textContent = escuro ? "\u2600\uFE0F" : "\u{1F319}"; // sol / lua
        botao.setAttribute(
            "aria-label",
            escuro ? "Ativar modo claro" : "Ativar modo noturno"
        );
        botao.setAttribute("title", botao.getAttribute("aria-label"));
    }

    function alternar(botao) {
        var escuroAgora = document.documentElement.getAttribute("data-theme") === "dark";
        var novo = escuroAgora ? "light" : "dark";
        aplicar(novo);
        try {
            localStorage.setItem(STORAGE_KEY, novo);
        } catch (e) {
            // ignora se nao for possivel salvar
        }
        atualizarBotao(botao);
    }

    function montarBotao() {
        var nav = document.querySelector(".nav-bar");
        if (!nav || document.querySelector(".theme-toggle")) {
            return;
        }
        var botao = document.createElement("button");
        botao.type = "button";
        botao.className = "theme-toggle";
        atualizarBotao(botao);
        botao.addEventListener("click", function () {
            alternar(botao);
        });
        nav.appendChild(botao);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", montarBotao);
    } else {
        montarBotao();
    }
})();
