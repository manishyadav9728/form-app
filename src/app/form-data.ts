export class FormData {
    first_name : string;
    last_name : string;
    email : string;
    password : string;
    country : number;
    phone : string;
    constructor(first_name: string, last_name: string, email: string, password: string, country: number, phone: string){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.country = country;
        this.phone = phone;
    }
}
