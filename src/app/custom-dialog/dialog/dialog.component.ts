import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { Employee } from 'src/app/constants/employee.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  model: Employee = {
    id: 0,
    name: 'xyz',
    salary: 0
  };
  @Input() data: any;

  constructor(private appService: AppService, private http: HttpClient, public activeModal: NgbActiveModal){
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  closeModal() {
    this.activeModal.close('Close button clicked');
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('data',this.data);
    this.model = this.data;
  }

  editItem(data: any) {
    console.log('new data',data);
    this.http.put(`${environment.apiUrl}/employees/${data.id}`, data).subscribe(data => {
      
    });
  }
}
