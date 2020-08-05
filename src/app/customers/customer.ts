import { IAppStatus } from '../AppStatus';
export interface ICustomer extends IAppStatus {
  id: number;
  name: string;
  secondaryName: string;
  date: Date;
  address: string;
  post: string;
  pin: string;
  phone: string;
  comment: string;
}
