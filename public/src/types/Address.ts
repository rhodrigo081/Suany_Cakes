export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  number: number;
  complement?: string;
  isPrimary: boolean;
}
