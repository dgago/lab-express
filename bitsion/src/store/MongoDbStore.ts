/// <reference path="../../typings/index.d.ts" />

import MongoDb = require('mongodb');

class MongoDbContext {
	private _url: string;
	private _db: any;

	constructor(url: string) {
		this._url = url;

		let client = MongoDb.MongoClient;
		client.connect(url, function (err, db) {
			this._db = db;
		});
	}

	close() {
		this._db.close();
	}
}

class MongoDbStore<T, K> extends Store<T, K> {
	private _coll: any;

	constructor(coll: any) {
		super();
		this._coll = coll;
	}

	findOne(id: K, callback: Callback<T>) {
		this._coll.findOne({ _id: id },	callback);
	}

	find(query: any, callback: Callback<Array<T>>){
		this._coll.find(query).toArray(callback);
	}
}
