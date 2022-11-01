export interface Item {
  id: string;
  img: string;
  name: string;
  description: string;
  price: string;
  address: { city: string; state: string };
}
