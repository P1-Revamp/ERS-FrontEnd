export function UsernameValidator(input: string): boolean {

    let isValidUsernameTest: RegExp = new RegExp('^[a-zA-Z0-9](.*[a-zA-Z0-9])?$');
    let isValidUsername: boolean = isValidUsernameTest.test(input);

    return isValidUsername;
}
