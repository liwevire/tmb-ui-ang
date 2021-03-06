import { ICustomer } from '../customers/customer';
import { IItem } from './item';
import { IActivity } from './activity';
import { IAppStatus } from '../AppStatus';

export interface ILoan extends IAppStatus {
  id: number;
  altId:string;
  status: string;
  weight: string;
  comment: string;
  customer: ICustomer;
  items: IItem[];
  activities: IActivity[];
}

export function getPrincipalActivity(activities: IActivity[]) {
  activities = activities.filter(
    (activity) => activity.category == 'principal'
  );
  if (activities.length == 1) return activities[0];
}
