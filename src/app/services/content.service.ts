import { Injectable } from '@angular/core';
import * as content from '../../assets/content.json';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private data = content;
  // @ts-ignore
  previews = this.data.default.home;
  // @ts-ignore
  guides = this.data.default.guides;

}
