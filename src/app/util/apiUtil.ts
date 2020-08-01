import { IAppStatus } from '../AppStatus';

export function checkStatus(apiStatus: IAppStatus) {
  if (apiStatus) {
    if (apiStatus.statusMessage) return apiStatus.statusMessage;
    if (apiStatus.statusCode)
      if (apiStatus.statusCode === 200) return 'SUCCESS';
  }
  return 'Error';
}
