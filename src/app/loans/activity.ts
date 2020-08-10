export interface IActivity {
  id: number;
  loanId: number;
  amount: number;
  category: string;
  date: Date;
}

export function activitySortByDate(activities: IActivity[]) {
  if (activities != null) {
    activities.sort(function (a, b): any {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }
}
