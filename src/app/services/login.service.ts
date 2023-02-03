import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, mergeMap, of, tap, find, filter } from 'rxjs';
import {
  IUser,
  LoginSuccessful,
  SingleUserResponse,
} from 'src/app/interfaces/reqres.interfaces';
import { User } from 'src/app/models/user.model';
import { setAuthenticatedUser, unsetAuthenticatedUser } from 'src/app/components/login/store/auth.actions';
import { AppState } from 'src/app/models/app-state.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'https://reqres.in/api';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {}

  login(idlogin: number): Observable<any> {
    return this.httpClient
    .get<SingleUserResponse>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios/${idlogin}`)
    .pipe(
      tap(({data}) => {
        localStorage.setItem('token', data.Token)
        localStorage.setItem('bitadmin', data.Bitadmin)
        localStorage.setItem('iduser', String(data.ID))
      }
      ),
      map(
        ({ data }) =>
          new User(
            data.ID,
            data.Email,
            data.First_name,
            data.Last_name,
            data.Password,    
            data.Token,
            data.Bitadmin
          )
      ),
      tap(
        (user) => this.store.dispatch(
          setAuthenticatedUser({
            authenticatedUser: user
          })
        )
      ) 
    )
  }

  getusuarios(): Observable<any> {
    return this.httpClient
    .get<SingleUserResponse>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios`)
    .pipe(
     tap(({data}) => data )
    )
  
  
      
   /*  return this.httpClient
      .post<LoginSuccessful>(`${this.apiUrl}/login`, data)
      .pipe(
        tap((data) => localStorage.setItem('token', data.token)),
        mergeMap(() =>
          this.httpClient.get<SingleUserResponse>(`${this.apiUrl}/users/7`)
        ),
        map(
          ({ data }) =>
            new User(
              data.id,
              data.email,
              data.first_name,
              data.last_name,
              data.avatar,
            )
        ),
        // tap((user) => this.sessionService.setUser(user))
        tap(
          (user) => this.store.dispatch(
            setAuthenticatedUser({
              authenticatedUser: user
            })
          )
        )
      ); */
  }

  logOut() {
    localStorage.removeItem('token');
    this.store.dispatch(unsetAuthenticatedUser());
    this.router.navigate(['login']);
  }

  verifyToken(): Observable<boolean> {
    const lsToken = localStorage.getItem('token');

    return of(lsToken)
      .pipe(
        tap((token) => {
          if (!token) throw new Error('Token invalido')
        }),
        mergeMap((token) =>
          this.httpClient.get<SingleUserResponse>(`${this.apiUrl}/users/7`)
        ),
        tap(({ data }) =>
          this.store.dispatch(
            setAuthenticatedUser({
              authenticatedUser: new User(
                data.ID,
                data.Email,
                data.First_name,
                data.Last_name,
                data.Password,
                data.Token,
                data.Bitadmin
              )
            })
          )
        ),
        map((user) => !!user),
        catchError(() => of(false))
      )
  }
}


