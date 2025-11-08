// Prototipo teste de imagem
var images = ["images/aaa.jpg", "images/P1080257.jpg", 
    "images/P1080257.jpg"]

var photos = [
    {src: "images/P1080778.jpg" , nome: "foto1", camera: "DMC FZ-60", lente: "ISO 100 f: 2.8 ss: 1/90", 
        local: "PTI UNIOESTE", descricao: "bla bla bla bla bla"},
    {src: "images/aaa.jpg", nome: "fotoAAAAAA", camera: "Iphone 16", lente: "ISO 200 f: 4.0 ss: 1/60", 
        local: "Recife", descricao: "Lugar bunito né"}
]

const container = document.getElementById("galeria");

for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    img.width = 300;
    container.appendChild(img);
}