/* tslint:disable */
/* eslint-disable */
import { K4RComponentType } from './k-4-r-component-type';
import { K4RComponentVersionInfo } from './k-4-r-component-version-info';
export interface K4RComponent {
  description: string;
  newVersion?: K4RComponentVersionInfo;
  prettyName: string;
  refDocs: string;
  refFunctional: string;
  refHealth: string;
  serviceName: string;
  type: K4RComponentType;
  version: string;
}
