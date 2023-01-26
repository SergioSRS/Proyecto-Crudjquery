/**
	@file Contiene el modelo de la aplicación
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
export class Modelo{
	/**
		Constructor de la clase
	**/
	constructor(){
		this.baseDatos
		this.lista = []
		this.callbacks = [] 
		this.conexionBD()
		this.aemet()
		this.datosTiempo
		
	}
	
	/**
	 * Registra a los callbacks en el array de callbacks
	 * @param {array} callback callback para mantener actualizada las vistas
	 */
    registrar(callback){
        this.callbacks.push(callback)
	}
	/**
	 * Avisa a los callback
	 */
	avisar(){
		for(let callback of this.callbacks)
		callback()
	}
	aemet(){

		/**** Parte de AEMET ****/
		let settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://opendata.aemet.es/opendata/api/prediccion/provincia/hoy/06/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnRvbmlvY2FybG9zbW9ydW5vZ29tZXouZ3VhZGFsdXBlQGFsdW1uYWRvLmZ1bmRhY2lvbmxveW9sYS5uZXQiLCJqdGkiOiI2YjEzOWY1OS0xYmYyLTQ2ZDItYWQwMS0yYTdkMTJlMTVjZWYiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY3MDI2NTU4NywidXNlcklkIjoiNmIxMzlmNTktMWJmMi00NmQyLWFkMDEtMmE3ZDEyZTE1Y2VmIiwicm9sZSI6IiJ9.P8lK0K7lft9YT96TkgvU_ywD2TdxQ51MXqLAR8C-Uc4",
			"method": "GET",
			"headers": {
			"cache-control": "no-cache"
			}
		}

	
		$.ajax(settings)
		.done((response) => {
			$.ajax(response.datos)
				.done((response) => {
					
					this.datosTiempo = response
					console.log(this.datosTiempo)
					this.avisar()
				})
		})
	}
	/**
	 * Metodo que te devuelve la lista de registros y avisa a los callbacks
	 */
    obtenerRegistro(){
		const peticion= this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').getAll();
		
		peticion.onsuccess = () => {
			this.lista = peticion.result;
			this.avisar()
		}
		peticion.onerror = () => {
			console.error("No se ha podido conectar")
		}
	}
	/** 
	 * Edita un registro de la base de datos buscando por un id
	*/
    editar(id, nombre, precio, fecha, descripcion, edad, tematicas, estado, file){
		
		const request = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").get(id)
		
	
		request.onerror = (evento) =>{
			console.log("fallo en editar")
		}
		request.onsuccess = (evento)=>{
			const videojuego = evento.target.result
				
			if (file)
			{
				
				let reader = new FileReader()
				reader.readAsDataURL(file)
			
				reader.onload = () =>{
			
					videojuego.nombre = nombre
					videojuego.precio = precio
					videojuego.fecha = fecha
					videojuego.descripcion = descripcion
					videojuego.edad = edad
					videojuego.tematicas = tematicas
					videojuego.estado = estado
					videojuego.file = reader.result

					const modificacion = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").put(videojuego)
					
					this.obtenerRegistro()
				}
			
			}
			else{
					
					videojuego.nombre = nombre
					videojuego.precio = precio
					videojuego.fecha = fecha
					videojuego.descripcion = descripcion
					videojuego.edad = edad
					videojuego.tematicas = tematicas
					videojuego.estado = estado
					videojuego.file = null

					const modificacion = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").put(videojuego)

					this.obtenerRegistro()

			}
   		 }
	}
    /** 
	 * Insertar un registro en el indexdb, si tiene file utilizaremos FileReader
	 *@param {string} nombre Titulo del juego
     * @param {number} precio Precio del juego
     * @param {date} fecha Fecha de estreno del juego
     * @param {string} descripcion Descripcion del juego
     * @param {string} edad Edad recomendada para jugar
     * @param {string[]}tematicas Tematicas relacionadas con el juego
     * @param {boolean} estado Definirá si el juego esta terminado o no
     * @param {object} file Imagen relacionada del juego
	*/
	insertar(nombre,precio,fecha,descripcion,edad,tematicas,estado,file){
	
		if (file)
		{
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () =>
			{
				let obj = {
					nombre: nombre,
					precio: precio,
					fecha: fecha,
					descripcion: descripcion,
					edad: edad,
					tematicas:tematicas,
					estado:estado,
					file:reader.result
				}
				const almacenar=this.baseDatos.transaction('videojuegos','readwrite').objectStore('videojuegos').add(obj);
				almacenar.onsuccess=()=>{
					
					this.obtenerRegistro()
				}
			}
		}
		else
		{
			let obj = {
				nombre: nombre,
				precio: precio,
				fecha: fecha,
				descripcion: descripcion,
				edad: edad,
				tematicas:tematicas,
				estado:estado,
				file:null
			}
			const almacenar=this.baseDatos.transaction('videojuegos','readwrite').objectStore('videojuegos').add(obj);
			almacenar.onsuccess=()=>{
				
				this.obtenerRegistro()
			}
		}
	}
	
	/**
	 * Devuelve los registros que haya en la base de datos y luego llama a los callbacks para la busqueda por nombre
	 *	@param { string } nombre nombre del registro
	**/
		obtenerRegistro2(nombre){
			if (!nombre){
				this.obtenerRegistro()
			}
			else{
				const peticion= this.baseDatos.transaction('videojuegos', 'readonly').objectStore('videojuegos').index('nombreIndex').getAll(nombre);
			
				peticion.onsuccess = () => {
					
					this.lista = peticion.result;
					this.avisar()
				}
				peticion.onerror = () => {
					console.error("No se ha podido conectar")
				}
			}
		
		}
	/**
	 * identifica un registro de la base de datos
	 * @param { number } id id que identifica un registro del indexdb
	 */
	borrar(id){
		const request = this.baseDatos.transaction('videojuegos','readwrite').objectStore("videojuegos").delete(id)

		request.onsuccess = () =>{
			this.obtenerRegistro();
		}
	}
	/**
	 * Hace la conexion con el index db
	 */
	conexionBD(){
		const bd=window.indexedDB
		if(window.indexedDB){
		
			const respuesta=indexedDB.open("Videojuegos",1);
		
			respuesta.onsuccess=(event)=>{
				
				this.baseDatos=event.target.result
				
				
				
				this.obtenerRegistro()
			}
			respuesta.onerror=()=>{
				console.log('ERROR');
			}
			respuesta.onupgradeneeded=(evt)=>{
				
				this.baseDatos=evt.target.result
				this.baseDatos.createObjectStore('videojuegos',{keyPath:'id', autoIncrement:true}).createIndex('nombreIndex', 'nombre')
				
			}
		}	
	}
	
	/**
 * Retorna la lista de datos del modelo
 * @returns this.lista
 */
	getDatos(){
		return this.lista
	}
	getDatosTiempo(){
		return this.datosTiempo;
	}
}