import { AppLoadService } from './app-load.service';
import { TestBed, async } from '@angular/core/testing';
import { PokemonService } from '../pokemon/pokemon.service';
import { RoomService } from '../room/room.service';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

describe('AppLoadService', () => {

  let appLoadService: AppLoadService;
  let roomServiceMock: any;
  let pokemonServiceMock: any;
  let sessionServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppLoadService,
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', ['fetchAll'])
        },
        {
          provide: PokemonService,
          useValue: jasmine.createSpyObj('pokemonService', ['fetchPokemon'])
        },
        {
          provide: SessionService,
          useValue: jasmine.createSpyObj('sessionService', ['openConnections'])
        }
      ]
    });

    appLoadService = TestBed.get(AppLoadService);
    roomServiceMock = TestBed.get(RoomService);
    pokemonServiceMock = TestBed.get(PokemonService);
    sessionServiceMock = TestBed.get(SessionService);
  });

  describe('#fetchAllResources', () => {

    let fetchRoomsObserver: Observer<boolean>;
    let fetchPokemonObserver: Observer<boolean>;
    let openSessionConnectionsObserver: Observer<boolean>;

    beforeEach(() => {
      _stubFetchAllRooms();
      _stubFetchAllPokemon();
      _stubOpenSessionConnections();
    });

    it('delegates calls to necessary services to fetch resources required on app load', () => {
      appLoadService.fetchAllResources().subscribe();
      expect(roomServiceMock.fetchAll).toHaveBeenCalled();
      expect(pokemonServiceMock.fetchPokemon).toHaveBeenCalled();
      expect(sessionServiceMock.openConnections).toHaveBeenCalled();
    });

    it('emits true when all resource requests return true', async(() => {
      appLoadService
        .fetchAllResources()
        .subscribe((successful) => {
          expect(successful).toBe(true);
        });

      [
        fetchRoomsObserver,
        fetchPokemonObserver,
        openSessionConnectionsObserver
      ]
        .forEach(observer => {
          observer.next(true);
          observer.complete();
        });
    }));

    it('emits false when all observers false', async(() => {
      appLoadService
        .fetchAllResources()
        .subscribe((successful) => {
          expect(successful).toBe(false);
        });

      [
        fetchRoomsObserver,
        fetchPokemonObserver,
        openSessionConnectionsObserver
      ]
        .forEach(observer => {
          observer.next(false);
          observer.complete();
        });
    }));

    it('emits false when some observers are false', async(() => {
      appLoadService
      .fetchAllResources()
      .subscribe((successful) => {
        expect(successful).toBe(false);
      });

      fetchRoomsObserver.next(false);
      fetchRoomsObserver.complete();
      fetchPokemonObserver.next(true);
      fetchPokemonObserver.complete();
      openSessionConnectionsObserver.next(true);
      openSessionConnectionsObserver.complete();
    }));

    function _stubFetchAllRooms() {
      roomServiceMock.fetchAll.and.returnValue(
        new Observable((observer) => fetchRoomsObserver = observer)
      );
    }

    function _stubFetchAllPokemon() {
      pokemonServiceMock.fetchPokemon.and.returnValue(
        new Observable((observer) => fetchPokemonObserver = observer)
      );
    }

    function _stubOpenSessionConnections() {
      sessionServiceMock.openConnections.and.returnValue(
        new Observable((observer) => openSessionConnectionsObserver = observer)
      );
    }
  });

});
