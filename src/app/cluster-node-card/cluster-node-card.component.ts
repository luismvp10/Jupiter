import { Component, OnInit, Input } from '@angular/core';
import { Computador } from '../class/computador';

@Component({
  selector: 'app-cluster-node-card',
  templateUrl: './cluster-node-card.component.html',
  styleUrls: ['./cluster-node-card.component.css']
})

export class ClusterNodeCardComponent implements OnInit {
  @Input() computador: Computador;

  constructor() { }

  ngOnInit() {
  }

}
