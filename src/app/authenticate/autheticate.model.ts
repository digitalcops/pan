export class Login {
    email: string;
    password: string;
    remember_me: any;
}

export class SignUp {
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    confirmPassword: string;
    terms: false;
}

export class Password {
    password: string;
    confirmPassword: string;
}
