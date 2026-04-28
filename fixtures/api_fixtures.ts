// fixtures/api-fixtures.ts
import { test as base, expect } from "@playwright/test";
import { BookingApi } from "../api-helpers/booking_api";
import {
  generateBookingData,
  generatePartialBookingData,
  generateTokenData,
} from "../test_data";

// 1. Describe the types of what we will add to the test
type ApiFixtures = {
  bookingApi: BookingApi;
  requestData: ReturnType<typeof generateBookingData>;
  createdBookingId: number;
  partialBookingData: ReturnType<typeof generatePartialBookingData>;
  validToken: string;
};

// 2. Expanded test with our fixtures
export const test = base.extend<ApiFixtures>({
  // Fixture 1: Initialize API client
  bookingApi: async ({ request }, use) => {
    const api = new BookingApi(request);
    await use(api); // Pass the client to the test
  },

  // Fixture 2: Generate random data
  requestData: async ({}, use) => {
    const data = generateBookingData();
    await use(data); // Pass the data to the test
  },

  // Fixture 3: Most interesting - create a booking!
  // Note that it uses two previous fixtures
  createdBookingId: async ({ bookingApi, requestData, validToken }, use) => {
    const postResponse = await bookingApi.createBooking(requestData);
    expect(postResponse).toBeOK(); // Check that creation was successful

    const responseBody = await postResponse.json();
    const bookingId = responseBody.bookingid;

    // Pass the ready ID to the test
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
    await use(data); // Pass the data to the test
  },
  validToken: async ({ bookingApi }, use) => {
    const tokenResponse = await bookingApi.getToken(generateTokenData());
    expect(tokenResponse).toBeOK(); // Fail beautifully if the token is not issued
    const tokenResponseBody = await tokenResponse.json();
    await use(tokenResponseBody.token); // Pass the clean token string to the test
  },
});

// Export expect to avoid importing it separately in tests
export { expect };
