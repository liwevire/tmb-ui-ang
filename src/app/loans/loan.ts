import { ICustomer } from '../customers/customer';
import { IItem } from './item';
import { IActivity } from './activity';

export interface ILoan {
  id: number;
  status: string;
  weight: string;
  comment: Date;
  customer: ICustomer;
  items: IItem[];
  activities: IActivity[];
}
