import { IAppStatus } from '../AppStatus';
export interface IReport extends IAppStatus {
  principalOpen: number;
  principalPaidOpen: number;
  interestPaidOpen: number;
  principalClosed: number;
  principalPaidClosed: number;
  interestPaidClosed: number;
}
