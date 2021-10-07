require('dotenv').config();


const {
    leerInput,
    inquirerMenu,
    pausa,
    listarlugares
    } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');

const main = async() => {

    //Modelo
    const busquedas = new Busquedas();
    let opt;


    do{
        //Esperar la opción
        opt = await inquirerMenu();

        //Opciones
        switch (opt){
            case 1:
                //Terminos de búsqueda
                const termino = await leerInput('Ciudad: ');
                //Respuesta de la búsqueda
                const lugares = await busquedas.ciudad(termino);
                //Mostar lugares encontrados
                const id = await listarlugares(lugares);
                //Si el usuario selecciona cancelar
                if(id === '0'){
                    continue;
                }
                //Extraer lugar seleccionado
                const lugarSeleccionado = lugares.find( l => l.id === id );
                //Guardar en el historial
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                //Obtener el clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                //console.log(clima);

                //Mostrar información del lugar seleccionado
                console.clear();
                console.log();
                console.log('Información del lugar seleccionado'.bold.yellow);
                console.log();
                console.log(`${'Ciudad: '.bold.green} ${lugarSeleccionado.nombre}`);
                console.log(`${'Latitud: '.bold.green} ${lugarSeleccionado.lat}`);
                console.log(`${'Longitud: '.bold.green} ${lugarSeleccionado.lng}`);
                console.log(`${'Temperatura actual: '.bold.green} ${clima.temp_actual}`);
                console.log(`${'Temperatura máxima: '.bold.green} ${clima.temp_max}`);
                console.log(`${'Temperatura mínima: '.bold.green} ${clima.temp_min}`);
                console.log(`${'Descripción del clima: '.bold.green} ${clima.desc}`);
                console.log();


                break;
            case 2:
                console.log();
                console.log(`Lugares consultados recientemente`.bold.yellow);
                console.log();
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx =`${i+1}.`.bold.green;
                    console.log(`${idx} ${lugar}`);
                });
                console.log();
                break;
        }

        //Pausa solo si el programa sigue en funcionamiento.
        if(opt !== 0){
            await pausa();
        }

    }while(opt !== 0);
}

main();