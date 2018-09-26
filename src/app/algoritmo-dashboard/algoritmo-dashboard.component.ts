import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Algoritmo } from '../class/algoritmo';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, ScatterData, } from 'plotly.js';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlgoritmoService }  from '../services/algoritmo.service';

@Component({
  selector: 'app-algoritmo-dashboard',
  templateUrl: './algoritmo-dashboard.component.html',
  styleUrls: ['./algoritmo-dashboard.component.css']
})
export class AlgoritmoDashboardComponent implements OnInit {

  implementaciones: String[] = ['Secuencial', 'Distribuido con MPI', 'Paralelo con OpenMP', 'Paralelo con CUDA', 'Hibrido'];
  
  seleccionado: String = undefined;
  implementacion = undefined;
  hoy: Date = new Date();

  tamanio = 10;
  matrix = [[1,23], [123,332]];
  matrixN;
  matrixM;
  visibilidadMatrix = true;
  newN;
  newM;
  maxG = 100;
  minG = 1;

  /*algoritmo: Algoritmo = 
    { nombre: 'Matriz por Vector',
      descripcion: 'Ejecucion del algoritmo Matriz x Vector',
      foto: "..",
      autor: "Juan",
      implementaciones: [
        {tipo: 'Secuencial', codigo: '-', parametros: 's'},
        {tipo: 'Distribuido con MPI', codigo: '-', parametros: 's'},
        {tipo: 'Paralelo con OpenMP', codigo: '-', parametros: 's'},
        {tipo: 'Paralelo con CUDA', codigo: '-', parametros: 's'},
        {tipo: 'Hibrido', codigo: '-', parametros: 's'}]};*/

  algoritmo: Algoritmo;
  inputs: String[] = [ "Vector", "Matriz", "Matriz y Vector"];
  snippets: String[] = [ "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n}",
  "float **readMatrix(int *columnas, const char*nombreArchivo){\n  printf(\"Archivo de matriz: \\n\");\n  printf(nombreArchivo);\n  printf(\"\\n\");\n  FILE *fp;\n  float n = 0;\n  char c;\n  int count=0, row=0, k = 0, i = 0, j = 0;\n\n  fp = fopen(nombreArchivo,\"r\");\n  if (fp == NULL) {\n\t  printf(\"Archivo Invalido\");\n\t  return NULL;\n  }\n    while(fscanf(fp,\"%f\",&n) != -1){ \n      c = fgetc(fp);\n      if(c == '\\n'){\n         row = row+1; \n      }\n      count++;\n    }\n\t*columnas = row;\n    printf(\"Filas = %d Columnas = %d \\n\", row, *columnas);\n\n\tfloat **mat = new float* [row];\n\tfor (int i = 0; i < *columnas; i++) {\n\t\tmat[i] = new float[*columnas];\n\t}\n\n    fseek( fp, 0, SEEK_SET );\n    for(i = 0; i < row; i++){\n\n       for(j = 0; j < (*columnas); j++){\n          fscanf(fp,\"%f\", &mat[i][j]); \n          k++;\n       }\n    }\n    fclose(fp);\n    return mat;\n}",
  "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n} \n float **readMatrix(int *columnas, const char*nombreArchivo){\n  printf(\"Archivo de matriz: \\n\");\n  printf(nombreArchivo);\n  printf(\"\\n\");\n  FILE *fp;\n  float n = 0;\n  char c;\n  int count=0, row=0, k = 0, i = 0, j = 0;\n\n  fp = fopen(nombreArchivo,\"r\");\n  if (fp == NULL) {\n\t  printf(\"Archivo Invalido\");\n\t  return NULL;\n  }\n    while(fscanf(fp,\"%f\",&n) != -1){ \n      c = fgetc(fp);\n      if(c == '\\n'){\n         row = row+1; \n      }\n      count++;\n    }\n\t*columnas = row;\n    printf(\"Filas = %d Columnas = %d \\n\", row, *columnas);\n\n\tfloat **mat = new float* [row];\n\tfor (int i = 0; i < *columnas; i++) {\n\t\tmat[i] = new float[*columnas];\n\t}\n\n    fseek( fp, 0, SEEK_SET );\n    for(i = 0; i < row; i++){\n\n       for(j = 0; j < (*columnas); j++){\n          fscanf(fp,\"%f\", &mat[i][j]); \n          k++;\n       }\n    }\n    fclose(fp);\n    return mat;\n}"];
  snippet: String = "float *readVector(int columnas, const char*nombreArchivo){\n\tprintf(\"Archivo de vector: \\n\");\n\tprintf(nombreArchivo);\n\tprintf(\"\\n\");\n    FILE *fp    =  fopen(nombreArchivo,\"r\"); \n    int cantidad = 0;\n    float n=0,*sum,*rec_data,*data;\n\tfloat *vec = new float [columnas];\n\tif (fp == NULL) {\n\t\tprintf(\"Archivo Invalido\");\n\t\treturn NULL;\n\t}\n    while(fscanf(fp,\"%f\",&n) != -1){\n        cantidad++; \n    }\n    printf(\"Longitud del vector = %d\\n\", cantidad);\n\n    fseek( fp, 0, SEEK_SET );\n\n    for(int i = 0; i < columnas; i++){\n      fscanf(fp,\"%f\",&vec[i]); \n    }\n    fclose(fp);\n    return vec;\n}";
  //@ViewChild('chart') el: ElementRef;      
  tipos: String[] = ["Entero", "Real"];
  constructor(
    private route: ActivatedRoute,
    private algoritmoService: AlgoritmoService,
    private location: Location
  ) { }

  ngOnInit() {
    /**this.matrixN = Array(this.matrix[0].length).fill(4).map((x,i)=>i);
    this.matrixM = Array(this.matrix.length).fill(4).map((x,i)=>i);
    this.newN = this.matrix.length;
    this.newM = this.matrix[0].length;
    //Matriz iniciar
    this.chart();
    var  exp = new String("(31*y*y*y)/6 + (47*y*y)/2  - (20*y)/3 + 1");
    var  exp2 = new String("(31*y*y*y)/6 + (47*y*y)/2");
    var exp3 = new String("(20*y)/3 + 1");
    var y : number= 0;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        console.log(y);
        console.log(eval(exp.toString()));
        y++;
      }
    }
    /****************   get algoritmo by id   *****************/
    const id = this.route.snapshot.paramMap.get('id');
    this.algoritmoService.getByID(id)
      .subscribe(algoritmo => {
        this.algoritmo = algoritmo;
      });
  }

  /*chart(){
    const element = this.el.nativeElement;

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

    const Layout = {
      title: 'Matris de ' + this.matrix.length + 'x' + this.matrix[0].length ,
      autosize: false,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90
      }
    };

    const data2 = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }]

    Plotly.newPlot(element, data ,Layout);
  
  }*/

  seleccionarImplementacion(aux, index){
    if(this.seleccionado && this.seleccionado === aux){
      this.seleccionado = undefined;
      this.implementacion = undefined;
    }
    else {
      this.seleccionado = aux;
      this.implementacion = this.algoritmo.implementaciones[index];
    }
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

  generarMatriz(){
    var matrix = [];

    for (let i = 0; i < this.newN; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.newM; j++) {
        matrix[i][j] = Math.floor((Math.random() * this.maxG) + this.minG);
      }
      
    }
    this.matrix = matrix;
    this.matrixN = Array(this.matrix[0].length).fill(4).map((x,i)=>i);
    this.matrixM = Array(this.matrix.length).fill(4).map((x,i)=>i);
    //this.chart();
  }

  visibilidadM(){
    this.visibilidadMatrix = !this.visibilidadMatrix;
    console.log(this.visibilidadMatrix);
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
}
