export class User{
	public id:number;
	public username:string;
	public email:string;
	public password:string;
}

export class UserManager {
	private users:Array<User> = [
		{id: 1, username: "John", email: "john@mail.com", password: "john123"},
		{id: 2, username: "Sarah", email: "sarah@mail.com", password: "sarah123"}
	];

	public findOne(username:string):User {
		for (var i = 0; i < this.users.length; i++) {
			var element = this.users[i];
			if(element.username == username){
				return element;
			}
		}
		return null;
	}
}