export interface IContact {
  displayName: string;
  phone: number;
  createdAt: Date;
}

export interface ICreateContactDto {
  displayName: string;
  phone: number;
}
