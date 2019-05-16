import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../services/content.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.sass']
})
export class GuideComponent {

  readonly guide;
  currentPart = {name: '', content: [] = []};
  id: number;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private data: ContentService
  ) {
    this.currentRoute.params.subscribe(param => this.id = param.id);
    this.guide = this.data.guides.find(guide => guide.id === +this.id);
    if (this.guide === undefined) {
      this.router.navigate(['/']);
    }
  }

  fillGuide(part) {
    this.currentPart.name = part.name;
    this.currentPart.content = [];
    let mode = false;
    let temp = '';
    let currentIndex = 0;
    let currentChar: string;
    while (currentIndex !== part.content.length) {
      currentChar = part.content[currentIndex];
      switch (currentChar) {
        case '@': // Image
          if (!mode) {
            this.currentPart.content.push({data: temp, code: 'text'});
          } else {
            const link = `../../assets/guides/${this.id}/img/${temp}`;
            this.currentPart.content.push({data: link, id: temp.match(/[0-9]+/)[0], code: 'img'});
          }
          temp = '';
          mode = !mode;
          break;
        case '%': // Video
          const code = !mode ? 'text' : 'video';
          this.currentPart.content.push({data: temp, code});
          temp = '';
          mode = !mode;
          break;
        case '$': // TODO: download Fusion parts
          break;
        default:
          temp += currentChar;
          break;
      }
      currentIndex++;
    }
    if (temp.length > 0) {
      this.currentPart.content.push({data: temp, code: 'text'});
    }
  }

}
