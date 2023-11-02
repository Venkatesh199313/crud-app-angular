import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environment/environment';
import { AppService } from '../app.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../custom-dialog/dialog/dialog.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChildComponent {
  salaryDataForChild: any = [];
  dataToUpdate:any = {};
  incomingEmployeeData: any;
  @Output() myOutput:EventEmitter<object>= new EventEmitter();
  filteredLenghtForLow: any;
  filteredLenghtForHigh: any;

  constructor(public http: HttpClient, public appService: AppService, private modalService: NgbModal) {}

  ngOnInit() {
    this.populateTableData();
    this.appService.appObserver.subscribe(data => {
      if (data && data.id > 0) {
        console.log(data);
        this.http.post(`${environment.apiUrl}/employees`, data).subscribe(i => {
          console.log(i);
          if(i) {
            this.populateTableData();
          }

        })
      }
    })
    
  }

  conditionForHigh = (element: any) => element.salary >= 10000;
  conditionForLow = (element: any) => element.salary < 10000;


  populateTableData() {
    this.appService.apiPromisified().then((api) => {
      console.log(api);
      this.salaryDataForChild = api;
      console.log('calculate total number', this.salaryDataForChild);
      
      this.filteredLenghtForLow = this.salaryDataForChild.filter(this.conditionForLow);
      this.filteredLenghtForHigh = this.salaryDataForChild.filter(this.conditionForHigh);
      this.myOutput.emit({ lowData: this.filteredLenghtForLow.length, highData: this.filteredLenghtForHigh.length});  
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('change', changes);
  // }

  editItem(data: any) {
    this.http.put(`${environment.apiUrl}/employees/${data.id}`, data).subscribe(data => {
      console.log(data);
      // alert("<input></input>");
      this.populateTableData();
    });
  }

  openDialog(data: any) {
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.data = data;
    console.log(modalRef);
  }

  receiveDataFromParent(data: string) {
    this.dataToUpdate = data;
  }

  deleteItem(data: any) {
    this.http.delete(`${environment.apiUrl}/employees/${data.id}`).subscribe(data => {
      console.log(data);
      this.populateTableData();
    });
  }

}
