import {Injectable} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';
import Guide from '../interfaces/guide';

@Injectable({
  providedIn: 'root'
})
export class HomePageDataService extends DatabaseConnectionService {

  async getHomePageData(): Promise<Guide[]> {
    try {
      return await this.getData('guide/all');
    } catch (err) {
      alert('Unable to access database. Try again.');
    }
  }
}
