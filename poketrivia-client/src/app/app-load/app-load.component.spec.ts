import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppLoadComponent } from './app-load.component';
import { AppLoadService } from './app-load.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

describe('AppLoadComponent', () => {
  let component: AppLoadComponent;
  let fixture: ComponentFixture<AppLoadComponent>;
  let appLoadServiceMock: any;
  let fetchAllResourcesObserver: Observer<boolean>;
  let routerMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLoadComponent ],
      providers: [
        {
          provide: AppLoadService,
          useValue: jasmine.createSpyObj('AppLoadService', ['fetchAllResources'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigateByUrl'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _stubAppLoadService();
    routerMock = TestBed.get(Router);
    _loadComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('retrieves information needed on app load', () => {
      expect(appLoadServiceMock.fetchAllResources).toHaveBeenCalled();
    });

    it('routes to rooms component if service calls succeed', async(() => {
      fetchAllResourcesObserver.next(true);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/rooms');
    }));

    it('routes to error component if service calls fail', () => {
      fetchAllResourcesObserver.next(false);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/error');
    });
  });

  function _stubAppLoadService() {
    appLoadServiceMock = TestBed.get(AppLoadService);
    appLoadServiceMock.fetchAllResources.and.returnValue(
      new Observable<boolean>((observer) => fetchAllResourcesObserver = observer)
    );
  }

  function _loadComponent() {
    fixture = TestBed.createComponent(AppLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
