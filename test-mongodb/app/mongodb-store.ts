import store = require('./store');
import mongodb = require('mongodb');

/**
 * Implementación de IStore para MongoDb.
 */
export abstract class MongoDbStore<T extends store.IEntity, K> implements store.IStore<T, K> {
	protected Collection: mongodb.Collection;

	/**
	 * Constructor de la clase.
	 */
	constructor(collection: mongodb.Collection) {
		this.Collection = collection;
	}

	/**
	 * Busca el primer elemento que coincida con el criterio de búsqueda
	 * y el criterio de ordenamiento especificado.
	 */
	findOne(query: Object, sort: Object): Promise<T> {
		let cursor: mongodb.Cursor = this.Collection.find(query);

		if (sort) {
			cursor.sort(sort);
		}

		return cursor.next();
	}

	/**
	 * Busca los items según un criterio de búsqueda.
	 */
	find(query: Object, sort: Object, skip: number, limit: number): Promise<T[]> {
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

		return cursor.toArray();
	}

	/**
	 * Busca todos los items.
	 */
	findAll(sort: Object = undefined, skip: number = undefined, limit: number = undefined): Promise<T[]> {
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

		return cursor.toArray();
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

		// es necesario crear una nueva promesa para cumplir con
		// la restricción de poder devolver la clave al crear
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

/**
 * Contexto de conexión con la base de datos, que permite obtener 
 * acceso a los stores sin conocer los detalles de conexión.
 */
export abstract class MongoDbContext extends store.DbContext {
	protected database: mongodb.Db;

	constructor(connectionString: string) {
		super(connectionString);
	}

	connect(): Promise<any> {
		let client: mongodb.MongoClient = require('mongodb').MongoClient;

		let fnConnected = (db: mongodb.Db) => {
			this.database = db;

			this.createStores();
		};

		return client.connect(this.connectionString)
			.then(fnConnected);
	}

	close(): Promise<any> {
		if (this.database) {
			return this.database.close();
		}
	}

	protected abstract createStores();
}