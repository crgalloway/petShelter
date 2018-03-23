import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newPet:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.newPet = {
			name:"",
			type:"",
			desc:"",
			skill1:"",
			skill2:"",
			skill3:""
		}
	}
	goHome(){
		this._router.navigate([''])
	}
	onSubmit(){
		this._httpService.addPet(this.newPet).subscribe(data=>{
			if(!data['error']){
				this.goHome()
			}
		})
	}
}
