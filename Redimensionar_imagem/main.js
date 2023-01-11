// VARIÁVEIS

const drop_image = document.querySelector(".container_content");
const btn_archive = document.querySelector(".btn_archive");
const btn_download = document.querySelector(".btn_download");
const choose_file = document.querySelector(".image_window");
const container_drop = document.querySelector(".drop_image_container");
const container_compressed = document.querySelector(".after_compressed");
const img_compressed = document.querySelector(".img_compressed");
const width_input = document.querySelector("#largura");
const height_input = document.querySelector("#altura");
let file;
let image_ratio;

// COLOCAR IMAGEM ESCOLHIDA NA TELA

const sizeImg = (size) => {
  file = size.target.files[0];

  if (!file) return;

  add_style();

  img_compressed.src = URL.createObjectURL(file);

  WidthAndHeight();
  calcWidthAndHeight();

  console.log(file);
};

// DRAG AND DROP

const dragOverEvent = (drop) => {
  drop.preventDefault();

  window_style();
};

const dragLeaveEvent = () => {
  remove_window_style();
};

const dropEvent = (drop) => {
  drop.preventDefault();

  file = drop.dataTransfer.files[0];

  if (!file) {
    alert("Escolha uma foto");
    remove_window_style();
    return;
  }

  add_style();
  remove_window_style();

  img_compressed.src = URL.createObjectURL(file);

  WidthAndHeight();
  calcWidthAndHeight();

  console.log(file);
};

//  COMPRIMIR E DOWNLOAD DA IMAGEM

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const context = canvas.getContext("2d");

  canvas.width = width_input.value;
  canvas.height = height_input.value;

  context.drawImage(img_compressed, 0, 0, canvas.width, canvas.height);
  document.body.appendChild(canvas);

  const imgQuality = 1.0;

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

// FUNÇÃO DE DESCOBRIR A LARGURA E ALTURA DA IMAGEM

const WidthAndHeight = () => {
  img_compressed.addEventListener("load", () => {
    width_input.value = img_compressed.naturalWidth;
    height_input.value = img_compressed.naturalHeight;
    image_ratio = img_compressed.naturalWidth / img_compressed.naturalHeight;
  });
};

// RELAÇÃO ENTRE LARGURA E ALTURA DA IMAGEM

const calcWidthAndHeight = () => {
  width_input.addEventListener("keyup", () => {
    const height = width_input.value / image_ratio;
    height_input.value = Math.floor(height);
  });

  height_input.addEventListener("keyup", () => {
    const width = height_input.value * image_ratio;
    width_input.value = Math.floor(width);
  });
};

// FUNÇÕES DE ESTILO

const add_style = () => {
  container_compressed.classList.add("display_visible");
  container_drop.classList.add("display_hidden");
  drop_image.style.border = "none";
};

const window_style = () => {
  drop_image.classList.add("container_drop_windows");
  btn_archive.classList.add("archive_drop_windows");
};

const remove_window_style = () => {
  drop_image.classList.remove("container_drop_windows");
  btn_archive.classList.remove("archive_drop_windows");
};

// EVENTOS

btn_archive.addEventListener("click", () => choose_file.click());

choose_file.addEventListener("change", sizeImg);

btn_download.addEventListener("click", resizeAndDownload);

width_input;

// EVENTOS DE DRAG E DROP

drop_image.addEventListener("dragover", dragOverEvent);

drop_image.addEventListener("dragleave", dragLeaveEvent);

drop_image.addEventListener("drop", dropEvent);
