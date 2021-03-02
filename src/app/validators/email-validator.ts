export function EmailValidator(input: string): boolean {

    let isValidEmailTest: RegExp = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
    let isValidEmail: boolean = isValidEmailTest.test(input);

    return isValidEmail;
}
