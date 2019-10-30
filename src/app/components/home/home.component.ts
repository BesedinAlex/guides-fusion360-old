import {Component, OnInit} from '@angular/core';
import {HomePageDataService} from '../../services/home-page-data.service';
import Guide from '../../interfaces/guide';

@Component({
  selector: 'app-guides',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  // TODO: Move all the data to server database.
  guides: Guide[];

  constructor(private data: HomePageDataService) {
  }

  async ngOnInit() {
    this.guides = await this.data.getHomePageData();
    console.log(this.guides);
  }
}
