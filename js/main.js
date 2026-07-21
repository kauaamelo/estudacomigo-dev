/*********************
 MANIPULAÇÃO DO MODAL
*********************/

const form = document.querySelector("#register-form");
const modal = document.querySelector("#success-modal");
const closeModal = document.querySelector("#close-modal");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  modal.classList.add("show");
  form.reset();
});

closeModal.addEventListener("click", function () {
  modal.classList.remove("show");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

/*********************
    API DE CEP
*********************/

const cepInput = document.querySelector("#cep");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

cepInput.addEventListener("input", () => {
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length < 8) {
    cidadeInput.value = "";
    estadoInput.value = "";
  }
  if (cep.length === 8) {
    buscarCep();
  }
});

async function buscarCep() {
  const cep = cepInput.value.replace(/\D/g, "");
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    if (dados.erro) {
      cidadeInput.value = "";
      estadoInput.value = "";
      alert("CEP não encontrado");
      return;
    }
    cidadeInput.value = dados.localidade;
    estadoInput.value = dados.uf;
  } catch (erro) {
    console.log("Erro ao buscar CEP:", erro);
  }
}

/*************************
 LINK EM DESEMVOLVIMENTO 
*************************/

const communityLink = document.querySelector("#community-link");
const developmentModal = document.querySelector("#development-modal");
const closeDevelopmentModal = document.querySelector(
  "#close-development-modal",
);

communityLink.addEventListener("click", (event) => {
  event.preventDefault();
  developmentModal.classList.add("show");
});

closeDevelopmentModal.addEventListener("click", () => {
  developmentModal.classList.remove("show");
});
