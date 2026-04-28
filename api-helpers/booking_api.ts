// api/booking-api.ts
import { APIRequestContext, APIResponse } from "@playwright/test";

export class BookingApi {
  // Class takes request context from Playwright
  readonly request: APIRequestContext;
  readonly basePath = "/booking";
  static readonly DELETE_SUCCESS_MSG = "Created";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Method to create a booking
  async createBooking(data: object): Promise<APIResponse> {
    return await this.request.post(this.basePath, { data });
  }

  // Method to get a booking
  async getBooking(bookingId: number): Promise<APIResponse> {
    return await this.request.get(`${this.basePath}/${bookingId}`);
  }
  async getByFirstname(fname: string): Promise<APIResponse> {
    return await this.request.get(`${this.basePath}?firstname=${fname}`);
  }

  async getToken(data: object): Promise<APIResponse> {
    return await this.request.post("/auth", { data });
  }

  // 1. Public methods for tests - short and understandable
  async updateBooking(
    bookingId: number,
    data: object,
    token: string,
  ): Promise<APIResponse> {
    return await this._sendModificationRequest("PUT", bookingId, data, token);
  }

  async patchBooking(
    bookingId: number,
    data: object,
    token: string,
  ): Promise<APIResponse> {
    return await this._sendModificationRequest("PATCH", bookingId, data, token);
  }

  // 2. Private method (starts with _) that does all the dirty work
  private async _sendModificationRequest(
    method: "PUT" | "PATCH",
    bookingId: number,
    data: object,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.fetch(`${this.basePath}/${bookingId}`, {
      method: method,
      headers: { Cookie: `token=${token}`, "Content-Type": "application/json" },
      data: data,
    });
  }
  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return await this.request.delete(`${this.basePath}/${bookingId}`, {
      headers: { Cookie: `token=${token}`, "Content-Type": "application/json" },
    });
  }
}
