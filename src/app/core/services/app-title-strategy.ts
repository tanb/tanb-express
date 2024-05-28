import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import type { NavigationItem } from '../../interfaces/navigation-item';

export const TITLE_SUFFIX = 'TANB EXPRESS';
export const TITLE_SEPARATOR = ' • ';

const WEBSITE_DESCRIPTION = {
  description:
    "I work as a software engineer primarily in the Tokyo area. If you have any concerns, please feel free to contact me. Whether it's creating mobile apps, news media, business applications, website construction, or anything else, please don't hesitate to consult with me. I will propose solutions tailored to your budget. ",
  description_ja:
    '私は東京エリアを中心にソフトウェアエンジニアをしています. 何かお困りのことがあればぜひお問い合わせください. モバイルアプリ作成, ニュースメディア作成, 業務アプリ作成, ウェブサイト構築など, どんなことでも構いません、お気軽にご相談ください. お客様のご予算に合わせた提案をさせていただきます.',
};

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.#title.setTitle(title);
      this.#meta.updateTag({ property: 'og:title', content: title });
    }
    this.#meta.updateTag({ property: 'og:description', content: WEBSITE_DESCRIPTION.description });
    this.#meta.updateTag({ name: 'description', content: WEBSITE_DESCRIPTION.description });
  }

  override buildTitle(snapshot: RouterStateSnapshot): string {
    let route: ActivatedRouteSnapshot = snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.data as NavigationItem;
    const routeTitle = data.label ?? '';

    return routeTitle ? `${routeTitle}${TITLE_SEPARATOR}${TITLE_SUFFIX}` : TITLE_SUFFIX;
  }
}
