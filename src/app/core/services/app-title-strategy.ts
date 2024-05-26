import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { TitleStrategy } from "@angular/router";
import type { NavigationItem } from "../../interfaces/navigation-item";

export const TITLE_SUFFIX = "TANB EXPRESS";
export const TITLE_SEPARATOR = " • ";

@Injectable({ providedIn: "root" })
export class AppTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.#title.setTitle(title);
    }
  }

  override buildTitle(snapshot: RouterStateSnapshot): string {
    let route: ActivatedRouteSnapshot = snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.data as NavigationItem;
    const routeTitle = data.label ?? "";

    return routeTitle
      ? `${routeTitle}${TITLE_SEPARATOR}${TITLE_SUFFIX}`
      : TITLE_SUFFIX;
  }
}
