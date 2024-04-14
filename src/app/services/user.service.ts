// user.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { SelectedUser } from '../../models/SelectUser'
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;
  urlAPI: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  private selectedUser: SelectedUser = {
    user: undefined,
    center: undefined,
    isSuperAdmin: false,
    isCenterAdmin: false,
    isClient: false,
  };
  private tokenUserValue: any;
  private localStorageKey = 'userInfo';
  private localStorageKeyToken = 'token';
  private userChangeSubject = new Subject<any>();
  private authenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);
  
  setToken(token: string){
    localStorage.setItem(this.localStorageKeyToken, JSON.stringify(token == ""?null: token));
    this.tokenUserValue = this.getToken();
    this.userChangeSubject.next(this.selectedUser);
  }

  get isAuthenticated() {
    if (this.getToken() != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }

  get getUser() {
    if (this.tokenUserValue != null) {
      this.currentUser.next(this.getInfo());
    } else {
      this.currentUser.next(null);
    }
    return this.currentUser.asObservable();
  }

  setUser(user: any, center: any) {
    this.selectedUser.user = user;
    this.selectedUser.center = center;
    this.selectedUser.isSuperAdmin = user?.role === 1;
    this.selectedUser.isCenterAdmin = user?.role === 2;
    this.selectedUser.isClient = user?.role === 3;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.selectedUser));
    this.userChangeSubject.next(this.selectedUser);
  }

  getInfo(): any {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if(this.isTokenValid(this.getToken())){
      return storedUser ? JSON.parse(storedUser) : null;
    } else {
      this.userChangeSubject.next(null);
      return null;
    }
    
  }

  private getToken(): any {
    const storedUser = localStorage.getItem(this.localStorageKeyToken);
    this.tokenUserValue = storedUser;
    return storedUser ? JSON.parse(storedUser) : null;
  }

  userChanges(): Observable<any> {
    if(this.isTokenValid(this.getToken())){
      return this.userChangeSubject.asObservable();
    } else {
      return EMPTY;
    }
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
  
  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.urlAPI+`user/validateEmail/${email}`);
  }
}
