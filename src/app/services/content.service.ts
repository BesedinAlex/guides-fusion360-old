import { Injectable } from '@angular/core';
import * as content from '../../content.json';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private data = content;
  // @ts-ignore
  guides = this.data.default.home;

}
