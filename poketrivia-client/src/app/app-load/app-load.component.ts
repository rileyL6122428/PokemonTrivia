import { Component, OnInit } from '@angular/core';
import { AppLoadService } from './app-load.service';

@Component({
  selector: 'app-app-load',
  templateUrl: './app-load.component.html',
  styleUrls: ['./app-load.component.scss']
})
export class AppLoadComponent implements OnInit {

  constructor(
    private appLoadService: AppLoadService
  ) { }

  ngOnInit() {
    this.appLoadService.fetchAllResources();
  }

}
