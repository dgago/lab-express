/**
 * Interface para forzar la existencia del identificador
 * de una entidad, para su uso en IStore.
 */
export interface IEntity {
	_id: any
}

/**
 * Interface para gestión del almacenamiento de los datos
 * de una entidad.
 */
export interface IStore<T extends IEntity, K> {
	/**
	 * Busca el primer elemento que coincida con el criterio de búsqueda
	 * y el criterio de ordenamiento especificado.
	 */
	findOne(query: Object, sort: Object): Promise<T>;

	/**
	 * Busca los items según un criterio de búsqueda.
	 */
	find(query: Object, sort: Object, skip: number, limit: number): Promise<T[]>;

	/**
	 * Busca todos los items.
	 */
	findAll(sort: Object, skip: number, limit: number): Promise<T[]>;

	/**
	 * Busca un item por id.
	 */
	findById(id: K): Promise<T>;

	/**
	 * Determina si existen items según la condición de búsqueda
	 * especificada.
	 */
	exists(query: Object): Promise<boolean>;

	/**
	 * Crea un item.
	 */
	create(item: T): Promise<K>;

	/**
	 * Reemplaza un item.
	 */
	update(item: T): Promise<any>;

	/**
	 * Remueve un item por id.
	 */
	remove(itemId: K): Promise<any>;
}


export abstract class DbContext {
	constructor(protected connectionString: string) {
	}

	abstract connect(): Promise<any>;

	abstract close(): Promise<any>;
}