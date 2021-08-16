import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginPayload, LoginResponseModel } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

/**
 * Function used to post the login details and get the authorized token
 * @param payload : Login Payload
 * @returns Login response
 */
   postLoginDetails(payload: LoginPayload): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${environment.baseUrl}/login`, payload)
  }
}
