import { Component, OnInit } from '@angular/core';
import { Desk } from '../model/desk';
import { DeskAssignment } from '../model/desk-assignment';

@Component({
  selector: 'desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {
  
  desk;
  deskAssignment;
  emptyDeskUrl = '../assets/question-mark.png';
  assignedDeskUrl = '../assets/user-silhouette.png';
  
  constructor() { }

  ngOnInit() {
    
  }

}
