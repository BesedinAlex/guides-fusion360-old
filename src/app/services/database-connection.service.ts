import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {

  private baseUrl = 'http://localhost:4000/';
  private options: HttpHeaders;

  constructor(public http: HttpClient) {
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }

  private getUrl(url = ''): string {
    return this.baseUrl + url;
  }

  private get(url = '', header: HttpHeaders): Observable<any> {
    const requestOptions = {
      headers: header
    };
    return this.http.get(this.getUrl(url), requestOptions);
  }

  private post(url = '', data: any, header: HttpHeaders): Observable<any> {
    const requestOptions = {
      headers: header
    };
    return this.http.post(this.getUrl(url), data, requestOptions);
  }

  private put(url = '', data: any, header: HttpHeaders): Observable<any> {
    const requestOptions = {
      headers: header
    };
    return this.http.put(this.getUrl(url), data, requestOptions);
  }

  private delete(url = '', header: HttpHeaders): Observable<any> {
    const requestOptions = {
      headers: header
    };
    return this.http.delete(this.getUrl(url), requestOptions);
  }

  protected async getData(url: string): Promise<any> {
    return this.get(url, this.options).toPromise();
  }

  protected async postData(url: string, data: any): Promise<any> {
    return this.post(url, data, this.options).toPromise();
  }

  protected async putData(url: string, id: number, data: any): Promise<any> {
    return this.put(url + '/' + id, data, this.options).toPromise();
  }

  protected async deleteData(url: string, id: number): Promise<any> {
    return this.delete(url + '/' + id, this.options).toPromise();
  }
}
