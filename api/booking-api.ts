// api/booking-api.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class BookingApi {
  // Класс принимает контекст запроса от Playwright
  readonly request: APIRequestContext;
  readonly basePath = '/booking';

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
}