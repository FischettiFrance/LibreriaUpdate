import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <span>Login with</span>
  <div class="img-container">
    <img src="assets/spotify.png" (click)="login()" />
  </div>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenSvc: TokenService, private router: Router) { }

  ngOnInit() {
    if(!!this.tokenSvc.oAuthToken){
      this.router.navigate(['user']);
    }
  }

  public login(): void {
    const scopes = new ScopesBuilder().withScopes(ScopesBuilder.LIBRARY).build();
    const ac: AuthConfig = {
      client_id: "c0b910293b524096ba15a6345e0282b3",  // WebPortal App Id. Shoud be config
      //client_secret:"897efc54a9a34202b692aa00464f0ce6",
      response_type: "token",
      redirect_uri: "https://4200-cc407e15-5359-4e15-8db5-f7ca02f23925.ws-eu01.gitpod.io/authorized",  // My URL
      state: "",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }
}
