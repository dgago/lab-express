/// <reference path="../typings/index.d.ts" />

import store = require('./store');
import mstore = require('./mongodb-store');
import mongodb = require('mongodb');
import {Config} from './config';

let client: mongodb.MongoClient = require('mongodb').MongoClient;
let url: string = Config.connectionStrings[0].connectionString;


// basic example
let fnWork = (db: mongodb.Db) => {
	let coll: mongodb.Collection = db.collection('foo');

	return coll.find({}).toArray()
		.then((docs: any) => {
			console.dir(docs);

			console.log('Cerrando conexión con mongodb.');
			db.close();
		});
};

let fnError = (error: any) => {
	console.log(error);
};

let fnClose = () => {
	console.log('Acá deberíamos cerrar la conexión.');
};

console.log('Abriendo conexión con mongodb.');
client.connect(url)
	.then(fnWork)
	.then(fnClose)
	.catch(fnError);


// example with store
class Car implements store.IEntity {
	public _id: string;
	public name: string;
}

class CarStore extends mstore.MongoDbStore<Car, string>{

}

let fnWorkStore = (db: mongodb.Db) => {
	let coll: mongodb.Collection = db.collection('car');
	let st: CarStore = new CarStore(coll);

	let car: Car = new Car();
	car._id = new Date().getMilliseconds().toString();
	car.name = 'Citroen C3';

	return st.create(car).then((id: string) => {
		console.log('Se ha creado el auto con id: ' + id);

		console.log('Cerrando conexión con mongodb.');
		db.close();
	});
};

console.log('Abriendo conexión con mongodb.');
client.connect(url)
	.then(fnWorkStore)
	.then(fnClose)
	.catch(fnError);