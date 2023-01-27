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
	constructor(div,controlador,i){
		super(div)
		//Hacemos que la VistaCRUD "observe" al Modelo
		this.controlador = controlador
		this.modelo = this.controlador.getModelo()

		this.modelo.registrar(this.actualizar.bind(this))
		this.modelo.registrar(this.footerAemet.bind(this))
		
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
		

		//Aemet
		this.divDatosAemet = $("<div></div>")
		

		//Para generar tabindex
		this.i=0;

		//Dialog
		this.dialogo = this.div.find('#dialogo')
		this.dialogo.dialog()
		
		this.autocompletar()
		
		
	}
	autocompletar() {
			var availableTags = [
				"Fifa",
				"Elden Ring",
				"League of Legends",
				"Zelda"
			];
			this.buscarNombre .autocomplete({
		  source: availableTags
		})
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
				console.log(this.i)
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
				spanEliminar.attr('role','button')
				spanEliminar.attr('tabindex', this.i)
				spanEliminar.attr('aria-pressed', 'false')
				spanEliminar.text('🗑') 
				spanEliminar.css('cursor','pointer')
				spanEliminar.on('click', this.eliminar.bind(this, dato.id)) 
				this.i++;
			
				let spanConsultar = $("<span></span>")
				td3.append(spanConsultar)
				spanConsultar.addClass('icono')
				spanConsultar.attr('role','button')
				spanConsultar.attr('tabindex', this.i)
				spanConsultar.attr('aria-pressed', 'false')
				spanConsultar.text('🔎')
				spanConsultar.css('cursor','pointer')
				spanConsultar.on('click',this.consultar.bind(this, dato))
			
				this.i++;
				let spanEditar = $("<span></span>")
				td3.append(spanEditar)
				spanEditar.addClass('icono')
				spanEditar.attr('role','button')
				spanEditar.attr('tabindex', this.i)
				spanEditar.attr('aria-pressed', 'false')
				spanEditar.text('✏')
				spanEditar.css('cursor','pointer')
				spanEditar.on('click',this.editar.bind(this, dato))
				this.i++;
				
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
	footerAemet(){
		
		this.borrarAemet()
		let datos = this.modelo.getDatosTiempo()
		
		this.div.append(this.divDatosAemet)
		this.divDatosAemet.css('white-space', 'pre-line')
		this.divDatosAemet.css('text-align','center')
		this.divDatosAemet.css('margin-top','200px')
	
		
		this.divDatosAemet.text(datos)

	}
	/**
	 * Metodo para borrar los registros de la vista
	 */
	borrarIngresos(){
		while (this.tabla.children().length>0)
		this.tabla.children().first().remove()
	}
	borrarAemet(){
		this.divDatosAemet.remove()
	}
	/** 
	 * Metodo para consultar un registro 
	*/
	consultar(dato){
		this.i=0;	
		this.controlador.pulsarConsulta(dato);
	}
	eliminar(id){	
		this.i=0;
		this.controlador.eliminarVideojuego(id)
		this.actualizar();
	}
	editar(dato){
		this.i=0;
		this.controlador.pulsarModificar(dato);
		this.actualizar();
	}
	
}
