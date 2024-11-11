// Adiciona o ouvinte de evento ao botão para esconder o formulário ao clicar
document
  .querySelector("#comparar-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Obter os valores das inputs
    const mensalidadeAtual = parseFloat(
      document.getElementById("mensalidadeatual").value
    );
    const penalizacao = parseFloat(
      document.getElementById("penalizacao").value
    );
    const novaMensalidade = parseFloat(
      document.getElementById("novamensalidade").value
    );
    const mesesRestantes = parseInt(
      document.getElementById("mesesrestantes").value,
      10
    );

    // validações
    if (mensalidadeAtual < 0 || isNaN(mensalidadeAtual)) {
      Toastify({
        text: "Por favor, insira uma mensalidade atual válida.",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF0000)",
        },
      }).showToast();
    } else if (isNaN(mesesRestantes) || mesesRestantes < 0) {
      Toastify({
        text: "Por favor, insira um número de meses restantes válido.",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF0000)",
        },
      }).showToast();
    } else if (penalizacao < 0 || isNaN(penalizacao)) {
      Toastify({
        text: "Por favor, insira uma penalização válida (maior ou igual a 0 €).",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF0000)",
        },
      }).showToast();
    } else if (novaMensalidade < 0 || isNaN(novaMensalidade)) {
      Toastify({
        text: "Por favor, insira uma nova mensalidade válida.",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #FF0000, #FF0000)",
        },
      }).showToast();
    } else {

      const formulario = document.querySelector(".formulario");
      formulario.style.display = "none"; // Torna o formulário invisível

      const ValorOperadoraAntiga =
        mesesRestantes === 0
          ? mensalidadeAtual
          : mensalidadeAtual * mesesRestantes;
      const ValorDIGI =
        mesesRestantes === 0
          ? penalizacao + novaMensalidade
          : penalizacao + novaMensalidade * mesesRestantes;

      const poupanca = parseFloat(ValorOperadoraAntiga - ValorDIGI);
      const prejuizo = parseFloat(Math.abs(ValorOperadoraAntiga - ValorDIGI));

      if (poupanca > 0) {
        document.getElementById(
          "resultado"
        ).innerHTML = `<b>Aconselhamos a que mude para a DIGI Portugal. 
    Ao mudar irá conseguir poupar ${poupanca} € e ainda ficará com uma fidelização de apenas 3 meses. </b>`;
        updateContentAndUnderline(); // Atualiza o conteúdo e o sublinhado
      } else if (poupanca == 0) {
        document.getElementById(
          "resultado"
        ).innerHTML = `<b>Aconselhamos a que mude para a DIGI Portugal. 
    Apesar que a sua poupança ser de ${poupanca} € a mudança é ainda recomendada para si dada a fidelização de apenas 3 meses que a DIGI oferece. </b>`;
        updateContentAndUnderline(); // Atualiza o conteúdo e o sublinhado
      } else {
        document.getElementById(
          "resultado"
        ).innerHTML = `<b>Aconselhamos que não mude ainda para a DIGI Portugal. 
    Ao mudar, irá perder ${prejuizo} € o que não torna a mudança rentável para si neste momento. </b>`;
        updateContentAndUnderline(); // Atualiza o conteúdo e o sublinhado
        
      }
    }

  });

// Função para atualizar o conteúdo e o sublinhado
function updateContentAndUnderline() {
  const style = document.createElement("style");
  document.head.appendChild(style); // Adiciona o estilo no head uma vez
  document.getElementById("return-btn").style.display = "block";
}
