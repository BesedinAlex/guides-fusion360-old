import {Component, OnInit} from '@angular/core';
import {ContentService} from '../../services/content.service';
import {HomePageDataService} from '../../services/home-page-data.service';

@Component({
  selector: 'app-guides',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  readonly guides;

  constructor(
    private data: ContentService,
    private test: HomePageDataService
  ) {
    this.guides = data.previews;
  }

  async ngOnInit() {
    const test = await this.test.getPreviewData();
    console.log(test);
  }
}
