export interface RegistrationForm {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    address: string,
    postcode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string
}

export enum SortOptions {
    AtoZ = "name,asc",
    ZtoA = "name,desc",
    LowToHigh = "price,asc",
    HighToLow = "price,desc"
  }

export enum ToolCategories {
    hammer,
    handSaw,
    wrench,
    screwdriver,
    pliers,
    drill,
    grinder,
    sander,
    saw
}