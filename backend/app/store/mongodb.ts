import store = require('./store');
import mongodb = require('mongodb');

export abstract class MongoDbStore<T extends store.IEntity, K> implements store.IStore<T, K> {
	protected Collection: mongodb.Collection;

	constructor(collection: mongodb.Collection) {
		this.Collection = collection;
	}

	/**
	 * Busca el primer elemento que coincida con el criterio de búsqueda
	 * y el criterio de ordenamiento especificado.
	 */
	findOne(query: Object, sort: Object): Promise<T> {
		let fn = (resolve, reject) => {
			let cursor: mongodb.Cursor = this.Collection.find(query);

			if (sort) {
				cursor.sort(sort);
			}

			cursor.next(function (error: mongodb.MongoError, result: T) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		};

		return new Promise<T>(fn);
	}

	/**
	 * Busca los items según un criterio de búsqueda.
	 */
	find(query: Object, sort: Object, skip: number, limit: number): Promise<T> {
		let fn = (resolve, reject) => {
			let cursor: mongodb.Cursor = this.Collection.find(query);

			if (sort) {
				cursor.sort(sort);
			}

			if (skip) {
				cursor.skip(skip);
			}

			if (limit) {
				cursor.limit(limit);
			}

			cursor.toArray(function (error: mongodb.MongoError, result: Array<T>) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		};

		return new Promise<T>(fn);
	}

	/**
	 * Busca todos los items.
	 */
	findAll(sort: Object, skip: number, limit: number): Promise<T> {
		let fn = (resolve, reject) => {
			let cursor: mongodb.Cursor = this.Collection.find();

			if (sort) {
				cursor.sort(sort);
			}

			if (skip) {
				cursor.skip(skip);
			}

			if (limit) {
				cursor.limit(limit);
			}

			cursor.toArray((error: mongodb.MongoError, result: Array<T>) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		};

		return new Promise<T>(fn);
	}

	/**
	 * Busca un item por id.
	 */
	findById(id: K): Promise<T> {
		return this.Collection.findOne({ _id: id });
	}

	/**
	 * Determina si existen items según la condición de búsqueda
	 * especificada.
	 */
	exists(query: Object): Promise<boolean> {
		return this.Collection.find(query).hasNext();
	}

	/**
	 * Crea un item.
	 */
	create(item: T): Promise<K> {
		let fn = (resolve, reject) => {
			this.Collection.insert(item).then((res: mongodb.InsertOneWriteOpResult) => {
				resolve(item._id);
			}).catch((error: any) => {
				reject(error)
			});
		};

		return new Promise<K>(fn);
	}

	/**
	 * Reemplaza un item.
	 */
	update(item: T): Promise<any> {
		return this.Collection.replaceOne({ _id: item._id }, item);
	}

	/**
	 * Remueve un item por id.
	 */
	remove(itemId: K): Promise<any> {
		return this.Collection.remove({ _id: itemId });
	}
}