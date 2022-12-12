import { Service } from "./Service";

export interface SortedServices {
  apis: Service[];
  webUIs: Service[];
  administration: Service[];
}
