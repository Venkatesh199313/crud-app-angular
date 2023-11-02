import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appSubject = new BehaviorSubject<any>({});
  appObserver = this.appSubject.asObservable();

  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    this.appSubject.next(message);
  }

  apiPromisified() {
    return this.http.get(`${environment.apiUrl}/employees`).toPromise();
  }

  postApiAsObservable(params:any) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/employees`, params);
  }
}

// this.appService.apiAsObservable().subscribe(data => {
    //   console.log(data);
    //   this.salaryDataForParent = data;
    // });