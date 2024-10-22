export interface User {
  lastName: string;
  firstName: string;
  email: string;
  customerNumber: string;
  orders: Order[];
}
export type UserAndOrder = {
  orders: {
    id?: number;
    location: {
      name: string;
    };
    StickColor: {
      name: string;
    };
    hoodieVariantSize: {
      Size: {
        name: string;
      };
    };
    HoodieVariant: {
      Color: {
        name: string;
      };
    };
  }[];
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  customerNumber: string;
};
interface Order {
  HoodieVariant: HoodieVariant;
  location: Location;
  StickColor: StickColor;
}
interface HoodieVariant {
  Color: Color;
  Size: Size;
}
interface Color {
  name: string;
}
interface Size {
  name: string;
}
interface Location {
  name: string;
}
interface StickColor {
  name: string;
}

export interface FlattenedUser {
  email: string;
  Vorname: string;
  Nachname: string;
  PersonalNummer: string;
  HoodieFarbe: string;
  HoodieSize: string;
  StickFarbe: string;
  Ort: string;
}
