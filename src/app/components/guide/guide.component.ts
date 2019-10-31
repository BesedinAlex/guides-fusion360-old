import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GuidePageDataService} from '../../services/guide-page-data.service';
import PartGuide from '../../interfaces/part-guide';

interface CurrentPart {
  name: string;
  content: { data: string, code: string }[];
}

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.sass']
})
export class GuideComponent implements OnDestroy {

  private guideId: number;
  private currentPart: CurrentPart;
  private guides: PartGuide[];

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private data: GuidePageDataService
  ) {
    this.currentRoute.params.subscribe(async param => {
      this.guideId = param.id;
      this.guides = await this.data.getHomePageData(this.guideId);
      if (this.guides.length === 0) {
        await this.router.navigate(['/']);
      }
      this.guides.sort((a: PartGuide, b: PartGuide) => a.sortKey > b.sortKey ? 1 : -1);
      this.currentPart = {name: '', content: [] = []};
    });
  }

  ngOnDestroy() {
    this.guideId = undefined;
    this.currentPart = undefined;
    this.guides = undefined;
  }

  fillModalWindow(part: PartGuide) {
    this.currentPart.name = part.name;
    this.currentPart.content = [];
    const parsedContent = part.content.split('^');
    for (const line of parsedContent) {
      if (/[0-9]+\.(?:jpg|png|JPG|PNG)$/gi.test(line)) { // Image
        const link = `./assets/guides/${this.guideId}/img/${line}`;
        this.currentPart.content.push({data: link, code: 'img'});
      } else if (/https?:\/\/(www\.)?(\w+\.)+(\w+)(\/(\w+|\?*|=*|\.)+)*/gi.test(line)) { // Video
        this.currentPart.content.push({data: line, code: 'video'});
      } else if (/parts\.zip/gi.test(line)) { // .zip file
        const link = `./assets/guides/${this.guideId}/parts.zip`;
        this.currentPart.content.push({data: link, code: 'parts'});
      } else if (line.length > 0) { // Text
        this.currentPart.content.push({data: line, code: 'text'});
      }
    }
  }

  getImgId(data: string): number {
    return +data.match(/[0-9]+/g)[1];
  }
}
