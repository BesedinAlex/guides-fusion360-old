import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomePageDataService} from '../../services/home-page-data.service';
import {serverURL} from '../../services/server-url';
import Guide from '../../interfaces/guide';

@Component({
  selector: 'app-guides',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  // TODO: Move all the data to server database.
  private guides: Guide[];
  private serverURL: string;

  constructor(private data: HomePageDataService) {
    this.serverURL = serverURL;
  }

  async ngOnInit() {
    this.guides = await this.data.getHomePageData();
  }

  ngOnDestroy() {
    this.guides = undefined;
    this.serverURL = undefined;
  }
}
