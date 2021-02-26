import { Roles } from "./roles.model";

export class User {

    constructor(public userId: number, public email: string, public firstName: string, public lastName: string, public password: string, public username: string, public role: Roles) { 
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this.role = role;
    }
}
