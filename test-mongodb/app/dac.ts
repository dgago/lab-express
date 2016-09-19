import store = require('./store');
import mstore = require('./mongodb-store');

export class Car implements store.IEntity {
	public _id: string;
	public name: string;
}

export class CarStore extends mstore.MongoDbStore<Car, string> {
}

export class CarsDbContext extends mstore.MongoDbContext {
	constructor(connectionString: string) {
		super(connectionString);
	}

	createStores() {
		this.carStore = new CarStore(this.database.collection('car'));
	}

	carStore: CarStore;
}
