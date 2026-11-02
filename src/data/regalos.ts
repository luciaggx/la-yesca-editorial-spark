/* Menús de Regala La Yesca: se usan en su sección y en el carrito. */

export interface GiftMenu {
  name: string;
  price: number;
  description?: string;
  items?: string[];
  nota?: string;
}

export const giftMenus: GiftMenu[] = [
  {
    name: "Menú Aperitivo",
    price: 55,
    items: [
      "Botella de Matabuey (Verdejo de Nava de la Asunción, Segovia)",
      "2 gildas de pato",
      "2 bocados de croqueta de jamón ibérico",
      "2 tapas de ensaladilla con perdiz",
      "Ración de ancas de rana a la brasa",
    ],
    nota: "Válido para dos personas",
  },
  {
    name: "Menú Degustación",
    price: 140,
    description: "Platos más icónicos",
  },
];
