import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private _http: HttpClient) { }
	getPets(){
		return this._http.get('/pets');
	}
	addPet(newPet){
		return this._http.post('/pets', newPet)
	}
	deletePet(id){
		return this._http.delete('/pets/'+id)
	}
	getPet(id){
		return this._http.get('/pets/'+id)
	}
	updatePet(pet){
		return this._http.put('/pets/'+pet._id, pet)
	}
	likePet(id){
		return this._http.put('/pets/like/'+id, {like: 1})
	}
}