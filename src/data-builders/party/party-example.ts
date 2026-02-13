import { Party } from '../party.interface';

export function buildPartyExample(overrides?: Partial<Party>): Party {
    const defaultParty: Party = {
        // Personal Information
        partyType: 'Actor',
        names: 'Fer Carlos',
        paternalSurname: 'García',
        maternalSurname: 'López',
        birthDate: new Date('1985-05-15'),
        sex: 'Masculino',
        clasification: 'Privada',
        alias: 'El Fercho',
        age: 41,
        partyRegime: 'Persona Física',
        gender: 'Masculino',

        // Contact Information
        email: 'fer.carlos@example.com',
        phoneNumber: '5512345678',
        address: 'Calle Reforma 123, Col. Centro, Ciudad de México, CP 06000',

        // Transparency and legal information
        canReadAndWrite: true,
        gradeOfStudies: 'Licenciatura',
        nationality: 'Mexicana',
        speakesSpanish: true,
        civilStatus: 'Casado(a)',
        occupation: 'Ingeniero Civil',
        belongsToIndigenousGroup: false
    };

    return {
        ...defaultParty,
        ...overrides
    };
}
