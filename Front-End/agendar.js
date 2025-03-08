document.addEventListener("DOMContentLoaded", async function () {
    const inputDataHora = document.getElementById("datahora");
    const botaoAgendar = document.getElementById("botaoAgendar");
    const mensagemErro = document.getElementById("mensagemErro"); // Nova div de erro

    // Carregar configurações do JSON
    let config;
    try {
        const response = await fetch("config.json");
        config = await response.json();
    } catch (error) {
        console.error("Erro ao carregar config.json:", error);
        mostrarMensagemErro("Erro ao carregar configurações. Tente novamente.");
        return;
    }

    botaoAgendar.addEventListener("click", function (event) {
        const dataHoraSelecionada = new Date(inputDataHora.value);

        if (isNaN(dataHoraSelecionada.getTime())) {
            mostrarMensagemErro("Por favor, selecione uma data e hora válidas.");
            return;
        }

        // Obtendo o dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
        const diaEscolhido = dataHoraSelecionada.getDay();

        if (!config.diasPermitidos.includes(diaEscolhido)) {
            mostrarMensagemErro("Apenas consultas às terças e quartas são permitidas.");
            return;
        }

        // Obtendo o horário escolhido
        const horaEscolhida = dataHoraSelecionada.getHours();
        const minutosEscolhidos = dataHoraSelecionada.getMinutes();
        const horarioEmMinutos = horaEscolhida * 60 + minutosEscolhidos;

        // Verificando se o horário está dentro dos intervalos permitidos
        const horarioValido = config.horariosPermitidos.some(horario => {
            const [horaInicio, minutoInicio] = horario.inicio.split(":").map(Number);
            const [horaFim, minutoFim] = horario.fim.split(":").map(Number);

            const inicioEmMinutos = horaInicio * 60 + minutoInicio;
            const fimEmMinutos = horaFim * 60 + minutoFim;

            return horarioEmMinutos >= inicioEmMinutos && horarioEmMinutos <= fimEmMinutos;
        });

        if (!horarioValido) {
            mostrarMensagemErro("Os horários permitidos são de 06:00 às 11:00 e de 14:00 às 16:00.");
            return;
        }

        // Se tudo estiver correto, ocultar qualquer mensagem de erro e prosseguir
        mensagemErro.style.display = "none";
        window.location.href = "final.html";
    });

    // Função para exibir mensagens de erro
    function mostrarMensagemErro(texto) {
        mensagemErro.textContent = texto;
        mensagemErro.style.display = "block";
    }
});
