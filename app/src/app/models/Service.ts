import { K4RComponent } from "../apis/portal/models/k-4-r-component";
import { K4RComponentHealthStatus } from "../apis/portal/models/k-4-r-component-health-status";

export interface Service extends K4RComponent {
    health: K4RComponentHealthStatus;
    iconName: string;
    favorite: boolean;
}