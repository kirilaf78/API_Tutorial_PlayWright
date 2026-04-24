// api/booking-api.ts
import { APIRequestContext, APIResponse } from "@playwright/test";

export class BookingApi {
  // Класс принимает контекст запроса от Playwright
  readonly request: APIRequestContext;
  readonly basePath = "/booking";
  static readonly DELETE_SUCCESS_MSG = "Created";

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

  // 1. Публичные методы для тестов — короткие и понятные
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

  // 2. Приватный метод (начинается с _), который делает всю грязную работу
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
