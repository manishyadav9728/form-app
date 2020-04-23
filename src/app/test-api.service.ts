import { Injectable } from '@angular/core';
import {FormData} from './form-data';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Country} from './country';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TestApiService {
  url : string = "http://localhost:3000/api/v1/users/signUp";

  private errorHandler<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.warn(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
  constructor(private http : HttpClient) { }

  setData(data: FormData) : Observable<FormData>{
    const body = JSON.stringify(data);
    // console.log(body);
    return this.http.post<FormData>(this.url,body,httpOptions).pipe(
      tap(_ => console.warn("ho gya")),
      catchError(this.errorHandler<FormData>('setData'))
    )
  }
  test(): Observable<any>{
    console.log("hello");
    return this.http.post<any>('http://localhost:3000/api/v1/users/signUp',[],httpOptions).pipe(
      tap(_ => console.log()),
      catchError(this.errorHandler<any>('test'))
      )
  }
  getCountry(): Observable<Country[]>{
    return this.http.get<Country[]>('http://localhost:3000/api/v1/country').pipe(
      tap(_ => console.log("Got Countries")),
      catchError(this.errorHandler<Country[]>('getCountry',[]))
    )
  }
}
