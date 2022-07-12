import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';
import { Profile } from './profile.model';
import { query } from 'express';
import { timeStamp } from 'console';
import {environment} from '../../environments/environment'
@Injectable({
	providedIn: 'root'
})
export class PostService {
	constructor(private http: HttpClient, private router: Router) {}
	apibaseurl = "https://mean-deploy04.herokuapp.com/api";
	// headers = new HttpClient().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');	// const headers = new HttpClient
	pagedData : any;
	status : any;
	edituser(id:any)
	{
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id",id);
		return this.http.post(this.apibaseurl + `/posts/edituser`,queryParams);
	}
	getUserList(){
		return this.http.get(`${this.apibaseurl}/posts/pagination`).pipe(
			map((response: any) => {
				this.pagedData = response;
				
			})
		);
	}
	addUser(user:any)
	{
		// let queryParams = new HttpParams();
		let queryParams = new HttpParams();
		queryParams = queryParams.append("name",user.name).append("email",user.email).append("contact",user.contact).append('id',user.user_id);
		// return this.http.get(`${this.apibaseurl}/posts/adduser`);
		return this.http.post(this.apibaseurl + `/posts/adduser`,queryParams);

		// this.http.post<{ message: string; post: Profile }>(this.apibaseurl + `/posts/adduser`,queryParams);
		// return false;
	}
	deleteuser(id){
		console.log(id);
		let queryParams = new HttpParams();
		queryParams = queryParams.append("id",id);
		return this.http.delete(this.apibaseurl + `/posts/deleteuser/`,queryParams)
		.subscribe({
			next: data => {
				this.status = 'Delete successful';
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}
	getAllUser(): Observable<any> {
		return this.http.get<any>(this.apibaseurl);
	}
	pagination(page: number):Observable<any> {
		return this.http.get<any>(`${this.apibaseurl}pagination/${page}`)
		.pipe(
			map((response: any) => {
				this.pagedData = response;
			})
		);
	}
}