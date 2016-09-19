export interface IEntity {
	_id: any
}

export interface IStore<T extends IEntity, K> {
	findOne(query: Object, sort: Object): Promise<T>;
	find(query: Object, sort: Object, skip: number, limit: number): Promise<T>;
	findAll(sort: Object, skip: number, limit: number): Promise<T>;

	findById(id: K): Promise<T>;
	exists(query: Object): Promise<boolean>;

	create(item: T): Promise<K>;
	update(item: T): Promise<any>;
	remove(itemId: K): Promise<any>;
}