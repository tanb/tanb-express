import {Injectable} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SEOService {
  siteName = "TANB EXPRESS";

  constructor(private title: Title,
              private meta: Meta) {
  }

  updateTitle(title?: string) {
    if (title) {
      this.title.setTitle(title + " - " + this.siteName);
    } else {
      this.title.setTitle(this.siteName);
    }
  }

  updateOgDescription(desc: string) {
    this.meta.updateTag({ name: 'og:description', content: desc })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }
}
