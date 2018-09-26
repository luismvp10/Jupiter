import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { AlgoritmoService } from '../services/algoritmo.service';
import { Algoritmo } from '../class/algoritmo';
import { Computador } from '../class/computador';
import { interval } from 'rxjs'; // Angular 6 

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private algoritmoService: AlgoritmoService) { }

  cluster: Computador[];
  aux = {
    nombre: '',
    ip: ''
  };

  ngOnInit() {
    this.algoritmoService.getPCS().subscribe((data: Computador[]) => {
      console.log(data);
      this.cluster = data;
      this.testearRed();
      interval(1000).subscribe(x => {
        this.testearRed();
      });

    });
  }

  agregar():void{
    this.ngOnInit();
    this.algoritmoService.postCluster(this.aux).subscribe((response)=>{
      this.closeBtn.nativeElement.click();
      this.aux =  {
        nombre: '',
        ip: ''
      };
    });
  }

  testearRed():void{
    for (let i = 0; i < this.cluster.length; i++) {
      const pc = this.cluster[i];
      var x;
      if(pc.ip === "192.168.1.68")
        x = "/loop";
      else x = "http://" + pc.ip +":3001"
      console.log(x)
      this.algoritmoService.testear(x).subscribe( (result) => {
        this.cluster[i].color = "gold";
        this.cluster[i].respuesta = "Estado del Nodo: Activo\n";
        this.cluster[i].sistema = " " + result.sistema.os + " " + result.sistema.arquitectura + "\n";
        this.cluster[i].cpu = " "+ result.cpu.modelo  + " x" + result.cpu.nucleos + "\n";
        this.cluster[i].memoria = " Total: " + result.memoria.total + " , libre: " + result.memoria.libre + "\n";
        result.cpu.usada += "%";
        var usada = result.memoria.total - result.memoria.libre;
        result.memoria.usada = Math.round((usada/result.memoria.total)*100)  + "%";
        this.cluster[i].res = result;
        console.log(result)
      }, 
      (error) => {
        this.cluster[i].color = "#ff001880";
        this.cluster[i].respuesta = "No hay una respuesta.";
        console.log(error)
      }
    );
    }
  }
}
