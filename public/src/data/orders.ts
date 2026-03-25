import {
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from "@/types/Order";
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

const CUSTOMER_NAMES = [
  "Ana Silva",
  "Bruno Oliveira",
  "Carla Souza",
  "Diego Fernandes",
  "Elena Rangel",
  "Fabio Matos",
  "Giovanna Lira",
  "Heitor Costa",
];

const STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[];

export const MOCK_ORDERS: Order[] = Array.from({ length: 40 }).map(
  (_, index) => {
    const status = STATUS_OPTIONS[index % STATUS_OPTIONS.length];
    const address = MOCK_ADDRESSES[index % MOCK_ADDRESSES.length];
    const customerName = CUSTOMER_NAMES[index % CUSTOMER_NAMES.length];

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

    const baseDate = new Date(2026, 2, 23, 10, 0);
    const createdAt = new Date(baseDate);
    createdAt.setDate(baseDate.getDate() - (index % 10));

    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(createdAt.getDate() + 2);

    return {
      id: `ORD-26${index.toString().padStart(4, "0")}`,
      status: status,
      customerName: customerName,
      createdAt: createdAt.toISOString(),
      totalPrice: total,
      deliveryDate: deliveryDate.toISOString(),
      shippingAddress: address,
      items: items,
    };
  },
);
