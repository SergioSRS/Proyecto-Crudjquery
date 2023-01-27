/**
	@file Contiene la vista consulta de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaAlta extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador

		/*Valores para hacer un alta*/
		this.iNombre = this.div.find('input').eq(0)
		this.iNombre.tooltip()
		
		this.iPrecio = this.div.find('input').eq(1)
		this.iPrecio.tooltip()
		this.iFecha = this.div.find('input').eq(2)
		this.iFecha.tooltip()
		this.iDescripcion = this.div.find('input').eq(3)
		this.iDescripcion.tooltip()
		this.iEdad = this.div.find('select').eq(0)
		this.iEdad.tooltip()
		this.iFile= this.div.find('input').eq(4)	
		this.iFile.tooltip()
		this.iTematicas = this.div.find('.tematica')

		this.iEstado = this.div.find('.estado')

		this.iCancelar = this.div.find('button').eq(0)
       	this.iAceptar = this.div.find('button').eq(1)
        

	   //Evento que le asocio al elemento
	  
		this.iAceptar.on('click',this.aceptar.bind(this))
		this.iCancelar.on('click',this.cancelar.bind(this) )
		
		
		
		this.estado = true;
    }
	cancelar(){
		this.apagarAlertas()
		this.controlador.cancelar()
		
	}
	/**
	 * Apaga las alertas del formulario
	 */
	apagarAlertas(){
		this.iNombre.css("background-color","white")
		this.iPrecio.css("background-color","white")
		this.iFecha.css("background-color","white")
		this.iDescripcion.css("background-color","white")
	}
	/**
	 * Metodo para ingresar un registro (valida los campos)
	 */
	aceptar(){
		this.apagarAlertas()
		//Queremos esto en local, el registro de tematicas se hará una vez por click
		let tematicas = []

	if (this.iEstado.eq(0).is(':checked')){
		this.estado=true
	
	}
	if (this.iEstado.eq(1).is(':checked')){
		this.estado=false
		
	}
	
	
	if (this.iTematicas.eq(0).is(':checked')){
		tematicas.push(this.iTematicas.eq(0).val())
	}
	if (this.iTematicas.eq(1).is(':checked')){
		tematicas.push(this.iTematicas.eq(1).val())
	}
	if (this.iTematicas.eq(2).is(':checked')){
		tematicas.push(this.iTematicas.eq(2).val())
	}
	if (!this.iTematicas.eq(0).is(':checked') && !this.iTematicas.eq(1).is(':checked') && !this.iTematicas.eq(2).is(':checked'))
		tematicas.push("No tiene tematicas relacionadas")
	
		let expRegNombre = /^[A-Z][a-z]{2,9}$/
		let expRegSoloNumeros=/^[0-9]+$/;

		try{
			if(!expRegNombre.test(this.iNombre.val())){
				this.iNombre.css("background-color","red")
				window.scrollTo(0,0)
				throw "Introduce un nombre válido"
			}
			if(!expRegSoloNumeros.test(this.iPrecio.val())){
				this.iPrecio.css("background-color","red")
				window.scrollTo(0,0)
				throw "Debes de introducir un numero"
			}
			if(!this.iFecha.val() ){
				this.iFecha.css("background-color","red")
				window.scrollTo(0,0)
				throw "Debes de introducir una fecha de aparición correcta"
			}
			
			if(!this.iDescripcion.val()){
				this.iDescripcion.css("background-color","red")
				window.scrollTo(0,0)
				throw "Debes introducir una descripcion"
			}
		
			if(this.iEdad.val() != "+18" && this.iEdad.val() != "+13" && this.iEdad.val() != "+7" && this.iEdad.val() != "+3")
			throw "Debes introducir una Edad Recomendada"

		
			/*Me lleva al controlador los datos*/
			alert("Estas seguro de ingresar este juego?")
				this.controlador.aceptarAlta(this.iNombre.val(), this.iPrecio.val(), this.iFecha.val(),
				this.iDescripcion.val(), this.iEdad.val(),tematicas,this.estado,this.iFile.prop('files')[0])
			
				
			/*Me reseta los valores de los campos*/
				
				this.iNombre.val("")
				this.iPrecio.val(0)
				this.iFecha.value("")
				this.iDescripcion.val("")
				this.iFile.val(null)
				this.iTematicas.eq(0).prop('checked',false) 
				this.iTematicas.eq(1).prop('checked',false) 
				this.iTematicas.eq(2).prop('checked',false) 

	
		}
		catch(error){
			
		}
	}
}
