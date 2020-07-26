import { ICustomer } from '../customers/customer';
import { IItem } from './item';
import { IActivity } from './activity';
import { IAppStatus } from '../AppStatus';

export interface ILoan extends IAppStatus {
  id: number;
  status: string;
  weight: string;
  comment: Date;
  customer: ICustomer;
  items: IItem[];
  activities: IActivity[];
}
