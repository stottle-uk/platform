import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'stottle-dashboard-inner',
  template: `
  <h1>Admin</h1>
  <pre>{{userInfo | json}}</pre>

  <input type="email" placeholder="email address" [(ngModel)]="emailAddress" name="emailAddress"/>
  <button type="button" (click)="submitEmailAddress()">Password Change</button>
  <p>{{changePasswordResponse}}</p>
  `,
  styles: []
})
export class DashboardInnerComponent implements OnInit {
  @Input()
  userInfo: auth0.Auth0UserProfile;
  @Input()
  changePasswordResponse: string;
  @Output()
  emailAddressSubmitted = new EventEmitter<string>();

  emailAddress: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getConfig();
  }

  submitEmailAddress(): void {
    this.emailAddressSubmitted.emit(this.emailAddress);
  }

  getConfig() {
    const configUrl = 'https://localhost:44305/api/values';

    return this.http.get(configUrl).subscribe();
  }
}
