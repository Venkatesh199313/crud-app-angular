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

  // for total number of Employee count
  conditionForHigh = (element: any) => element.salary >= 10000;
  conditionForLow = (element: any) => element.salary < 10000;


  populateTableData() {
    // using the Injected service
    this.appService.apiPromisified().then((api) => {
      console.log(api);
      this.salaryDataForChild = api;
      
      // updating the data count
      this.filteredLenghtForLow = this.salaryDataForChild.filter(this.conditionForLow);
      this.filteredLenghtForHigh = this.salaryDataForChild.filter(this.conditionForHigh);
      this.myOutput.emit({ lowData: this.filteredLenghtForLow.length, highData: this.filteredLenghtForHigh.length});  
    });
  }

  //PUT operation
  editItem(data: any) {
    this.appService.putApiAsObservable(data).subscribe(data => {
      console.log(data);
      this.populateTableData();
    });
  }

  //for PUT operation
  openDialog(data: any) {
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.data = data;
    console.log(modalRef);
  }

  receiveDataFromParent(data: string) {
    this.dataToUpdate = data;
  }

  // DELETE operation 
  deleteItem(data: any) {
    this.appService.deleteApiAsObservable(data).subscribe(data => {
      console.log(data);
      this.populateTableData();
    });
  }

}
