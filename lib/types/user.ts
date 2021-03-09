export enum Gender {
  NonBinary = "Non-binary",
  Female = "Female",
  Male = "Male",
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender.NonBinary | Gender.Female | Gender.Male;
}
