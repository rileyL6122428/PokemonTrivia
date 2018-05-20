export class SessionConfig {
  registerSessionEndpoint: string;

  stomp: {
    url: string,
    heartbeat_in: number,
    heartbeat_out: number,
    reconnect_delay: number,
    debug: boolean
  };
}
