import { ORDER_STATUS_LABELS, type Order } from "@/types/Order";
import { products } from "./products";

const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    label: "Casa",
    street: "Rua Aurora",
    neighborhood: "Santo Amaro",
    city: "Recife",
    state: "PE",
    zipCode: "50040-000",
    number: 123,
    isPrimary: true,
  },
  {
    id: "addr-2",
    label: "Trabalho",
    street: "Avenida Boa Viagem",
    neighborhood: "Boa Viagem",
    city: "Recife",
    state: "PE",
    zipCode: "51011-000",
    number: 500,
    isPrimary: false,
  },
  {
    id: "addr-3",
    label: "Casa Mãe",
    street: "Rua do Futuro",
    neighborhood: "Jaqueira",
    city: "Recife",
    state: "PE",
    zipCode: "52050-010",
    number: 85,
    isPrimary: false,
  },
  {
    id: "addr-4",
    label: "Apartamento",
    street: "Rua da Moeda",
    neighborhood: "Bairro do Recife",
    city: "Recife",
    state: "PE",
    zipCode: "50030-040",
    number: 10,
    complement: "Apto 201",
    isPrimary: false,
  },
];

const STATUS_OPTIONS = Object.keys(
  ORDER_STATUS_LABELS,
) as (keyof typeof ORDER_STATUS_LABELS)[];

export const MOCK_ORDERS: Order[] = Array.from({ length: 40 }).map(
  (_, index) => {
    const status = STATUS_OPTIONS[index % STATUS_OPTIONS.length];
    const address = MOCK_ADDRESSES[index % MOCK_ADDRESSES.length];

    const itemsCount = (index % 3) + 1;
    const items = Array.from({ length: itemsCount }).map((_, i) => {
      const product = products[(index + i) % products.length];
      const qty = (i % 2) + 1;
      return {
        productName: product.name,
        productImage: product.image,
        quantity: qty,
        unitPrice: product.price,
        subtotal: product.price * qty,
      };
    });

    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    return {
      id: `ORD-${2026}${index.toString().padStart(3, "0")}`,
      status: status,
      createdAt: new Date(2026, 2, 23 - (index % 10), 10, index).toISOString(),
      totalPrice: total,
      deliveryDate: new Date(2026, 2, 25 - (index % 5), 14, 0).toISOString(),
      shippingAddress: address,
      items: items,
    };
  },
);
