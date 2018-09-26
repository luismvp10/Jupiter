import { Component, OnInit, Input } from '@angular/core';
import { Algoritmo } from '../class/algoritmo';
import { Ejecucion } from '../class/ejecucion';

@Component({
  selector: 'app-algoritmo',
  templateUrl: './algoritmo.component.html',
  styleUrls: ['./algoritmo.component.css']
})
export class AlgoritmoComponent implements OnInit {
  @Input() algoritmo: Algoritmo;
  constructor() { }

  ngOnInit() {
  }

}
