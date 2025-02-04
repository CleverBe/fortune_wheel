import { Option } from "./types";
import { v4 as uuidv4 } from "uuid";

export const initialRouletteData: Option[] = [
  {
    id: uuidv4(),
    title: "Grace",
  },
  {
    id: uuidv4(),
    title: "Heidi",
  },
  {
    id: uuidv4(),
    title: "Ivan",
  },
  {
    id: uuidv4(),
    title: "Alice",
  },
  {
    id: uuidv4(),
    title: "Bob",
  },
  {
    id: uuidv4(),
    title: "Charlie",
  },
  {
    id: uuidv4(),
    title: "David",
  },
  {
    id: uuidv4(),
    title: "Eve",
  },
  {
    id: uuidv4(),
    title: "Frank",
  },
];

export const backgroundColors = [
  "#3f297e",
  "#175fa9",
  "#169ed8",
  "#239b63",
  "#64b031",
  "#efe61f",
  "#f7a416",
  "#e6471d",
  "#dc0936",
  "#e5177b",
  "#be1180",
  "#871f7f",
];
