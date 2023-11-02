import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ChildComponent } from '../child/child.component';
import { Employee } from '../constants/employee.interface';
import { Statistics } from './../constants/employee.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('childComponent')
  childComponent!: ChildComponent;
  salaryDataForParent: any;
  dataToPass: any;
  model: Employee = {
    id: 0,
    name: 'xyz',
    salary: 0
  };
  statisticData: Statistics = {
    lowData: 0,
    highData: 0
  }
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    
  }

  updateTable() {
    this.dataToPass = this.model;
    console.log(this.model);
    this.appService.sendMessage(this.model);
  }
  getChildData(e: any) {
    console.log(e);
    this.statisticData = e
  }

}
