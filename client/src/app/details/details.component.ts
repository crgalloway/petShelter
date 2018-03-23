import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	petInfo:any
	notYetLiked:boolean
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.petInfo = {
			name:"",
			type:"",
			desc:"",
			skill1:"",
			skill2:"",
			skill3:"",
			likes:0
		}
		this.notYetLiked = true
		this._route.params.subscribe((params: Params) => {
			this.getPetInfo(params['id'])
		})
	}
	getPetInfo(id){
		this._httpService.getPet(id).subscribe(data =>{
			this.petInfo = data['data']
		})
	}
	goHome(){
		this._router.navigate([''])
	}
	adoptPet(id){
		this._httpService.deletePet(id).subscribe(data=>{
			this.goHome()
		})
	}
	likePet(id){
		this._httpService.likePet(id).subscribe(data=>{
			this.getPetInfo(id)
			this.notYetLiked=false
		})
	}
}
