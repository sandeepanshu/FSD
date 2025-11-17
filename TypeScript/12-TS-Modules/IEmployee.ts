export interface IEmployee {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  designation: string;

  fullName(): string;
  bio(): void;
}
