import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    this.applicationConfig = {
        auth: {
            clientId: 'Enter_the_Application_Id_here', //This is your client ID
            authority: "https://login.microsoftonline.com/Enter_the_Tenant_Info_Here" //This is your tenant info
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        }
    };
    this.requestObj = {
      scopes: ['user.read']
    }
    this.app = new Msal.UserAgentApplication(this.applicationConfig);
  }
  login() {
    return this.app.loginPopup(this.requestObj).then(
      idToken => {
        const user = idToken.idToken;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };
  logout() {
    this.app.logout();
  };
  getToken() {
    return this.app.acquireTokenSilent(this.requestObj).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.requestObj)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}
