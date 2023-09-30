import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Replace with your Java backend URL

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    const credentials = { userName, password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getUser(userName:String): Observable<any>{
    const url = `${this.apiUrl}/user/${userName}`;
    return this.http.get(url);
  }

  register(userName:String,password:String,emailId:String,mobileNumber:String): Observable<any>{
    const user ={userName,password,emailId,mobileNumber};
    const url = `${this.apiUrl}/user`;
    return this.http.post(url,user,{ responseType:'text'});
  }

  getClients(user:String):Observable<any>{
    const url = `${this.apiUrl}/clients/${user}`
    return this.http.get(url);
  }

  addClient(clName:String,clAmount:String,clMobile:String,user:String):Observable<any>{
    const client ={clName,clAmount,clMobile,user};
    const url = `${this.apiUrl}/client`
    return this.http.post(url,client,{ responseType:'text'})
  }

  deleteClient(clName: string, user: string): Observable<any> {
    const url = `${this.apiUrl}/deleteClient?clName=${clName}&user=${user}`;
    return this.http.delete(url);
  }
  
}