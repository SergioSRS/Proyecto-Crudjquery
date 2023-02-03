/**
	@file Contiene la vista de la legalidad de la aplicación
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaLegal extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador
        
    }
    pintar(){
        this.borrarIngresos()
        
        let titulo = $("<h2></h2>")
        this.div.append(titulo)
        titulo.text("Avisos Legales")
        
        let parrafo = $("<p></p>")
        this.div.append(parrafo)
        parrafo.text("La web y sus contenidos son propiedad de Sergio Rivera Salgado"
        +"NIF 9999999A, con domicilio profesional en la calle Tortilla con Pan, 19a de Cocinas (06969)."
        +"Si considera que sus derechos está siendo conculcado en esta web, por favor póngase en contacto por alguno de los siguientes medios:")
        
        let ul =  $("<ul></ul>")
        this.div.append(ul)
        
        let li1 = $("<li>Por email en la dirección sergioriverasalgado15@gmail.com</li>")
        
        let li2 = $("<li>Por teléfono en el número +(34) 999 99 99 99</li>")
 
        let li3 = $("<li>Por escrito en la dirección indicada anteriormente</li>")
        
        ul.append(li1,li2,li3)
        ul.css("margin","20px 0px 20px 50px")
    
        let cookies = $("<h2>Política de Cookies</h2>")
        this.div.append(cookies)

        let infoCookies = $("<p>A la espera de implementarlas</p>")
        this.div.append(infoCookies)
        
        let datosPersonales = $("<h2>Cumplimiento Ley Orgánica de Protección de Datos Personales</h2>")
        this.div.append(datosPersonales)

        let infoDatosPersonales = $("<p>En esta web no se recogen datos personales ni de navegación.miento Ley Orgánica de Protección de Datos Personales</p>")

        this.div.append(infoDatosPersonales)

        let botonVolver = $('<button></button>')
        this.div.append(botonVolver)
        botonVolver.text("Volver") 
        botonVolver.on('click',this.volver.bind(this))       
    }
     /**
     * Borra los elementos generados en la vista legal
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