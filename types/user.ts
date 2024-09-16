export interface User {
  lastName: string;
  firstName: string;
  email: string;
  customerNumber: string;
  orders: Order[];
}
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
