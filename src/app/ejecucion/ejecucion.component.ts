import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Algoritmo } from '../class/algoritmo';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, ScatterData, } from 'plotly.js';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlgoritmoService }  from '../services/algoritmo.service';

@Component({
  selector: 'app-ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.css']
})
export class EjecucionComponent implements OnInit {

  algoritmo: Algoritmo;
  implementaciones: String[] = ['Secuencial', 'Distribuido con MPI', 'Paralelo con OpenMP', 'Paralelo con CUDA', 'Hibrido'];
  
  seleccionado: String = undefined;
  implementacion = undefined;
  hoy: Date = new Date();
  inputs: String[] = [ "Vector", "Matriz", "Matriz y Vector"];
  snippets: String[] = [ "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n}",
  "float **readMatrix(int *columnas, const char*nombreArchivo){\n  printf(\"Archivo de matriz: \\n\");\n  printf(nombreArchivo);\n  printf(\"\\n\");\n  FILE *fp;\n  float n = 0;\n  char c;\n  int count=0, row=0, k = 0, i = 0, j = 0;\n\n  fp = fopen(nombreArchivo,\"r\");\n  if (fp == NULL) {\n\t  printf(\"Archivo Invalido\");\n\t  return NULL;\n  }\n    while(fscanf(fp,\"%f\",&n) != -1){ \n      c = fgetc(fp);\n      if(c == '\\n'){\n         row = row+1; \n      }\n      count++;\n    }\n\t*columnas = row;\n    printf(\"Filas = %d Columnas = %d \\n\", row, *columnas);\n\n\tfloat **mat = new float* [row];\n\tfor (int i = 0; i < *columnas; i++) {\n\t\tmat[i] = new float[*columnas];\n\t}\n\n    fseek( fp, 0, SEEK_SET );\n    for(i = 0; i < row; i++){\n\n       for(j = 0; j < (*columnas); j++){\n          fscanf(fp,\"%f\", &mat[i][j]); \n          k++;\n       }\n    }\n    fclose(fp);\n    return mat;\n}",
  "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n} \n float **readMatrix(int *columnas, const char*nombreArchivo){\n  printf(\"Archivo de matriz: \\n\");\n  printf(nombreArchivo);\n  printf(\"\\n\");\n  FILE *fp;\n  float n = 0;\n  char c;\n  int count=0, row=0, k = 0, i = 0, j = 0;\n\n  fp = fopen(nombreArchivo,\"r\");\n  if (fp == NULL) {\n\t  printf(\"Archivo Invalido\");\n\t  return NULL;\n  }\n    while(fscanf(fp,\"%f\",&n) != -1){ \n      c = fgetc(fp);\n      if(c == '\\n'){\n         row = row+1; \n      }\n      count++;\n    }\n\t*columnas = row;\n    printf(\"Filas = %d Columnas = %d \\n\", row, *columnas);\n\n\tfloat **mat = new float* [row];\n\tfor (int i = 0; i < *columnas; i++) {\n\t\tmat[i] = new float[*columnas];\n\t}\n\n    fseek( fp, 0, SEEK_SET );\n    for(i = 0; i < row; i++){\n\n       for(j = 0; j < (*columnas); j++){\n          fscanf(fp,\"%f\", &mat[i][j]); \n          k++;\n       }\n    }\n    fclose(fp);\n    return mat;\n}"];
  snippet: String = "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n}";
  @ViewChild('chart') el: ElementRef;      
  tipos: String[] = ["Entero", "Real"];
  id;

  constructor(
    private route: ActivatedRoute,
    private algoritmoService: AlgoritmoService,
    private location: Location) { }
    
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.algoritmoService.getByID(this.id)
      .subscribe(algoritmo => {
        this.algoritmo = algoritmo;
        console.log(algoritmo)
      });
  }

  seleccionarImplementacion(aux, index){
    if(this.seleccionado && this.seleccionado === index){
      this.seleccionado = undefined;
      this.implementacion = undefined;
    }
    else {
      this.seleccionado = index;
      this.implementacion = this.algoritmo.implementaciones[index];
      this.cargarGrafico();
    }
  }

  cargarGrafico(){

    const element = this.el.nativeElement;
/*
    const auxMatrix : number[][] = [];
    for (let i = 0; i < this.matrix.length; i++) {
      const auxRow : number[] = [];

      for (let j = 0; j < this.matrix[i].length; j++) 
        auxRow.push(this.matrix[i][j]);

      auxMatrix.push(auxRow);
    }
    
    const data: Partial<ScatterData>[] = [{
      z: auxMatrix,
      type: 'surface'
    }];

   
    };*/
   const Layout = {
      title: 'Tiempos de ejecucion para diferentes lotes de Prueba' ,
      autosize: false,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };
    const data2 = [{x:[], y:[]}];
      for (let i = 0; i < this.implementacion.ejecuciones.length; i++) {
        const ej = this.implementacion.ejecuciones[i];
        data2[0].x.push(ej.n);
        data2[0].y.push(ej.tiempo);
      }
    /*const data2 = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }]
    */

    Plotly.newPlot(element, data2 ,Layout);
  
  }

  getFecha(){
    return new Date().getTime();
  }

  componer(nombre: String){
    nombre = nombre.toLowerCase();
    nombre = nombre.replace(" ", "_");
    nombre = nombre.replace(" ", "_");
    return nombre;
  }

  guardar(){
    this.algoritmoService.put(this.algoritmo).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    })
  }
  onChangeInput(index){
    console.log(index)
    this.algoritmo.datos = this.snippets[index];
  }
  onChangeType(index){
    console.log(index)
    this.algoritmo.tipo_datos = this.tipos[index];
  }
  
  estado: String = "Seleccione Crear Datos"

  ejecutar(){
    console.log(this.seleccionado);
    /*this.algoritmoService.postCrearDatos({id:this.id}).subscribe((response)=>{
     this.estado = "Completado";
     
    });*/
    this.estado = "Compilando la solucion";
    this.algoritmoService.ejecutar({_id : this.id, i : this.seleccionado}).subscribe((response)=>{
      console.log(response);
      this.estado = "Ejecutando la solucion";

      this.algoritmoService.ejecutarImplementacion({_id : this.id, i : this.seleccionado}).subscribe((response)=>{
        this.estado = "Ejecucion completada";
        this.estado += response;
        console.log(response);
      });

      this.ngOnInit();
    })


    
  }

  generarDatos(){
    this.algoritmoService.postCrearDatos({id:this.id}).subscribe((response)=>{
      this.estado = "Datos Generados";
     });
  }

}
