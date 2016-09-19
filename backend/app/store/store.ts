interface Callback<T> {
	(error: any, result: T);
}

interface IStore<T, K> {
	findOne(query: any, callback: Callback<T>);
	find(query: any, callback: Callback<Array<T>>);
	findAll(callback: Callback<Array<T>>);

	findOne(query: any, callback: Callback<T>, pageSize: number, pageIndex: number);
	find(query: any, callback: Callback<Array<T>>, pageSize: number, pageIndex: number);
	findAll(callback: Callback<Array<T>>, pageSize: number, pageIndex: number);

	findOne(query: any, callback: Callback<T>, sort: any);
	find(query: any, callback: Callback<Array<T>>, sort: any);
	findAll(callback: Callback<Array<T>>, sort: any);

	findOne(query: any, callback: Callback<T>, pageSize: number, pageIndex: number, sort: any);
	find(query: any, callback: Callback<Array<T>>, pageSize: number, pageIndex: number, sort: any);
	findAll(callback: Callback<Array<T>>, pageSize: number, pageIndex: number, sort: any);

	findOne(id: K, callback: Callback<T>);
	create(item: T): K;
	update(item: T);
	remove(itemId: K);
	exists(query: any): boolean;
}