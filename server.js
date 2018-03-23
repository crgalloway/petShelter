//Definitions ==>
const express = require('express')
const app = express()

const port = 8000;

const path = require('path')

const bp = require('body-parser')
app.use(bp.json())

app.use(express.static(__dirname+'/client/dist'))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pets')
//<== end definitions

//Schemas ==>
var PetSchema = new mongoose.Schema({
	name: {type:String, minlength:3},
	type: {type:String, minlength:3},
	desc: {type:String, minlength:3},
	skill1: {type:String},
	skill2: {type:String},
	skill3: {type:String},
	likes: {type:Number, default: 0}
}, {timestamps:true})
mongoose.model('Pet', PetSchema)
var Pet = mongoose.model('Pet')
//<== end schemas

//Routes ==>
app.get('/pets', function(req,res){
	Pet.find({},null, {sort:'type'}, function(err, pets){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: pets})
		}
	})
})
app.get('/pets/:id', function(req,res){
	Pet.findOne({_id: req.params.id}, function(err, pet){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: pet})
		}
	})
})
app.post('/pets', function(req,res){
	var pet = new Pet({name:req.body.name, type:req.body.type, desc:req.body.desc, skill1:req.body.skill1, skill2:req.body.skill2, skill3:req.body.skill3})
	pet.save(function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.put('/pets/:id', function(req,res){
	var pet = Pet.update({_id: req.params.id}, {name:req.body.name, type:req.body.type, desc:req.body.desc, skill1:req.body.skill1, skill2:req.body.skill2, skill3:req.body.skill3}, { runValidators: true }, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.delete('/pets/:id', function(req,res){
	Pet.remove({_id: req.params.id}, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.put('/pets/like/:id', function(req,res){
	Pet.findOne({_id: req.params.id}, function(err, pet){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			pet.likes+=req.body.like
			pet.save(function(err){
				if(err){
					res.json({message: "Error", error: err})
				}
				else{
					res.json({message: "Success"})
				}
			})
		}
	})
})

app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./client/dist/index.html"))
})
//<== end routes

//Listening ==>
app.listen(port, function(){
	console.log('Listening on port:',port)
})