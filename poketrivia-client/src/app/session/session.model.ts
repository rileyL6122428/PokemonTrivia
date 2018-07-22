export class Session {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly lastUpdate: Date
  ) { }
}

export class SessionBuilder {
  private id: string;
  private name: string;
  private lastUpdate: Date;

  setId(id: string): SessionBuilder {
    this.id = id; return this;
  }

  setName(name: string): SessionBuilder {
    this.name = name; return this;
  }

  setLastUpdated(lastUpdate: Date): SessionBuilder {
    this.lastUpdate = lastUpdate; return this;
  }

  build(): Session {
    return new Session(
      this.id,
      this.name,
      this.lastUpdate
    );
  }

}
