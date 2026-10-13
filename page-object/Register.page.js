export class RegisterPage{
    constructor(page){
        this.page = page;
        this.registerBtn = page.locator('[id="login-register-button"]');
         this.first_nameField = page.locator('[id="register-first-name"]');
        this.last_nameField = page.locator('[id="register-last-name"]');
        this.emailField = page.locator('[id="register-email"]');
        this.passwordField = page.locator('[id="register-password"]');
        this.cityField = page.locator('[id="register-city"]');
        this.countryDropDown = page.locator('[id="register-country"]');
        this.phoneNumberField = page.locator('[id="register-phone"]');
        this.addressField = page.locator('[id="register-street"]');
        this.zipCodeField = page.locator('[id="register-zip"]');
        this.registerSubmitBtn = page.locator('[id="register-button"]');
    }

    async navigate() {
         await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async fillRegistrationForm(testData) {
        await this.registerBtn.click();
        await this.first_nameField.fill(testData.firstname);
        await this.last_nameField.fill(testData.lastname);
        await this.emailField.fill(testData.email);
        await this.passwordField.fill(testData.password);
        await this.cityField.fill(testData.city);
        await this.countryDropDown.selectOption(testData.country);
        await this.phoneNumberField.fill(testData.phoneNumber);
        await this.addressField.fill(testData.address);
        await this.zipCodeField.fill(testData.zipCode);
        await this.registerSubmitBtn.click();

    }

};