import {faker} from '@faker-js/faker';

export const newUser1 = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    city: faker.location.city(),
    country: 'Ukraine',
    phoneNumber: '+380509899148',
    address: faker.location.streetAddress(),
    zipCode: '29004',
};

export const cardData = {
    cardNumber: faker.string.numeric(16),
    cardDate: '12/28',
    cardCVV: faker.finance.creditCardCVV()
};

export const apiDataPost = {
            title: 'Hello World',
            body: 'Test body',
            userId: 1,
};

export const apiDataPatch = {
            title: 'Hello AQA',
};

export const apiDataPut = 
        {
            id:1,
            title: 'Updated title',
            body: 'Updated body',
            userId: 1
        }



    
    


