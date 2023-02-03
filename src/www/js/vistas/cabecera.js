/**
	@file Contiene la vista de la legalidad de la aplicación
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class Cabecera extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador

        //Elemento html
        this.logo =this.div.find('div').eq(0)
		this.legal = this.div.find('div').eq(1)
        this.legal.on('click',this.pulsarLegal.bind(this))
        this.logo.on('click',this.pulsarInicio.bind(this))
   
    }
    pulsarLegal(){
        this.controlador.pulsarAvisoLegal()
    }
    pulsarInicio(){
        this.controlador.cancelar();
    }
}