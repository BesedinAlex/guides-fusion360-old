import { Injectable } from '@angular/core';
import * as content from '../../assets/content.json';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  // @ts-ignore
  previews = content.default.home;
  // @ts-ignore
  guides = content.default.guides;
  // @ts-ignore
  annotations = content.default.annotations;

}
