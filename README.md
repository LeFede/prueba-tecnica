## Pasos para probar:

1. git clone https://github.com/LeFede/prueba-tecnica.github
2. cd prueba-tecnica
3. npm i
4. npm run dev
5. @browser: localhost:5173

### Prueba:

1. Conectarse a la base de datos en Air Table (desde la API o SDK, lo que te sea conveniente).
   TOKEN: patJiiqIZNEW4FtGr.24f9ec4e8c76cd844ae0598c3b7bce856e539c7ec2462f8b2ffec6e2535cfe27
   BD: VentasV2 (app3Pyxut69TI3X9D/tblyyhxitP3K9zkOZ)
   TABLA: Auto(viwwtRFLIhgFYh19s)
   CAMPOS: [Nombre: Text, Modelo: Text, Precio: Float]

2. Crear una landing que traiga todos los datos existentes en la DB y los muestre en pantalla (no es necesario estilar).

3. Crear un input para registrar un auto con los parámetros: nombre, modelo y precio.

4. Confirmar el estado de la solicitud con un toast.

### Cosas que cambiaria:

- no esta estilado
- no esta muy modularizado que digamos
- no hay un checkeo de errores demasiado profesional
- no estan las credenciales listas para usarse con un .env (estan en el mismo componente)
- no use custom hooks
