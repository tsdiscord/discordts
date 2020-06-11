import { Client } from "../Client.ts";

export class RATES {
  public route!: string;
  public resetIn!: number;

  constructor(private client: Client, private payload: any) {
    this.route = this.payload.route;
    this.resetIn = this.payload.resetIn;
  }
}
