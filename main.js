//constructor
function Seguro(marca , anio, tipo) 
{
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo; 
}
//cotizarSeguro
Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Ferrari 2.50
        2 = Mercedes 1.75
        3 = Audi 1.65
        4 = Lamborghini 2.30
        5 = Bmw 1.70
        6 = Ford 1.34        
    */ 

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 2.50;
            break;
        case '2':
            cantidad = base * 1.75;
            break;
        case '3':
            cantidad = base * 1.65;
            break;
        case '4':
            cantidad = base * 2.30;
            break;
        case '5':
            cantidad = base * 1.70;
            break;
        case '6':
            cantidad = base * 1.34;
            break;
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    //cada año de diferencia afeca en 3 %
    cantidad -= ((diferencia*3) * cantidad ) / 100;
    /*
        Si el seguro es Básico * 30% más
        Si el seguro es Completo 50% más
    */
   if (this.tipo === 'basico') {
       cantidad *= 1.30;
   } else {
       cantidad *= 1.50;
   }
    return cantidad;
}

//parte visual HTML
function Interfaz(){}

//Mensaje en HTml
Interfaz.prototype.mostarMensaje = function(mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));

  setTimeout(function() {
      document.querySelector('.mensaje').remove();
  }, 2000);
};

//muestra el resultado de la cotización
Interfaz.prototype.mostrarResultado = function (seguro, total) {
    const resultado = document.getElementById('resultado');
    let marca;

    switch (seguro.marca) {
        case '1':
            marca = 'Ferrari';            
            break;
        case '2':
            marca = 'Mercedes';
            break;
        case '3':
            marca = 'Audi';
            break;
        case '4':
            marca = 'Lamborghini';
            break;
        case '5':
            marca = 'Bmw';
            break;
        case '6':
            marca = 'Ford';
            break;        
    }

    //crear un div
    const div = document.createElement('div');
    //muestra la información
    div.innerHTML = `
       <p class="header">Tu resumen:</p>
       <p>Marca: ${marca}</p>
       <p> Año: ${seguro.anio}</p>
       <p>Tipo: ${seguro.tipo}</p>
       <p>Total: $ ${total}</p>   
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 500);   
    
}

//capturar los datos del formulario
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer año seleccionado
    const anio = document.getElementById("anio");
    const anioSeleccionado = anio.options[anio.selectedIndex].value; 

    //leer dato del radio Button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();
    //revisamos que los campos no estén vacíos

    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //interfaz mostrando el error
        interfaz.mostarMensaje('Faltan Datos, revisa e intenta de nuevo', 'error');
    } else {
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        //mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostarMensaje('Cotizando', 'correcto');

    }

});


const max = new Date().getFullYear(),
      min = max - 20;

const  selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
   let option = document.createElement('option');
   option.value = i;
   option.innerHTML = i;
   selectAnios.appendChild(option);
    
}