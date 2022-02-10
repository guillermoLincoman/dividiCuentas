//-Constructore del objeto operacion
function persona(nombre, pago, totalPorPersona, id){
    this.id = id;
    this.nombre = nombre;
    this.pago = pago;
    this.totalPorPersona = parseInt(totalPorPersona);
    this.debe = parseInt(totalPorPersona- pago);
}

//Variables
const formulario = document.querySelector("#formulario");
const perso = document.querySelector(".container_users");
let personas = [];
let flag;

//Eventos
escuchardorEventos();
function escuchardorEventos(){
    formulario.addEventListener('submit', validarTotal)
    perso.addEventListener('click', validarPersona)
    document.addEventListener("DOMContentLoaded", iniciarApp);
}

//Funciones
function iniciarApp(){
    const container =  document.querySelector(".container_users")
    container.classList.add("desaparecer");
}
function validarTotal(e){
    e.preventDefault();
    const total = parseInt(document.querySelector('.login__input').value);
    const containerApp = document.querySelector(".container_app");
    const cantidad = parseInt(document.querySelector(".ctrl-counter-num").innerText);
    flag = cantidad;
    if(total && cantidad && cantidad>0  &&total> 0)
    {   
        containerApp.classList.remove("borderBad");
        containerApp.classList.add("borderGod");
        for (let i = 0; i < cantidad; i++) {
            agregarPersonas(i);
        }
    }else{
        console.log(`No se puede dividir por 0`);

        containerApp.classList.remove("borderGod");
        containerApp.classList.add("borderBad");
    }
} 

function agregarPersonas(id){
    //Lugar donde voy a agregar a la peresona
    const container =  document.querySelector(".container_users")
        console.log("Agregando una persona");
        const div = document.createElement("div");
        div.classList.add("users");
        div.classList.add("register");
        div.innerHTML=`
            <h3 class="titulo_card">PERSONA ${id+1}</h3>
            <ul class="user_card carDos">
                <li><i class="fas fa-user grandeDos"></i></li>
                <form action="#" class="formPersona" data-id="${id+1}">
                    <input class="inpu" id="nombre" type="text" data-role="input" data-prepend="Nombre: ">
                    <input class="inpu" id="pago" type="number" data-role="input" data-prepend="Pago: ">
                    <button type="submit" class="button primary buttonP" ">Primary</button>
                </form>
            </ul>
        `
        //Agrego el html que cree
        container.classList.remove("desaparecer")
        container.appendChild(div);
}


function validarPersona(e){
    e.preventDefault();
    const nombre = e.path[1].children[0].children[0].value;
    const pago = parseFloat(e.path[1].children[1].children[0].value);
    const id = e.path[1].dataset.id;
    const total = parseInt(document.querySelector('.login__input').value);
    const cantidad = parseInt(document.querySelector(".ctrl-counter-num").innerText);
    const totalPorPersona = total /cantidad;
    const container =  document.querySelector(".container_users")
    if(id){
        if (nombre && pago &&pago>=0){
            const nuevaPersona = new persona(nombre, pago, totalPorPersona, id);
            personas = [...personas, nuevaPersona];
            console.log(`Agregaste 1 con el ID ${id}`)
            e.path[3].classList.remove("borderBad");
            e.path[3].classList.add("borderGod");
            console.log(e.path[3])
            flag--;
            if(flag == 0){

                console.log("Borro las cards que es muestran");
                console.log("Muestro los resultados")
                while(container.firstChild){
                    container.removeChild(container.firstChild);
                }
                personas.forEach( person =>{
                    agregarResultado(person);
                })
            }
        }else{
            e.path[3].classList.remove("borderGod");
            e.path[3].classList.add("borderBad");
        }
    }
}

function agregarResultado(persona){
    //Lugar donde voy a agregar a la peresona
    const {nombre, pago, totalPorPersona, debe} = persona;
    const container =  document.querySelector(".container_users")
        console.log("Agregando una persona");
        const div = document.createElement("div");
        div.classList.add("users");
        if(debe<=0)
        {
            div.classList.add("good");
        }else{
            div.classList.add("bad");

        }
        div.innerHTML=`
            <h3 class="titulo_card">SU RESUMEN</h3>
            <ul class="user_card">
                <li><i class="grande far fa-smile ico"></i></li>
                <li class="font-bold">NOMBRE: <span class="font-normal"> ${nombre}</span></li>
                <li class="font-bold">PAGO: $<span class="font-normal">${pago}</span></li>
                <li class="font-bold">TOTAL PERSONA: $<span class="font-normal">$${totalPorPersona}</span></li>
                <li class="font-bold">DEBE: $<span class="font-normal">${debe}</span></li>
            </ul>
        `
        //Agrego el html que cree
        container.classList.remove("desaparecer")
        container.appendChild(div);
}


(function() {
    'use strict';

    function ctrls() {
        var _this = this;

        this.counter = 0;
        this.els = {
            decrement: document.querySelector('.ctrl-button-decrement'),
            counter: {
                container: document.querySelector('.ctrl-counter'),
                num: document.querySelector('.ctrl-counter-num'),
                input: document.querySelector('.ctrl-counter-input')
            },
            increment: document.querySelector('.ctrl-button-increment')
        };

        this.decrement = function() {
            var counter = _this.getCounter();
            var nextCounter = (_this.counter > 0) ? --counter: counter;
            _this.setCounter(nextCounter);
        };

        this.increment = function() {
            var counter = _this.getCounter();
            var nextCounter = (counter < 9999999999) ? ++counter: counter;
            _this.setCounter(nextCounter);
        };

        this.getCounter = function() {
            return _this.counter;
        };

        this.setCounter = function(nextCounter) {
            _this.counter = nextCounter;
        };

        this.debounce = function(callback) {
            setTimeout(callback, 100);
        };

        this.render = function(hideClassName, visibleClassName) {
            _this.els.counter.num.classList.add(hideClassName);

            setTimeout(function() {
                _this.els.counter.num.innerText = _this.getCounter();
                _this.els.counter.input.value = _this.getCounter();
                _this.els.counter.num.classList.add(visibleClassName);
            },
            100);

            setTimeout(function() {
                _this.els.counter.num.classList.remove(hideClassName);
                _this.els.counter.num.classList.remove(visibleClassName);
            },
            200);
        };

        this.ready = function() {
            _this.els.decrement.addEventListener('click',
            () =>{
                _this.debounce(function() {
                    _this.decrement();
                    _this.render('is-decrement-hide', 'is-decrement-visible');
                });
            });

            _this.els.increment.addEventListener('click',
            function() {
                _this.debounce(function() {
                    _this.increment();
                    _this.render('is-increment-hide', 'is-increment-visible');
                });
            });

            _this.els.counter.input.addEventListener('input',
            function(e) {
                var parseValue = parseInt(e.target.value);
                if (!isNaN(parseValue) && parseValue >= 0) {
                    _this.setCounter(parseValue);
                    _this.render();
                }
            });

            _this.els.counter.input.addEventListener('focus',
            function(e) {
                _this.els.counter.container.classList.add('is-input');
            });

            _this.els.counter.input.addEventListener('blur',
            function(e) {
                _this.els.counter.container.classList.remove('is-input');
                _this.render();
            });
        };
    };

    // init
    var controls = new ctrls();
    document.addEventListener('DOMContentLoaded', controls.ready);
})();