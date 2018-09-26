import { Component, OnInit } from '@angular/core';
import { Algoritmo } from '../class/algoritmo';
import { Ejecucion } from '../class/ejecucion';
import { AlgoritmoService } from '../services/algoritmo.service';
import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  /*algs: Algoritmo[] = [
    { nombre: 'Matriz por Vector',
      descripcion: 'Ejecucion del algoritmo Matriz x Vector',
      foto: "..",
      autor: "Juan",
      implementaciones: [{tipo: 'distribuido', codigo: 'asd', parametros: 's'}]}];]*/

  algs: Algoritmo[];

  aux = {
    nombre: '',
    descripcion: '',
    autor: ""
  };

  constructor(private algoritmoService: AlgoritmoService) { }

  ngOnInit() {
    this.algoritmoService.get().subscribe((data: Algoritmo[]) => {
      console.log(data);
      this.algs = data;
    });
  }

  agregar():void{
    this.ngOnInit();
    this.algoritmoService.post(this.aux).subscribe((response)=>{
      this.closeBtn.nativeElement.click();
      this.aux =  {
        nombre: '',
        descripcion: '',
        autor: ""
      };
    });
    }
}
