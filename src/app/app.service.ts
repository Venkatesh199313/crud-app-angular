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

  // GET METHOD (Promise)
  apiPromisified() {
    return this.http.get(`${environment.apiUrl}/employees`).toPromise();
  }

  //POST METHOD (Observable)
  postApiAsObservable(params:any) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/employees`, params);
  }

  // PUT METHOD
  putApiAsObservable(data : any) {
    return this.http.put(`${environment.apiUrl}/employees/${data.id}`, data);
  }

  // DELETE METHOD
  deleteApiAsObservable(data : any) {
    return this.http.delete(`${environment.apiUrl}/employees/${data.id}`);
  }


}