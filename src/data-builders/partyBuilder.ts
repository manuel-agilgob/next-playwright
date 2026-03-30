import { randomInt } from 'node:crypto';
import { faker } from '@faker-js/faker/locale/es_MX';
import { 
    IParty,
    partyTypes,
    sexTypes, 
    classificationTypes,
    genderTypes,
    gradeOfStudiesTypes,
    nationalityTypes,
    civilStatusTypes,
    partyRegimeTypes,
    randomBooleans } from '@contracts/IParty.interface';


export function buildPartyExample(overrides?: Partial<IParty>): IParty {
    const defaultParty: IParty = {
        // Personal Information
        partyType: partyTypes[randomInt(0, partyTypes.length)],
        names: faker.person.firstName(),
        paternalSurname: faker.person.lastName(),
        maternalSurname: faker.person.lastName(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0], // Format as YYYY-MM-DD
        sex: sexTypes[randomInt(0, sexTypes.length)],
        classification: classificationTypes[randomInt(0, classificationTypes.length)],
        alias: faker.internet.username(),
        age: faker.number.int({ min: 18, max: 65 }),
        partyRegime: partyRegimeTypes[randomInt(0, partyRegimeTypes.length)],
        gender: genderTypes[randomInt(0, genderTypes.length)],

        // Contact Information
        email: faker.internet.email(),
        phoneNumber: faker.phone.number({style : 'national'}).replace(/\D/g, ''),
        address: faker.location.streetAddress() + ', ' + faker.location.city() + ', ' + faker.location.state() + ', CP ' + faker.location.zipCode('######'),

        // Transparency and legal information
        canReadAndWrite: randomBooleans[randomInt(0, randomBooleans.length)],
        gradeOfStudies: gradeOfStudiesTypes[randomInt(0, gradeOfStudiesTypes.length)],
        nationality: nationalityTypes[randomInt(0, nationalityTypes.length)],
        speaksSpanish: randomBooleans[randomInt(0, randomBooleans.length)],
        civilStatus: civilStatusTypes[randomInt(0, civilStatusTypes.length)],
        occupation: faker.person.jobTitle(),
        belongsToIndigenousGroup: randomBooleans[randomInt(0, randomBooleans.length)],
    };

    return {
        ...defaultParty,
        ...overrides
    };
}
