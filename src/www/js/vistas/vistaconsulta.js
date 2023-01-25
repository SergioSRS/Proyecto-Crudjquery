/**
/**
	@file Contiene la vista consulta de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaConsulta extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
        
    }
    /** 
     *  Pinta la vista con los datos
    */
  
    pintar(dato){
       
        this.borrarIngresos()
                let contenedor = $("<div></div>")
                this.div.append(contenedor)
                contenedor.attr('id', "contenedor")
                
                let titulo = $("<h2></h2>")
                contenedor.append(titulo)
                titulo.text(dato.nombre)

                let imagen = $("<div></div>")
                imagen.attr('id', "fotoConsulta")
                contenedor.append(imagen)

                let img = $("<img></img>")
                imagen.append(img)
             
                img.width('200px')
                img.height('200px')
                if (dato.file){
                    img.attr('src', dato.file)
                }
                else{
                    let sinfoto="assets/img/nophoto.gif"
                    img.attr('src', sinfoto)
                }
                let parrafo = $('<p></p>')
                contenedor.append(parrafo)
                parrafo.text("Descripcion: "+ dato.descripcion)

                let fecha = $('<p></p>')
                contenedor.append(fecha)
                fecha.text("Fecha de lanzamiento: " + dato.fecha) 
				
				let edadRecomendada = $('<p></p>')
                contenedor.append(edadRecomendada)
                edadRecomendada.text("Edad Recomendada" + dato.edad)

				let estado = $('<p></p>')
                contenedor.append(estado)
				
				if (dato.estado===true)
                estado.text("Completado: Sí")   
				else
				estado.text("Completado: No" )

				let tematica = $('<p></p>')
                contenedor.append(tematica)
				
				tematica.text("Tematicas: " + dato.tematicas)
                

                let botonVolver = $('<button></button>')
                contenedor.append(botonVolver)
                botonVolver.text("Volver") 
                botonVolver.on('click',this.volver.bind(this))

    }
    /**
     * Borra los elementos generados en la vista consulta
     */
        borrarIngresos(){
            while (this.div.children().length>0)
            this.div.children().first().remove()
        }
    /**
     * Vuelve a la vista inicio
     */
    volver(){
        this.controlador.cancelar();
    }
}