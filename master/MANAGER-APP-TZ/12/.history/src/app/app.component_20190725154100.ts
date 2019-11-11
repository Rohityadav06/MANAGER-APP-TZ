import { Component, ViewChild , ViewChildren, QueryList } from '@angular/core';
import { Platform, NavController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Pages } from './interfaces/pages';

// push notification
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  _userid: string;
  _username: string;
  _emailid: string;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  //@ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private alertController: AlertController,
    private fcm: FCM, 
    private router: Router
  ) {
    this.backButtonEvent();
    this.appPages = [
      /*{
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },*/
      {
        title: 'Center Details',
        url: '/home-results',
        direct: 'forward',
        icon: 'business'
      },
      {
        title: 'Daily Expenses',
        url: '/expense',
        direct: 'forward',
        icon: 'cash'
      },
      {
        title: 'Messages',
        url: '/message',
        direct: 'forward',
        icon: 'mail-unread'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'at'
      }
      
      /*,
      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }*/
    ];

    this.initializeApp();
    this._userid = localStorage.getItem("_userid");
    this._username = localStorage.getItem("_username");
    this._emailid = localStorage.getItem("_emailid");

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();// Push notification starts from here
      this.fcm.getToken().then(token => {
        localStorage.setItem('fcm_token',token);
        console.log('@@@ app.component fcm_token'+JSON.stringify(token));
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        localStorage.setItem('fcm_rtoken',token);
        console.log('@@@ app.component fcm_rtoken'+JSON.stringify(token));
      });

      this.fcm.onNotification().subscribe(data => {
        console.log('@@@ Push notification data: '+JSON.stringify(data));
        if (data.wasTapped) {
          console.log('@@@ app.component Received in background');
          this.router.navigate(['/showpushnotification', data.message]);
        } else {
          console.log('@@@ app.component Received in foreground');
          this.router.navigate(['/showpushnotification', data.message]);
        }
      });
      
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/');
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }/*else if (this.router.url === '/center') {
        this.navCtrl.navigateRoot('/home-results');
      }*/ else {
        this.exitTheApp(this.router.url);
      } 
    });

    
  }

  async exitTheApp(url) {
    const alert = await this.alertController.create({
      header: 'Exit',
      subHeader: '',
      message: 'Are you Sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}

