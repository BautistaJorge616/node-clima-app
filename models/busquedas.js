const fs = require('fs');

const axios = require('axios');

class Busquedas{
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get paramsMapbox(){
        return {

            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language': 'es'

        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            //Dividir por espacios
            let palabras = lugar.split(' ');

            palabras = palabras.map(p=>p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }


    async ciudad(lugar = ''){

        try{

            //Petición HTTP tipo GET
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                lng:lugar.center[0],
                lat:lugar.center[1]
            }));

        }catch(error){
            //No se encontraron coincidencias
            return [];
        }

       
    }

    async climaLugar(lat, lon){
        try{

            //Petición HTTP tipo GET
            const instance = axios.create({
                baseURL: `http://api.openweathermap.org/data/2.5/weather`,
                params:{
                    'lat': lat,
                    'lon':lon,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units':'metric',
                    'lang':'es'
                }
            });

            const resp = await instance.get();

            //console.log(resp.data);

            const {weather,main} = resp.data;

            //Tomar valores que necesito
           return{
               desc:weather[0].description,
               temp_actual:main.temp,
               temp_min:main.temp_min,
               temp_max:main.temp_max
           }



        }catch(error){
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        //Mantener solo 6 registros
        this.historial = this.historial.splice(0,5);

        //Colocar en la cima del historial
        this.historial.unshift(lugar.toLocaleLowerCase());
        
        //Grabar en la base de datos
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial:this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        //Por si no existe el archivo
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});

        //Parsear a un objeto JSON
        const data = JSON.parse(info);

        //Agregar el historial a la propiedad de mi modelo
        this.historial = data.historial;

    }

}

module.exports = Busquedas;