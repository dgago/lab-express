interface Callback<T> {
	(error: any, result: T): void;
}

interface IStore<T, K> {
	findOne(id: K, callback: Callback<T>);
	find(query: any, callback: Callback<Array<T>>);
}

abstract class Store<T, K> implements IStore<T, K> {
	abstract findOne(id: K, callback: Callback<T>);
	abstract find(query: any, callback: Callback<Array<T>>);
}
