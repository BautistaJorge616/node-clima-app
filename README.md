Aplicación de consola interactiva: ¿Cómo está el clima en?  

El proyecto se desarrolló en JavaScript usando Node.Js.

Esta aplicación se comunica con 2 APIs, una se utiliza para localizar un lugar y obtener las coordenadas de este, con estas coordenadas se obtiene el clima del lugar mediante la comunicación con la segunda API.
El usuario ingresa un lugar o ciudad, el programa le muestra las 5 principales coincidencias, el usuario selecciona la que mejor se ajuste a su búsqueda, la aplicación le muestra la información sobre este lugar incluyendo: nombre del lugar o ciudad, latitud, longitud, temperatura actual, temperatura mínima, temperatura máxima y una pequeña descripción sobre el estado del clima.
La aplicación persiste dato mediante un archivo con extensión JSON que se utiliza como base de datos para mantener las ultimas 6 búsquedas del usuario.

Temas relacionados con la aplicación:
•	Consumo de APIs
•	Llamadas HTTP hacia servidores externos
•	Paquete request - superficialmente
•	Paquete Axios
•	Mapbox places para obtener lugares por nombre
•	Uso de OpenWeather para obtener el clima
•	Aplicación de consola con historial

