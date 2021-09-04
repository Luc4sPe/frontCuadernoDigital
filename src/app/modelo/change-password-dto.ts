export class ChangePasswordDTO {

    password: string;
    condfirmPassword: string;
    tokenPassword: string;

    constructor(password: string, condfirmPassword: string, tokenPassword: string ){
        this.password=password;
        this.condfirmPassword=condfirmPassword;
        this.tokenPassword=tokenPassword;
    }
}
