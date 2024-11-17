import { Users } from "../interfaces/users";

export class User {
    username:string;
    email:string;
    number: string



    constructor(obj?:Users){
        this.username = obj ? obj.username : '';
        this.email = obj ? obj.email : '';
        this.number = obj? obj.number : ''

    }

    public toJSON(){
        return{
            username : this.username,
            email : this.email,
            number: this.number
        }
    }

}