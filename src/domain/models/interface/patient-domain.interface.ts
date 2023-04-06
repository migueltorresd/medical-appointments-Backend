export interface IPatientDomain {
  name: string;
  documentPatient: string;
  birthDate: Date;
  gender: string;
  email: string;
  phone: string;
  state: string;
  medicalhistory?: string;
}
