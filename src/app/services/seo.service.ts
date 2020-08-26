import {Injectable} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SEOService {
  siteName = "TANB EXPRESS";

  constructor(private title: Title,
              private meta: Meta) {
  }

  updateTitle(title?: string) {
    this.title.setTitle(this.titleString(title));
  }

  updateOgTitle(title?: string) {
    this.meta.updateTag({ property: 'og:title', content: this.titleString(title) })
  }

  updateOgDescription(desc: string) {
    this.meta.updateTag({ property: 'og:description', content: desc })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  titleString(title?: string) {
    let _title = this.siteName;
    if (title) {
      _title = title + " - " + this.siteName;
    }
    return _title;
  }
}
