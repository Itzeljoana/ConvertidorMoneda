const pesosChilenos = document.querySelector("#dinero");
const monedaConver = document.querySelector("#monedaConver") 
const mostrarValor = document.querySelector("#mostrarValor") 
let valorConvertido; //valorIngresado
let valorSeleccionado = monedaConver.value;

pesosChilenos.addEventListener ("input", function (){
    valorConvertido = pesosChilenos.value;
    //return valorConvertido;

});

monedaConver.addEventListener("change", function (){
    valorSeleccionado= monedaConver.value;
    //return valorSeleccionado;
});

async function obtenerCambio() {
    const res = await fetch("https://mindicador.cl/api/");
    const monedas = await res.json();
    const encontrarMoneda = monedas[valorSeleccionado];
    const valorConver = encontrarMoneda.valor * valorConvertido;

    const resHistorial = await fetch(`https://mindicador.cl/api/${valorSeleccionado}?ultimos=10`);
    const historial = await resHistorial.json();
    
  
    const fechas = historial.serie.map(item => item.fecha);
    const valores = historial.serie.map(item => item.valor);
    
    
    const ctx = document.getElementById("chart").getContext("2d");
    
    new Chart(ctx, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [{
                label: `Historial de ${encontrarMoneda.nombre}`,
                data: valores,
                borderColor: "green",
                borderWidth: 2,
                fill: false,
                color: "green",
            }]
        },
    });
    
    mostrarValor.innerHTML = `El valor convertido de  ${encontrarMoneda.nombre} es: $${valorConver}`;
}

