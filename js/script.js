

const elePuntaje = document.querySelector('#elePuntaje');
const empezarJuegoBtn=document.querySelector('#empezarJuego');
const modal=document.querySelector('#modal');
const modal2=document.querySelector('#modal2');
const puntajeTotal=document.querySelector('#puntajeTotal');
const musica=document.querySelector('#musica');
const mostrar=document.querySelector('#mostarNombre');

let puntaje = 0;


class Monedas extends HTMLElement {
	constructor() {
		super();
		this.velocidad = 0;
		this.x = -158;
		this.id="moneda"
		this.y = Math.random() * window.innerHeight - 120;
		this.innerHTML="<img src='../img/moneda1.png'  width='60px' height='70px'>";
		this.velocidad = 1;
		this.style.position ="fixed";
		this.style.display="none";

	}
	connectedCallback() {
	}
	disconnectedCallback() {
	}
	actualizar() {
		this.x += this.velocidad;
		if (this.x > window.innerWidth) {
			this.remove();
		}
		let mario = document.getElementById("mario");
		if (Colision.procesoColision(this, mario)) {

			puntaje +=100;
			elePuntaje.innerHTML = puntaje;

			this.remove();


		}
		this.dibujar();
	}
	dibujar() {
		this.style.transform = `translate(${this.x}px, ${this.y}px)`;
	}

}
window.customElements.define("moneda-web", Monedas);

class Hongo extends HTMLElement {
	constructor() {
		super();
		this.velocidad = 0;
		this.x = -100;
		this.id="hongo"
		this.y = Math.random() * window.innerHeight - 120;
		this.innerHTML="<img id='hongo' src='../img/hongo2.png'  width='60px' height='70px'>";
		this.velocidad =  1;
		this.style.position ="fixed";
		this.style.display="none";

	}
	connectedCallback() {
	}
	disconnectedCallback() {
	}
	actualizar() {

		

		if (this.x > window.innerWidth) {
			this.remove();
		}

		if(this.velocidad>=1){
			this.x += this.velocidad=1;
		}
		let mario = document.getElementById("mario");
		if (Colision.procesoColision2(this, mario)) {			

		}

		this.dibujar();
	}
	dibujar() {
		this.style.transform = `translate(${this.x}px, ${this.y}px)`;
	}

}
window.customElements.define("hongo-web", Hongo);


class Mario extends HTMLElement {
	constructor() {
		super();
		this.id = "mario";
		this.x = window.innerWidth / 2 - 50;
		this.y = window.innerHeight - 250;
		this.innerHTML="<img src='../img/logomario.png'  width='60px' height='70px'>";
		this.style.position="fixed";
		this.style.display="none";
		this.callback = (e) => this.onKeyDown(e);
		window.addEventListener("keydown", this.callback);
		this.dibujar();
	}
	connectedCallback() {
	}
	disconnectedCallback() {
		window.removeEventListener("keydown", this.callback);
	}
	onKeyDown(event) {
		switch (event.keyCode) {
			case Keys.LEFT:
			this.x -= 50;

			if (this.x + 50 < 0) {
				this.x = window.innerWidth - 102;
			}
			break;
			case Keys.RIGHT:
			this.x += 50;

			if (this.x >= window.innerWidth) {
				this.x = window.innerWidth == 0;
			}
			break;
			case Keys.UP:
			this.y -= 50;

			if (this.y + 50 < 0) {
				this.y = window.innerHeight - 102;
			}
			break;
			case Keys.DOWN:
			this.y += 50;

			if (this.y >= window.innerHeight) {
				this.y = window.innerHeight == 0;
			}
			break;
		}
		this.dibujar();
	}
	dibujar() {
		this.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
	}
}
window.customElements.define("mario-web", Mario);

var Keys;
(function (Keys) {
	Keys[Keys["UP"] = 38] = "UP";
	Keys[Keys["DOWN"] = 40] = "DOWN";
	Keys[Keys["LEFT"] = 37] = "LEFT";
	Keys[Keys["RIGHT"] = 39] = "RIGHT";
})(Keys || (Keys = {}));


let animacionId ;

function Animacion() {


	animacionId=window.requestAnimationFrame(Animacion);


	juegoLoop();
}

let contador = 0;
let contador2=0;

function juegoLoop(){


	contador++;

	if (contador % 60 == 0) {
		document.body.appendChild(new Monedas());
	}
	
	let monedas = document.getElementsByTagName("moneda-web");

	let m =new Monedas();


	for(var i=0;i<monedas.length;i++){

		monedas[i].style.display="flex";

	}

	for (let m of monedas ) {

		m.actualizar();
	}

	contador2++;

	if (contador2 % 60 == 0) {
		document.body.appendChild(new Hongo());
	}
	let hongos = document.getElementsByTagName("hongo-web");
	let h =new Hongo();

	for(var u=0;u<hongos.length;u++){

		hongos[u].style.display="flex";

	}
	for (let h of hongos ) {

		h.actualizar();
	}


}

class Colision  {

	
	static procesoColision(m, a,) {
		let moneda = m.getBoundingClientRect();
		let mario = a.getBoundingClientRect();

		return (moneda.left < mario.right &&
			moneda.right > mario.left &&
			moneda.top < mario.bottom &&
			moneda.bottom > mario.top);
	}

	static procesoColision2(a, h){
		let mario = a.getBoundingClientRect();
		let hongo = h.getBoundingClientRect();

		if (hongo.left < mario.right &&
			hongo.right > mario.left &&
			hongo.top < mario.bottom &&
			hongo.bottom > mario.top){
			window.cancelAnimationFrame(animacionId);
		
		puntajeTotal.innerHTML=puntaje;
		musica.pause();
		musica.currentTime=0;

		$(function(){
			$("#modal2").modal('show');
		});
		

		resetear();
		
		return false;

	}
}
}

function iniciar(){
	
	puntaje=0;
	elePuntaje.innerHTML= puntaje;
	puntajeTotal.innerHTML=puntaje;
	let nom=document.getElementById("nom").style.display="flex";
	let mario = document.getElementById("mario").style.display="flex";

}

function resetear(){
	
	setTimeout(function() {
		window.location.reload();
	}, 3500);
}

empezarJuegoBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	iniciar();
	Animacion();

	musica.play();
	let nombre=document.querySelector('#nombre').value;

	mostrar.innerHTML = nombre;
	
	$(function(){
		$("#modal").modal('hide');
	});

});


