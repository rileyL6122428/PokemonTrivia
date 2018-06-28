import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoadComponent } from './app-load.component';
import { AppLoadService } from './app-load.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

describe('AppLoadComponent', () => {
  let component: AppLoadComponent;
  let fixture: ComponentFixture<AppLoadComponent>;
  let appLoadServiceMock: any;
  let fetchAllResourcesObserver: Observer<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLoadComponent ],
      providers: [
        {
          provide: AppLoadService,
          useValue: jasmine.createSpyObj('AppLoadService', ['fetchAllResources'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _stubAppLoadService();
    _loadComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('makes a call to retrieve information needed on app load', () => {
      expect(appLoadServiceMock.fetchAllResources).toHaveBeenCalled();
    });

    xit('routes to rooms component if service calls succeed');
    xit('routes to error component if service calls fail');
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
