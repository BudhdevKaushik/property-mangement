export type PropertyCategory =
  | "House"
  | "Apartment"
  | "Villa"
  | "Condo"
  | "Land"
  | "Commercial";

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: PropertyCategory | "";
  image?: null | File | string;
  createdAt?: string;
  updatedAt?: string;
}

export type PropertyFormData = Omit<
  Property,
  "_id" | "createdAt" | "updatedAt"
>;
