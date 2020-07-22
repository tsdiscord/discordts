import { Discord } from "../constant/DISCORD.ts";
import { DiscordTS } from "../constant/DENO.ts";
import { Client } from "../Client.ts";
import { ReqQueue } from "./REQ_QUEUE.ts";
import { Request } from "./REQUEST.ts";

export class ReqHandler {
  private queue = new Map<string, ReqQueue>();

  constructor(private client: Client) {
  }
  async get(route: string): Promise<any> {
    const request: Request = new Request(route, {
      method: "GET",
      client: this.client,
    });
    if (!this.queue.has(route)) {
      this.queue.set(route, new ReqQueue(this.client));
    }
    let res = await this.queue.get(route)?.push(request);
    return res;
  }

  async post(route: string, body?: object | string) {
    const request: Request = new Request(route, {
      method: "POST",
      body,
      client: this.client,
    });
    if (!this.queue.has(route)) {
      this.queue.set(route, new ReqQueue(this.client));
    }
    this.queue.get(route)?.push(request);
  }
}
