import { Component, Input } from '@angular/core';

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent {

  @Input() user;

  constructor() { }

}
