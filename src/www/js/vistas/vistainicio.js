/**
	@file Contiene la vista inicial de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaInicio extends Vista{
	/**
		Constructor de la clase
	**/
	constructor(div,controlador){
		super(div)
		//Hacemos que la VistaCRUD "observe" al Modelo
		this.controlador = controlador
		this.modelo = this.controlador.getModelo()

		this.modelo.registrar(this.actualizar.bind(this))
		//Elemento html
		this.buscar = this.div.find('svg').eq(0)
		this.anadir = this.div.find('svg').eq(1)
		//Evento
		this.anadir.on('click',this.pulsarAnadir.bind(this))
		this.buscar.on('click',this.pulsarBuscar.bind(this)) 

		//Menu opciones
		this.buscarNombre = this.div.find('input').eq(0)
	
	

		//Tabla
		this.tabla = this.div.find('tbody').eq(0)
		
	}
	pulsarAnadir(){
		this.controlador.pulsarAlta()
	}
	pulsarBuscar(){
		this.controlador.pulsarBusqueda(this.buscarNombre.val())
		this.actualizar()
	}
	/**
	 * Refresca y crea la tabla de ingresos de la consulta
	 */
	actualizar(){
	
		this.borrarIngresos()
		
		let datos = this.modelo.getDatos()
		if(datos != null)
		{
			for (let dato of datos){

				let tr = $("<tr></tr>")
				
				this.tabla.append(tr)
				
				let td1 = $("<td></td>")

				tr.append(td1)
				td1.text(dato.nombre)
			
				let td2 = $("<td></td>")
				tr.append(td2)
				if (dato.file){
					
					let img = $("<img></img>")
					img.width('96px')
					img.height('96px')
					img.attr('src', dato.file)
					td2.append(img)
				}
				else{
					td2.text("Sin foto 😞")
				}
				let td3 = $("<td></td>")
			
				tr.append(td3)
				let spanEliminar = $("<span></span>")
				td3.append(spanEliminar)
				spanEliminar.addClass('icono')
				spanEliminar.text('🗑') 
				spanEliminar.on('click', this.eliminar.bind(this, dato.id)) 
				
			
				let spanConsultar = $("<span></span>")
				td3.append(spanConsultar)
				spanConsultar.addClass('icono')
				spanConsultar.text('🔎')
				spanConsultar.on('click',this.consultar.bind(this, dato))
			
			
				let spanEditar = $("<span></span>")
				td3.append(spanEditar)
				spanEditar.addClass('icono')
				spanEditar.text('✏')
				spanEditar.on('click',this.editar.bind(this, dato))
				
		}
		if(datos.length==0)
		{
			let tr = $("<tr></tr>")
			this.tabla.append(tr)
			let td1 = $("<td></td>")
			tr.append(td1)
			td1.text("No hay registros") 
			td1.attr("colspan", "3")
		}
	
	}
	}
	/**
	 * Metodo para borrar los registros de la vista
	 */
	borrarIngresos(){
		while (this.tabla.children().length>0)
		this.tabla.children().first().remove()
	}
	/** 
	 * Metodo para consultar un registro 
	*/
	consultar(dato){	
		this.controlador.pulsarConsulta(dato);
	}
	eliminar(id){	
		this.controlador.eliminarVideojuego(id)
		this.actualizar();
	}
	editar(dato){
		this.controlador.pulsarModificar(dato);
		this.actualizar();
	}
	
}
