import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomButtonComponent } from './room-button.component';
import { SafeHtmlPipe } from '../../html-interpolation/safe.pipe';
import { Room } from '../../room/room.model';
import { Pokemon } from '../../pokemon/pokemon.model';

describe('RoomButtonComponent', () => {
  let component: RoomButtonComponent;
  let fixture: ComponentFixture<RoomButtonComponent>;
  let buttonElement: HTMLElement;
  let pikachuRoom: Room;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomButtonComponent, SafeHtmlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _setupPikachuRoom();
    _setupComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Color-Inversion-Listeners', () => {
    it('do not add css class "invert-colors" when room-button not hovered and "invertColor" flag false', () => {
      component.manuallyInvertColors = false;
      fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('invert-colors');
    });

    it('append class "invert-colors" when "invertColors" flag is true', () => {
      component.manuallyInvertColors = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('invert-colors');
    });

    it('append class "invert-colors" when room-button hovered', () => {
      buttonElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('invert-colors');
    });

    it('remove class "invert-colors" when mouse leaves room-button', () => {
      buttonElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      buttonElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('invert-colors');
    });
  });

  function _setupPikachuRoom() {
    pikachuRoom = new Room('Pikachu', () => new Pokemon('Pikachu', '', ''));
  }

  function _setupComponent() {
    fixture = TestBed.createComponent(RoomButtonComponent);
    component = fixture.componentInstance;
    component.room = pikachuRoom;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  }
});
