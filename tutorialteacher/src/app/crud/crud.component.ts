import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
// import { AnyAaaaRecord } from 'dns';
// import { response } from 'express';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-crud',
	// templateUrl: './crud.component1.html',
	templateUrl: './crud.component.html',
	styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
	constructor(private service:PostService) { }
	contact: any="";
	name : any ="";
	email : any="";
	userCount :any;
	success_msg :any;
	status : any;
	posts :any;
	user_id : any="";
	btntext : any = "Submit";
	/* Form Validation */
	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		contact: new FormControl('', Validators.required),
		user_id: new FormControl()
	});
	get f(){
		return this.form.controls;
	}
	/* Form Validation */
	/** For pagination */
	users:any;
	p: number = 1;
	total: number = 0;
	page: any;
	profile_pic : any;
	ngOnInit(): void {
		this.getUsers();
	}
	pagination(event: number):void
	{
		this.p = event;
		this.getUsers();
	}
	getUsers(){
		this.service.getUserList()
		.subscribe(response => {
			console.log(this.service.pagedData);
			this.posts  = this.service.pagedData.profile; /** This will get from post.service.ts pageData varibale  */
			this.total = this.service.pagedData.total;
			this.userCount = Object.keys(this.posts).length;
		});
		// this.service.getUserList().subscribe(result => {
		// 	console.log("hi");
		// 	console.log(result);
		//   })
	}
	// Object { _id: "62c6b0e6e42815351b927566", email: "deepak3@yopmail.com", name: "deepak3", contact: "1234567890", __v: 0 }
	edituser(editid){
		this.btntext = "Update";
		return this.service.edituser(editid).subscribe(response=>{
			console.log(response);
			console.log(response['name']);
			// this.name = response.name;
			// this.email = response.email;
			// this.contact = response.contact;
			// this.user_id = response._id;
		});
	}
	onSubmit():void{
		var employee : any = this.form.value;
		console.log(employee.profile_pic);
		this.service.addUser(employee).subscribe(response => {
			this.form.reset();
			this.getUsers();
		});
		
	}
	deleteuser(userid:any):void{
		console.log(userid);
		this.service.deleteuser(userid);
		window. location. reload();
	}
	ngOnDestroy() {}
}