import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	pet:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.pet = {
			name:"",
			type:"",
			desc:"",
			skill1:"",
			skill2:"",
			skill3:"",
		}
		this._route.params.subscribe((params: Params) => {
			this.getPetInfo(params['id'])
		})
	}
	getPetInfo(id){
		this._httpService.getPet(id).subscribe(data =>{
			this.pet = data['data']
		})
	}
	goHome(){
		this._router.navigate([''])
	}
	onSubmit(){
		this._httpService.updatePet(this.pet).subscribe(data=>{
			if(!data['error']){
				this.getDetails(this.pet._id)
			}
		})
	}
	getDetails(id){
		this._router.navigate(['details/'+id])
	}
}
