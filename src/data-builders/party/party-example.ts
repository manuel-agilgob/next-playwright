import { randomInt } from 'node:crypto';
import { IParty } from '@contracts/IParty.type';
import { faker } from '@faker-js/faker';

function pickRandomOption(options: string[]): string {
    const randomIndex = randomInt(0, options.length);
    return options[randomIndex];
}

// TODO completar los campos con todas las opciones de la aplicacion
export function buildPartyExample(overrides?: Partial<IParty>): IParty {
    const defaultParty: IParty = {
        // Personal Information
        type: 'Actor',
        names: faker.person.firstName(),
        paternalLastName: faker.person.lastName(),
        maternalLastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toDateString(),
        sex: pickRandomOption(['Masculino', 'Femenino']),
        classification: 'Privada',
        alias: 'El Fercho',
        age: 41,
        regime: 'Persona Física',
        gender: pickRandomOption(['Masculino', 'Femenino']),

        // Contact Information
        email: faker.internet.email(),
        phone: faker.phone.number({style: 'national'}),
        address: faker.location.streetAddress() + ', ' + faker.location.city() + ', ' + faker.location.state() + ', CP ' + faker.location.zipCode(),

        // Transparency and legal information
        canReadAndWrite: randomInt(0, 2) === 1 ? 'Sí' : 'No',
        gradeOfStudies: pickRandomOption(['Licenciatura', 'Maestría', 'Doctorado']),
        nationality: 'Mexicana',
        speaksSpanish: randomInt(0, 2) === 1 ? 'Sí' : 'No',
        civilStatus: pickRandomOption(['Casado(a)']),
        occupation: faker.person.jobTitle(),
        belongsToIndigenousGroup: randomInt(0, 2) === 1 ? 'Sí' : 'No',
    };

    return {
        ...defaultParty,
        ...overrides
    };
}
