// api/booking-api.ts
import { APIRequestContext, APIResponse } from "@playwright/test";

export class BookingApi {
  // Класс принимает контекст запроса от Playwright
  readonly request: APIRequestContext;
  readonly basePath = "/booking";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Метод для создания брони
  async createBooking(data: object): Promise<APIResponse> {
    return await this.request.post(this.basePath, { data });
  }

  // Метод для получения брони
  async getBooking(bookingId: number): Promise<APIResponse> {
    return await this.request.get(`${this.basePath}/${bookingId}`);
  }
  async getByFirstname(fname: string): Promise<APIResponse> {
    return await this.request.get(`${this.basePath}?firstname=${fname}`);
  }

  async getToken(data: object): Promise<APIResponse> {
    return await this.request.post("/auth", { data });
  }

  async updateBooking(
    bookingId: number,
    data: object,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.put(`${this.basePath}/${bookingId}`, {
      headers: { Cookie: `token=${token}`, "Content-Type": "application/json" },
      data: data,
    });
  }
}
