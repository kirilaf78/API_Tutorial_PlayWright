import { test, expect } from "../fixtures/api_fixtures";
import { BookingApi } from "../api-helpers/booking_api";

test.describe("Booking API operations", () => {
  test("Post API request using dynamic data", async ({
    requestData,
    bookingApi,
  }) => {
    const postResponse = await bookingApi.createBooking(requestData);
    const responseBody = await postResponse.json();
    expect(postResponse).toBeOK();
    expect(responseBody.booking).toMatchObject(requestData);
  });

  test("Should retrieve an existing booking by ID", async ({
    bookingApi,
    createdBookingId,
    requestData,
  }) => {
    const getResponse = await bookingApi.getBooking(createdBookingId);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toMatchObject(requestData);
  });
  test("Get booking by firstname", async ({
    bookingApi,
    requestData,
    createdBookingId: bookingId,
  }) => {
    const getResponse = await bookingApi.getByFirstname(requestData.firstname);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    expect(getResponseBody[0].bookingid).toEqual(bookingId);
  });

  test("Update booking", async ({
    bookingApi,
    createdBookingId,
    requestData,
    validToken,
  }) => {
    const updatedBookingResponse = await bookingApi.updateBooking(
      createdBookingId,
      requestData,
      validToken,
    );
    expect(updatedBookingResponse).toBeOK();
    const updatedBookingResponseBody = await updatedBookingResponse.json();
    expect(updatedBookingResponseBody).toMatchObject(requestData);
  });

  test("Partial update booking", async ({
    bookingApi,
    createdBookingId,
    partialBookingData,
    validToken,
  }) => {
    const updatedBookingResponse = await bookingApi.patchBooking(
      createdBookingId,
      partialBookingData,
      validToken,
    );
    expect(updatedBookingResponse).toBeOK();
    const responseBody = await updatedBookingResponse.json();
    expect(responseBody).toMatchObject(partialBookingData);
  });

  test("Delete booking", async ({
    bookingApi,
    createdBookingId,
    validToken,
  }) => {
    const deleteResponse = await bookingApi.deleteBooking(
      createdBookingId,
      validToken,
    );
    expect(deleteResponse).toBeOK();
    const responseBody = await deleteResponse.text();
    expect(responseBody).toEqual(BookingApi.DELETE_SUCCESS_MSG);
  });
});
