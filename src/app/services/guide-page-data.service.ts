import {Injectable} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';
import PartGuide from '../interfaces/part-guide';

@Injectable({
  providedIn: 'root'
})
export class GuidePageDataService extends DatabaseConnectionService {

  async getHomePageData(guideId: number): Promise<PartGuide[]> {
    try {
      return await this.getData(`guide?guideId=${guideId}`);
    } catch (err) {
      alert('Unable to access database. Try again.');
    }
  }
}
