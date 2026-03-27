// Personal Information



export interface IPartyPersonal {
  partyType: 'Actor' | 'Demandado' | 'Tercero Interesado' | 'Ministerio Público' | 'Victima u ofendido' | 'Imputado' | 'Acusado' |
      'Sentenciado' | 'De Cujus' | "Abogado patrono del actor";
  names: string;
  paternalSurname: string;
  maternalSurname: string;
  birthDate: string;
  sex: string;
  clasification: 'Pública' | 'Privada';
  alias: string;
  age: number;
  partyRegime: 'Persona Física' | 'Persona Moral';
  gender: 'Masculino' | 'Femenino';
}

// Contact Information
export interface IPartyContact {
  email: string;
  phoneNumber: string;
  address: string;
}

// Transparency and legal information
export interface IPartyLegal {
  canReadAndWrite: string;
  gradeOfStudies: 'Sin estudios' | 'Primaria' | 'Secundaria' | 'Preparatoria' | 'Licenciatura' | 'Maestría' | 'Doctorado';
  nationality: 'Mexicana' | 'Estadounidense' | 'Otra';
  speaksSpanish: string;
  civilStatus: 'Soltero(a)' | 'Casado(a)' | 'Divorciado(a)' | 'Viudo(a)';
  occupation: string;
  belongsToIndigenousGroup: string;
}

// Combined interface
export interface IParty extends IPartyPersonal, IPartyContact, IPartyLegal {}