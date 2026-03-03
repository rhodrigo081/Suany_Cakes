export interface Address {
  id: string;
  street: string;
  label: string;
  isPrimary: boolean;
  complement?: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
