import { IEmployee } from "./IEmployee";

export class Employee implements IEmployee {
  public firstName: string;
  public lastName: string;
  public email: string;
  public gender: string;
  public designation: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    designation: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.designation = designation;
  }

  // getter - setter
  public getFirstName(): string {
    return this.firstName;
  }
  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }

  public getGender(): string {
    return this.gender;
  }
  public setGender(gender: string): void {
    this.gender = gender;
  }

  public getDesignation(): string {
    return this.designation;
  }
  public setDesignation(designation: string): void {
    this.designation = designation;
  }

  public fullName(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  public bio(): void {
    let bio: string = `FullName : ${this.fullName()}
                           Email  ${this.getEmail()}
                           Gender : ${this.getGender()}
                           Designation : ${this.getDesignation()}`;
    console.log(bio);
  }
}
