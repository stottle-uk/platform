import { TestBed } from '@angular/core/testing';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { SignalrService } from './signalr.service';
import { SIGNALR_CONNECTION_BULDER } from './tokens';

describe('SignalrService', () => {
  let signalrService: SignalrService;
  let hubConnectionBuilder: HubConnectionBuilder;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SIGNALR_CONNECTION_BULDER,
          useFactory: () => {
            return new HubConnectionBuilder();
          }
        }
      ]
    }));

  beforeEach(() => {
    signalrService = TestBed.get(SignalrService);
    hubConnectionBuilder = TestBed.get(SIGNALR_CONNECTION_BULDER);
  });

  it('should be created', () => {
    expect(signalrService).toBeTruthy();
  });

  it('should start connection', () => {
    const build = jest.spyOn(hubConnectionBuilder, 'build').mockReturnValue({});

    signalrService
      .start({
        url: 'url',
        options: {}
      })
      .subscribe(
        connetion => {
          console.log('sdfsdfsd');

          expect(connetion).toBeTruthy();
          // expect(build).toHaveBeenCalled();
        },
        error => {
          console.log(error);
        }
      );
  });
});
