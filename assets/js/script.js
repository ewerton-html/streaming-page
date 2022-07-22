const conteiner = document.querySelector(".main_vitrine");
const playlistConteiner = document.querySelector(".playlist_ul");
const temporadasSelecionadas = [];

function cardPrincipal(temporada) {
  const article = document.createElement("article");
  article.classList.add("main_card");

  const mainCardTop = document.createElement("div");
  mainCardTop.classList.add("main_card_top");

  const mainCardBottom = document.createElement("div");
  mainCardBottom.classList.add("main_card_bottom");

  const h2 = document.createElement("h2");

  const span = document.createElement("span");

  const p = document.createElement("p");

  const button = document.createElement("button");

  // adicionando valores

  h2.innerText = temporada.nome;

  span.innerText = temporada.temporada;

  p.innerText = temporada.sinopse;

  button.innerText = "Adicionar à fila";
  button.id = temporada.id;

  // agrupando

  mainCardTop.append(h2, span);
  mainCardBottom.append(p, button);
  article.append(mainCardTop, mainCardBottom);

  return article;
}

function listarTemporadas() {
  for (let i = 0; i < temporadas.length; i++) {
    console.log();
    let card = cardPrincipal(temporadas[i]);
    conteiner.appendChild(card);
  }
}

listarTemporadas();

console.log(temporadas.length);

function cardTemporadaSelecionada(temporada) {
  //criando componentes
  const li = document.createElement("li");
  li.classList.add("playlist_li");

  const imgTemporada = document.createElement("img");
  imgTemporada.classList.add("playlist_icon");
  imgTemporada.src = temporada.imagemIcone;
  imgTemporada.alt = temporada.nome;

  const playlist_main = document.createElement("div");
  playlist_main.classList.add("playlist_main");

  playlist_main.insertAdjacentHTML(
    "afterbegin",
    `
        <div class="playlist_main_top">
            <h4>${temporada.nome}</h4>
            <span>${temporada.temporada}</span>
        </div>
        <div class="playlist_main_bottom">
            <img src="./assets/img/play-icon.png" alt="Botão de play"/>
            <span>Assistir agora</span>
        </div>
    `
  );

  const delet_button = document.createElement("div");
  delet_button.classList.add("delet_button");

  const imgDeletButton = document.createElement("button");
  imgDeletButton.id = temporada.id;

  delet_button.appendChild(imgDeletButton);

  //adicando componentes a li
  li.append(imgTemporada, playlist_main, delet_button);

  return li;
}

conteiner.addEventListener("click", selecionarTemporada);

function selecionarTemporada(event) {
  const elementoHTML = event.target;

  if (elementoHTML.tagName == "BUTTON") {
    const idTemporada = elementoHTML.id;

    const temporadaEncontrada = temporadas.find(
      (temporada) => temporada.id == idTemporada
    );

    temporadasSelecionadas.push(temporadaEncontrada);

    console.log(temporadaEncontrada);

    listarTemporadasSelecionadas();
  }
}

function listarTemporadasSelecionadas() {
  playlistConteiner.innerHTML = "";

  for (let i = 0; i < temporadasSelecionadas.length; i++) {
    let card = cardTemporadaSelecionada(temporadasSelecionadas[i]);
    playlistConteiner.appendChild(card);
  }
}

playlistConteiner.addEventListener("click", (event) => {
  const elementoHTML = event.target;
  if (elementoHTML.tagName == "BUTTON") {
    elementoHTML.closest("li").remove();

    const idTemporada = elementoHTML.id;

    const temporadaEncontrada = temporadasSelecionadas.find(
      (temporada) => idTemporada == temporada.id
    );

    const indexTemporada = temporadasSelecionadas.indexOf(temporadaEncontrada);

    temporadasSelecionadas.splice(indexTemporada);
  }
});
