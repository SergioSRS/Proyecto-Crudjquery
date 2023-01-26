/**
	@file Contiene el controlador de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {VistaModificar} from '../vistas/vistamodificar.js'
import {VistaInicio} from '../vistas/vistainicio.js'
import {VistaAlta} from '../vistas/vistaalta.js'
import {VistaConsulta} from '../vistas/vistaconsulta.js'
import {Modelo} from '../modelos/modelo.js';

class Controlador{
    constructor(){
        //Si no tiene conexion cambiarlo
        $(window).on('load',this.iniciar.bind(this))
    }
    /**
     * Inicia el modelo y las vistas
     */
    iniciar(){
         
        //Primero creamos el modelo porque tarda en crear
        this.modelo = new Modelo()
      
        this.divVistaInicio = $('#vistaInicio')
        this.divVistaAlta = $('#vistaAlta')
        this.divVistaConsulta= $('#vistaConsulta')
        this.divVistaModificar = $('#vistaModificar')

        this.vistaInicio = new VistaInicio(this.divVistaInicio, this);
        this.vistaAlta = new VistaAlta(this.divVistaAlta, this)
        this.vistaConsulta = new VistaConsulta(this.divVistaConsulta, this)
        this.vistaModificar = new VistaModificar(this.divVistaModificar, this)
        this.ocultarVistas()
        this.vistaInicio.mostrar(true)
    }
    /**
     * Oculta las vistas de la aplicacion
     */
    ocultarVistas(){
        this.vistaInicio.mostrar(false)
        this.vistaAlta.mostrar(false)
        this.vistaModificar.mostrar(false)
        this.vistaConsulta.mostrar(false)
       
    }
    /**
     * Metodo para cancelar cualquier proceso y volver a la vista inicio
     */
    cancelar(){
        this.ocultarVistas()
        this.vistaInicio.mostrar(true)
    }
    /**
     * Oculta las vistas y muestra la vista de consultas de un dato en concreto
     */
    pulsarConsulta(dato){
        this.ocultarVistas();
        this.vistaConsulta.mostrar(true)
        this.vistaConsulta.pintar(dato)
      
      
    }
     /**  
     * metodo que llama al modelo para editar los datos que se encuentran en el
    */
     aceptarModificar(id, nombre, precio, fecha, descripcion, edad, tematicas, estado, file){
       this.ocultarVistas()
       this.vistaInicio.mostrar(true)
       
        this.modelo.editar(id, nombre, precio, fecha, descripcion, edad, tematicas, estado, file)
        alert("Introducido con exito")      
    }
    /**
     * Metodo encargdo de mostrar la vista del alta
     */
    pulsarAlta(){
        this.ocultarVistas();
        this.vistaAlta.mostrar(true)
    }
    pulsarInicio(){
        this.ocultarVistas();
        this.vistaInicio.mostrar(true)
    }
    /**
     * Metodo para hacer un alta en indexdb de videojuegos
     * @param {string} nombre Titulo del juego
     * @param {number} precio Precio del juego
     * @param {date} fecha Fecha de estreno del juego
     * @param {string} descripcion Descripcion del juego
     * @param {string} edad Edad recomendada para jugar
     * @param {string[]}tematicas Tematicas relacionadas con el juego
     * @param {boolean} estado Definirá si el juego esta terminado o no
     * @param {object} file Imagen relacionada del juego
     */
    aceptarAlta(nombre,precio,fecha,descripcion,edad,tematicas,estado,file){
        this.ocultarVistas()
        this.modelo.insertar(nombre, precio, fecha, descripcion, edad,tematicas,estado,file) 
        this.vistaInicio.mostrar(true)
             
    }
    /**
     * Metodo para eliminar un videojuego
     * @param {number} id 
     */
    eliminarVideojuego(id){
        this.modelo.borrar(id)
    }
    /**
     * Metodo para buscar un registro por nombre
     * @param {string} nombre 
     */
    pulsarBusqueda(nombre){
        this.modelo.obtenerRegistro2(nombre)
    }
    /**
     * Metodo para llamar a la vista de modificar
     * @param {object} dato 
     */
    pulsarModificar(dato){
        this.ocultarVistas();
        this.vistaModificar.mostrar(true)
        this.vistaModificar.rellenar(dato)
        
    }
    /**
     * Metodo para obtener datos
     * @returns devuelve los registros de un videojuego
     */
    getModelo(){
        return this.modelo
    }
    
}
const app = new Controlador()