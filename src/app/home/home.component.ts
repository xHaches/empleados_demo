import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HomeService } from './services/home.service';
import { SeedService } from '../shared/services/seed/seed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(
    private readonly homeService: HomeService,
    private readonly seedService: SeedService
  ) {}

  ngOnInit(): void {
    this.seedService.start();
  }

  ngAfterViewInit(): void {
    this.tabGroup.focusTab(this.tabGroup.selectedIndex || 0)
  }

  changePage(event: MatTabChangeEvent) {
    this.homeService.changePage(event.index);
  }
}
