// Lists of options for select fields

export const partyTypes = ['Actor' , 'Demandado' , 'Tercero Interesado' , 'Ministerio Público' , 'Victima u ofendido' , 'Imputado' , 'Acusado' ,
      'Sentenciado' , 'De Cujus' , "Abogado patrono del actor"] as const;

export const classificationTypes = ['Pública', 'Privada'] as const;

export const partyRegimeTypes = ['Persona Física', 'Persona Moral'] as const;

export const sexTypes = ['Masculino', 'Femenino'] as const;

export const genderTypes = ['Masculino', 'Femenino'] as const;

export const gradeOfStudiesTypes = ['Sin estudios', 'Primaria', 'Secundaria', 'Preparatoria', 'Licenciatura', 'Maestría', 'Doctorado'] as const;

export const nationalityTypes = ['Mexicana', 'Estadounidense', 'Otra'] as const;

export const civilStatusTypes = ['Soltero(a)', 'Casado(a)', 'Divorciado(a)', 'Viudo(a)'] as const;

export const randomBooleans = ['Sí', 'No'] as const;

// Type definitions for select fields

type TypeOfParty = typeof partyTypes[number];
type Classification = typeof classificationTypes[number];
type PartyRegime = typeof partyRegimeTypes[number];
type Gender = typeof genderTypes[number];
type GradeOfStudies = typeof gradeOfStudiesTypes[number];
type Nationality = typeof nationalityTypes[number];
type CivilStatus = typeof civilStatusTypes[number];
type Sex = typeof sexTypes[number];
type RandomBoolean = typeof randomBooleans[number];

// Personal Information Section
export interface IPartyPersonal {
  partyType: TypeOfParty; 
  names: string;
  paternalSurname: string;
  maternalSurname: string;
  birthDate: string;
  sex: Sex;
  clasification: Classification;
  alias: string;
  age: number;
  partyRegime: PartyRegime;
  gender: Gender;
}

// Contact Information Section
export interface IPartyContact {
  email: string;
  phoneNumber: string;
  address: string;
}

// Transparency and legal information Section
export interface IPartyLegal {
  canReadAndWrite: RandomBoolean;
  gradeOfStudies: GradeOfStudies;
  nationality: Nationality;
  speaksSpanish: RandomBoolean;
  civilStatus: CivilStatus;
  occupation: string;
  belongsToIndigenousGroup: RandomBoolean;
}

// Combined interface
export interface IParty extends IPartyPersonal, IPartyContact, IPartyLegal {}