// fixtures/api-fixtures.ts
import { test as base, expect } from "@playwright/test";
import { BookingApi } from "../api-helpers/booking_api";
import {
  generateBookingData,
  generatePartialBookingData,
  generateTokenData,
} from "../test_data";

// 1. Описываем типы того, что мы добавим в тест
type ApiFixtures = {
  bookingApi: BookingApi;
  requestData: ReturnType<typeof generateBookingData>;
  createdBookingId: number;
  partialBookingData: ReturnType<typeof generatePartialBookingData>;
  validToken: string;
};

// 2. Расширяем базовый тест нашими фикстурами
export const test = base.extend<ApiFixtures>({
  // Фикстура 1: Инициализация API клиента
  bookingApi: async ({ request }, use) => {
    const api = new BookingApi(request);
    await use(api); // Передаем клиент в тест
  },

  // Фикстура 2: Генерация случайных данных
  requestData: async ({}, use) => {
    const data = generateBookingData();
    await use(data); // Передаем данные в тест
  },

  // Фикстура 3: Самое интересное — создаем бронирование!
  // Обратите внимание, что она сама использует две предыдущие фикстуры
  createdBookingId: async ({ bookingApi, requestData, validToken }, use) => {
    const postResponse = await bookingApi.createBooking(requestData);
    expect(postResponse).toBeOK(); // Проверяем, что создание прошло успешно

    const responseBody = await postResponse.json();
    const bookingId = responseBody.bookingid;

    // Передаем готовый ID в тест
    await use(bookingId);
    const deleteResponse = await bookingApi.deleteBooking(
      bookingId,
      validToken,
    );
    if (!deleteResponse.ok()) {
      console.log(
        `Cleanup note: Booking ${bookingId} was already deleted or not found.`,
      );
    }
  },

  partialBookingData: async ({}, use) => {
    const data = generatePartialBookingData();
    await use(data); // Передаем данные в тест
  },
  validToken: async ({ bookingApi }, use) => {
    const tokenResponse = await bookingApi.getToken(generateTokenData());
    expect(tokenResponse).toBeOK(); // Падаем красиво, если токен не выдался
    const tokenResponseBody = await tokenResponse.json();
    await use(tokenResponseBody.token); // Отдаем чистую строку токена в тест
  },
});

// Экспортируем expect, чтобы не импортировать его отдельно в тестах
export { expect };
