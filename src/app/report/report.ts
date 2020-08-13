import { IAppStatus } from '../AppStatus';
export interface IOutstandingReport extends IAppStatus {
  principalOpen: number;
  principalPaidOpen: number;
  interestPaidOpen: number;
  principalClosed: number;
  principalPaidClosed: number;
  interestPaidClosed: number;
}

export interface ILoanInterestReport extends IAppStatus {
  principal: number;
  principalPaid: number;
  principalOutstanding: number;
  interest: number;
  interestPaid: number;
  interestOutstanding: number;
  totalDays: number;
  calcComment: string;
}
