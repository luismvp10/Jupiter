import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  constructor() { }
  funciones: String[] = [
   'Compilar algoritmos.',
   'Ejecutar algoritmos',
   'Tomar tiempos de ejecución.',
   'Sacar métricas basadas en tiempos.',
   'Procesar secuencias de lotes de prueba.'
    ];

  tecnologias = [
    {
      url: '../../assets/img/tecnologias/angular6.png',
      title: 'Angular 6',
      body: 'Usado para el Front-end de la aplicación, la arquitectura de la aplicación puede buscarse en la web de angular.'
    },
    {
      url: '../../assets/img/tecnologias/bootstrap-stack.png',
      title: 'Bootstrap',
      body: 'Utilizado como hoja de estilos principal y así garantizar una página web responsiva.'
    },
    {
      url: '../../assets/img/tecnologias/mongoSticker.png',
      title: 'MongoDB',
      body: 'Usado para almacenar los algoritmos y tiempos de ejecución de los mismos para posteriormente realizar alisis.'
    }
    ,{
      url: '../../assets/img/tecnologias/nodejsSticker.png',
      title: 'NodeJS',
      body: 'Usado para obtener las carácterísticas de cada miembro del cluster como: CPU, memoria, S.O, etc. '
    },
    {
      url: '../../assets/img/tecnologias/expressJS.png',
      title: 'ExpressJS',
      body: ' Framework de NodeJS utilizado principalmente para el manejo del servidor HTTP.'
    }
  ]
  ngOnInit() {
  }

}
