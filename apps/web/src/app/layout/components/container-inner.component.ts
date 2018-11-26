import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'stottle-container-inner',
  template: `
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport="true"
      [attr.role]="role"
      [mode]="mode"
      [opened]="opened">

      <stottle-side-nav
        (itemSelected)="isHandset && drawer.toggle()"
      ></stottle-side-nav>

    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">

        <mat-toolbar-row>
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>

          <span fxFlex="100">{{title}}</span>

          <a
            *ngFor="let link of links"
            [href]="link.link"
            target="_blank"
            mat-icon-button>
            <mat-icon aria-label="nav icon" [svgIcon]="link.name"></mat-icon>
          </a>
          <button
            type="button"
            mat-icon-button
            (click)="authAction()">
            <mat-icon aria-label="Auth icon">{{authIcon}}</mat-icon>
          </button>
        </mat-toolbar-row>

      </mat-toolbar>

      <main class="body-container">
        <router-outlet></router-outlet>
        <ng-content></ng-content>
      </main>

    </mat-sidenav-content>
  </mat-sidenav-container>
  `
})
export class ContainerInnerComponent {
  @Input() isAuthenticated: boolean;
  @Input() isHandset: boolean;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  title = 'stottle.uk';
  links = [
    {
      name: 'social-github',
      url: 'assets/icons-social/github-circle-white-transparent.svg',
      link: 'https://github.com/stottle-uk/platform'
    },
    {
      name: 'social-linkedin',
      url: 'assets/icons-social/linkedin.svg',
      link: 'https://www.linkedin.com/in/stuarttottle'
    }
  ];

  get mode(): string {
    return this.isHandset ? 'over' : 'side';
  }

  get role(): string {
    return this.isHandset ? 'dialog' : 'navigation';
  }

  get opened(): boolean {
    return !this.isHandset;
  }

  get authIcon(): string {
    return this.isAuthenticated ? 'logout' : 'person';
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.links.forEach(icon =>
      iconRegistry.addSvgIcon(
        icon.name,
        sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      )
    );
  }

  authAction(): void {
    this.isAuthenticated ? this.logout.emit() : this.login.emit();
  }
}
