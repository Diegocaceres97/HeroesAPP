import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth!}
  }

  constructor(private http: HttpClient) { }

  verificaAuth(): Observable<boolean> {
    if(!localStorage.getItem('id')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`).pipe(
      map( auth => {
        this._auth=auth;
        return true;
      } )
    )
  }

  login(){
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`).pipe(tap(resp => this._auth = resp),
    tap(auth => localStorage.setItem('id', auth.id)))
  }

  logout(){
    this._auth = undefined;
  }
}
