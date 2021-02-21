import { Injectable } from "@angular/core"
import { IUser } from "./user.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: HttpClient) {}
    
    loginUser(userName: string, password: string) {
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
        .pipe(tap(data => {
            if(data instanceof Object) {
                this.currentUser = <IUser>data
            }
        }))
        .subscribe()
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }

    logout() {
        this.currentUser = undefined
        
        let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post('/api/logout', {}, options)
    }
}

// import { Injectable } from "@angular/core"
// import { IUser } from "./user.model"
// import { HttpHeaders, HttpClient } from '@angular/common/http'
// import { tap, catchError } from 'rxjs/operators'
// import { of } from 'rxjs'

// @Injectable()
// export class AuthService {
//     currentUser: IUser

//     constructor(private http: HttpClient) {}

//     loginUser(userName: string, password: string) {
//         let loginInfo = { usernamee: userName, password: password }
//         let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

//         return this.http.post('/api/login', loginInfo, options)
//             .pipe(tap(data => {
//                 this.currentUser = <IUser>data['user']
//             }))
//             .pipe(catchError(err => {
//                 return of(false)
//             }))

//         // this.currentUser = {
//         //     id: 1,
//         //     userName: userName,
//         //     firstName: 'John',
//         //     lastName: 'Papa'
//         // }
//     }

//     isAuthenticated() {
//         return !!this.currentUser;
//     }

//     updateCurrentUser(firstName: string, lastName: string) {
//         this.currentUser.firstName = firstName
//         this.currentUser.lastName = lastName
//     }
// }