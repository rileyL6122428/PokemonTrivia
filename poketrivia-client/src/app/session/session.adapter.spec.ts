import { TestBed, inject } from '@angular/core/testing';

import { SessionServiceAdapter } from './session.adapter';
import { Session } from './session.model';

describe('SessionServiceAdapter', () => {

  let adapter: SessionServiceAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionServiceAdapter]
    });

    adapter = TestBed.get(SessionServiceAdapter);
  });

  it('should be created', inject([SessionServiceAdapter], (service: SessionServiceAdapter) => {
    expect(service).toBeTruthy();
  }));

  describe('#mapFromPOJO', () => {
    it('returns a mapped instance of Session', () => {
      const session = adapter.mapFromPOJO({
        id: 'EXAMPLE_ID',
        lastUpdated: 12345678,
        name: 'EXAMPLE_NAME'
      });

      expect(session).toEqual(jasmine.any(Session));
      expect(session.id).toEqual('EXAMPLE_ID');
      expect(session.name).toEqual('EXAMPLE_NAME');
      expect(session.lastUpdate).toEqual(new Date(12345678));
    });
  });
});
