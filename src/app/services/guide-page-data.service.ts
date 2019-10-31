import {Injectable} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';
import PartGuide from '../interfaces/part-guide';

@Injectable({
  providedIn: 'root'
})
export class GuidePageDataService extends DatabaseConnectionService {

  async getGuideImage(guideId: number): Promise<string> {
    try {
      return await this.getData(`guide-img?guideId=${guideId}`);
    } catch (err) {
      alert('Unable to access database. Try again.');
    }
  }

  async getGuidePageData(guideId: number): Promise<PartGuide[]> {
    try {
      return await this.getData(`guide?guideId=${guideId}`);
    } catch (err) {
      alert('Unable to access database. Try again.');
    }
  }
}
