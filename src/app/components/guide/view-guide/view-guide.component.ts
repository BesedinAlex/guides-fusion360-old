import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GuidePageDataService} from '../../../services/guide-page-data.service';
import {serverURL} from '../../../services/server-url';
import PartGuide from '../../../interfaces/part-guide';

interface CurrentPart {
  name: string;
  content: { data: string, code: string }[];
}

@Component({
  selector: 'app-view-guide',
  templateUrl: './view-guide.component.html',
  styleUrls: ['./view-guide.component.sass']
})
export class ViewGuideComponent implements OnInit, OnDestroy {

  serverURL: string;
  guideId: number;
  guideImage: string;
  currentPart: CurrentPart;
  guides: PartGuide[];

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private data: GuidePageDataService
  ) {
    this.currentRoute.params.subscribe(param => this.guideId = param.id);
    this.currentPart = {name: '', content: [] = []};
    this.guides = [];
    this.serverURL = serverURL;
  }

  async ngOnInit() {
    this.guides = await this.data.getGuidePageData(this.guideId);
    if (this.guides.length === 0) {
      this.router.navigate(['/']);
    }
    this.guides.sort((a: PartGuide, b: PartGuide) => a.sortKey > b.sortKey ? 1 : -1);
    this.guideImage = await this.data.getGuideImage(this.guideId);
  }

  ngOnDestroy() {
    this.guideId = undefined;
    this.currentPart = undefined;
    this.guides = undefined;
    this.serverURL = undefined;
    this.guideImage = undefined;
  }

  fillModalWindow(part: PartGuide) {
    this.currentPart.name = part.name;
    this.currentPart.content = [];
    const parsedContent = part.content.split('^');
    for (const line of parsedContent) {
      if (/[0-9]+\.(?:jpg|png|JPG|PNG)$/gi.test(line)) { // Image
        const link = `${this.serverURL}/images/guide/${this.guideId}/${line}`;
        this.currentPart.content.push({data: link, code: 'img'});
      } else if (/https?:\/\/(www\.)?(\w+\.)+(\w+)(\/(\w+|\?*|=*|\.)+)*/gi.test(line)) { // YouTube Video
        this.currentPart.content.push({data: line, code: 'video'});
      } else if (/parts\.zip/gi.test(line)) { // .zip file
        const link = `${this.serverURL}/models/${this.guideId}/parts.zip`;
        this.currentPart.content.push({data: link, code: 'parts'});
      } else if (line.length > 0) { // Text
        this.currentPart.content.push({data: line, code: 'text'});
      }
    }
  }

  getImgId(data: string): number {
    const filename = data.match(/[0-9]+\.(?:jpg|png|JPG|PNG)$/gi)[0];
    const id = filename.slice(0, filename.length - 4);
    return Number(id);
  }
}
