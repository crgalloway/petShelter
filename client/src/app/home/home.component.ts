import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	petList:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.getPets()
	}
	getPets(){
		this._httpService.getPets().subscribe(data=>{
			if(!data['error']){
				this.petList = data['data']
			}
			else{
			}
		})
	}
	getDetails(id){
		this._router.navigate(['details/'+id])
	}
	goEdit(id){
		this._router.navigate(['edit/'+id])
	}
}
