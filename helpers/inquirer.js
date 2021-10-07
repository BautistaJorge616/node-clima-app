//Animaciones en la pantalla
const inquirer = require("inquirer");

//Colores 
require('colors');


const preguntas =[

    {
        type: 'list',
        name: 'opt',
        message: '¿Qué deseas hacer?',
        choices: [

            {
                value:1,
                name: `${'1.'.bold.green} Buscar ciudad`
            },

            {
                value:2,
                name: `${'2.'.bold.green} Historial`
            },

            {
                value:0,
                name: `${'0.'.bold.green} Salir`
            }

        ]
    }

];

const inquirerMenu = async ()=>{
    
    console.clear();
    console.log("===========================".rainbow);
    console.log("  ¿Cómo está el clima en?  ".bold.green);
    console.log("===========================\n".rainbow);

    const {opt} = await inquirer.prompt(preguntas);

    return opt;

}


const pausa = async() => {

    const pregunta =[
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    await inquirer.prompt(pregunta);
    
}

const leerInput = async( mensaje ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listarlugares = async( lugares=[] ) => {

    const choices = lugares.map((lugar,i) => {
        const idx = `${i + 1}`.bold.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.bold.green + 'Cancelar'
    });

    const preguntas =[

        {
            type: 'list',
            name: 'id',
            message:'Seleccione el lugar: ',
            choices
        }

    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}



//Funciones que voy a exportar
module.exports= {
    inquirerMenu,
    pausa,
    leerInput,
    listarlugares
}

