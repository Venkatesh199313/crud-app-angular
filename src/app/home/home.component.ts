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
  //model data
  model: Employee = {
    id: 0,
    name: '',
    salary: 0
  };
  //statistics Data
  statisticData: Statistics = {
    lowData: 0,
    highData: 0
  }

  // Dependency Injection
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {}

  // Updating the Table
  updateTable() {
    console.log('this.model', this.model);
    this.dataToPass = this.model;
    this.appService.sendMessage(this.model);
  }


  getChildData(e: any) {
    console.log(e);
    this.statisticData = e;
  }

}
