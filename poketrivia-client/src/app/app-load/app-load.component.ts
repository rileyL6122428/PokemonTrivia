import { Component, OnInit } from '@angular/core';
import { AppLoadService } from './app-load.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-load',
  templateUrl: './app-load.component.html',
  styleUrls: ['./app-load.component.scss']
})
export class AppLoadComponent implements OnInit {

  constructor(
    private appLoadService: AppLoadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appLoadService
      .fetchAllResources()
      .subscribe((fetchWasSuccessful) => {
        const redirectUrl = fetchWasSuccessful ? '/rooms' : '/error';
        this.router.navigateByUrl(redirectUrl);
      });
  }

}
