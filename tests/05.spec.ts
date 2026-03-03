import { test, expect } from "@playwright/test";
import { generateBookingData } from "../test-data";
import { BookingApi } from "../api/booking-api";
import { log } from "node:console";

test.describe("Booking API - GET operations", () => {
  let bookingApi: BookingApi;
  let bookingId: number;
  let requestData: ReturnType<typeof generateBookingData>;

  // Выполняется один раз ПЕРЕД тестом: подготавливаем данные в базе
  test.beforeEach(async ({ request }) => {
    requestData = generateBookingData();
    bookingApi = new BookingApi(request);
    const postResponse = await bookingApi.createBooking(requestData);

    // Если сломалось создание, тест на GET даже не начнется
    expect(postResponse).toBeOK();
    const responseBody = await postResponse.json();
    bookingId = responseBody.bookingid;
  });

  // Сам тест проверяет только бизнес-логику GET запроса
  test("Should retrieve an existing booking by ID", async ({ request }) => {
    const getResponse = await bookingApi.getBooking(bookingId);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toMatchObject(requestData);
    //console.log("GET response body:", getResponseBody);
  });
  test("Get booking by firstname", async ({ request }) => {
    const getResponse = await bookingApi.getByFirstname(requestData.firstname);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    //console.log("GET response body:", getResponseBody);
    expect(getResponseBody[0].bookingid).toEqual(bookingId);
  });
});
