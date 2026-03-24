export interface Party {

    // Personal Information
    partyType:
        'Actor'                 | 'Demandado'           | 'Tercero Interesado'  | 
        'Ministerio Público'    | 'Victima u ofendido'  | 'Imputado'            | 
        'Acusado'  | 'Sentenciado' | 'De Cujus';

    names: string;
    paternalSurname: string;
    maternalSurname: string;
    birthDate: Date;
    sex: string;
    clasification: 'Pública' | 'Privada' ;
    alias : string;
    age: number;
    partyRegime: 'Persona Física' | 'Persona Moral';
    gender : 'Masculino' | 'Femenino' ; 

    // Contact Information
    email: string;
    phoneNumber: string;
    address: string;

    // Transparency and legal information
    canReadAndWrite: boolean;
    gradeOfStudies: 'Sin estudios' | 'Primaria' | 'Secundaria' | 'Preparatoria' | 'Licenciatura' | 'Maestría' | 'Doctorado';
    nationality: 'Mexicana' | 'Estadounidense' | 'Otra';
    speakesSpanish: boolean;
    civilStatus: 'Soltero(a)' | 'Casado(a)' | 'Divorciado(a)' | 'Viudo(a)';
    occupation: string;
    belongsToIndigenousGroup: boolean;
}