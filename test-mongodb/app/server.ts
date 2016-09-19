/// <reference path="../typings/index.d.ts" />

import dac = require('./dac');
import { Config } from './config';

let url: string = Config.connectionStrings[0].connectionString;
let context: dac.CarsDbContext = new dac.CarsDbContext(url);

let fnCreate = () => {
	let car: dac.Car = new dac.Car();
	car._id = new Date().getMilliseconds().toString();
	car.name = 'Citroen C3';

	return context.carStore.create(car)
		.then((id: string) => {
			console.log('Se ha creado el auto con id: ' + id);
		});
};

let fnSearch = () => {
	return context.carStore.findAll()
		.then((items: dac.Car[]) => {
			console.log('Se encontraron ' + items.length + ' autos: ');
			console.dir(items);
		});
}

let fnClose = () => {
	console.log('Cerrando conexión con mongodb.');
	context.close();
};

let fnError = (error: any) => {
	console.log(error);
};

context.connect()
	.then(fnCreate)
	.then(fnSearch)
	.then(fnClose)
	.catch(fnError);
