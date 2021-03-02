export function PasswordValidator(input: string): boolean {

    let isValidPasswordTest: RegExp = new RegExp('^[a-zA-Z0-9]{8,30}$');
    let isValidPassword: boolean = isValidPasswordTest.test(input);

    return isValidPassword;
}
