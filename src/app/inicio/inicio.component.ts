import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Alumno } from '../class/alumno';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, ScatterData, } from 'plotly.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  @ViewChild('chart1') el1: ElementRef;
  @ViewChild('chart2') el2: ElementRef;
  @ViewChild('chart3') el3: ElementRef;
  @ViewChild('chart4') el4: ElementRef;
  @ViewChild('chart5') el5: ElementRef;
  @ViewChild('chart6') el6: ElementRef;
  constructor() { }
  alumnos: Alumno[] = [
    { nombre: 'Olivares Juan Ignacio', registro: '18434' },
    { nombre: 'Valencia Luiz Miguel', registro: '18434' },
    { nombre: 'Daniel Diaz', registro: '18434' }
  ];
  title: String = "Trabajo Final de Sistemas Distribuidos y Paralelos";
  concept: String = "La idea de esta web es la centralizacion, ejecucion y visualizacion de resultados de programas tanto distribuidos, paralelos como hibridos.";
  ngOnInit() {
    this.cargarGrafico()
  }
  cargarGrafico(){

   const element1 = this.el1.nativeElement;
   const element2 = this.el2.nativeElement;
   const element3 = this.el3.nativeElement;
   const element4 = this.el4.nativeElement;
   const element5 = this.el5.nativeElement;
   const element6 = this.el6.nativeElement;
   const Layout = {
      title: 'Tiempos de ejecucion para diferentes lotes de Prueba - Ordenamiento' ,
      autosize: true,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };
    const LayoutMul = {
      title: 'Tiempos de ejecucion para diferentes lotes de Prueba - Matriz x Vector' ,
      autosize: true,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };
    const LayoutSum = {
      title: 'Tiempos de ejecucion para diferentes lotes de Prueba - Suma de Prefijos' ,
      autosize: true,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };
    /*const data2 = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }]
    */


    const ordenar_sec_par = [{
      x: [10, 100, 1000, 10000],
      y: [0.000015, 0.000036, 0.000254, 0.002373],
      name: "Secuencial"
    },{
      x: [10, 100, 1000, 10000],
      y: [0.004601, 0.007747, 0.022152, 0.161509],
      name: "OpenMP"
    }
    ]
    Plotly.newPlot(element1, ordenar_sec_par ,Layout);

    const ordenar_mpi = [{
      x: [10, 100, 1000, 10000],
      y: [0.008339, 0.007903, 0.010034, 0.783940],
      name: "N = 2"
    },{
      x: [10, 100, 1000, 10000],
      y: [0.021061, 0.020732, 0.027064, 0.478434],
      name: "N = 5"
    },{
      x: [10, 100, 1000, 10000],
      y: [0.076567, 0.095645, 0.059181, 0.4444425],
      name: "N = 10"
    }
    ]
    Plotly.newPlot(element2, ordenar_mpi ,Layout);

    const mul_sec_par = [{
      x: [10, 100, 1000, 10000],
      y: [0.000010, 0.000032, 0.015, 0.469],
      name: "Secuencial"
    },{
      x: [10, 100, 1000, 10000],
      y: [0.000285217, 0.0049997, 0.05924, 0.18643],
      name: "OpenMP"
    }
    ]
    Plotly.newPlot(element3, mul_sec_par ,LayoutMul);

    const mul_mpi = [{
      x: [10, 100, 1000],
      y: [0.000181, 0.000219, 0.025306],
      name: "N = 2"
    },{
      x: [10, 100, 1000],
      y: [0.000428, 0.000714, 0.021167],
      name: "N = 5"
    },{
      x: [10, 100, 1000],
      y: [0.000877, 0.002012, 0.012899],
      name: "N = 10"
    }
    ]
    Plotly.newPlot(element4, mul_mpi ,LayoutMul);

    //suma pref
    const suma_sec_par = [{
      x: [10, 100, 1000],
      y: [0.0000011, 0.0000025, 0.000086],
      name: "Secuencial"
    },{
      x: [10, 100, 1000],
      y: [0.00000183, 0.000003223, 0.0000671],
      name: "OpenMP"
    }
    ]
    Plotly.newPlot(element5, suma_sec_par ,LayoutSum);

    /*const sum_mpi = [{
      x: [8, 128, 1000],
      y: [0.000181, 0.000219, 0.025306],
      name: "N = 2"
    },{
      x: [10, 100, 1000],
      y: [0.000428, 0.000714, 0.021167],
      name: "N = 5"
    },{
      x: [10, 100, 1000],
      y: [0.000877, 0.002012, 0.012899],
      name: "N = 10"
    }
    ]
    Plotly.newPlot(element4, sum_mpi ,LayoutSum);*/
  }
}

