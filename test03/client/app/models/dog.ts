import { Animal } from './animal';

export class Dog extends Animal {
	public type: string;

	constructor(name: string, type: string){
		super(name);
		this.type = type;
	}
}
