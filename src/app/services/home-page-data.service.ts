import {Injectable} from '@angular/core';
import {DatabaseConnectionService} from './database-connection.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageDataService extends DatabaseConnectionService {

  private data: [];

  async getPreviewData() {
    try {
      this.data = await this.getData('preview');
      return this.data;
    } catch (err) {
      alert('Unable to access database. Try again.');
    }
  }
}
