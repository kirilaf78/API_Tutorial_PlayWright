import { test, expect } from "../fixtures/api_fixtures";

test.describe("Booking API operations", () => {
  test("Post API request using dynamic data", async ({
    requestData,
    bookingApi,
  }) => {
    const postResponse = await bookingApi.createBooking(requestData);
    const responseBody = await postResponse.json();
    expect(postResponse).toBeOK();
    //console.log(responseBody);
    expect(responseBody.booking).toMatchObject(requestData);
  });

  // Сам тест проверяет только бизнес-логику GET запроса
  test("Should retrieve an existing booking by ID", async ({
    bookingApi,
    createdBookingId,
    requestData,
  }) => {
    const getResponse = await bookingApi.getBooking(createdBookingId);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toMatchObject(requestData);
    //console.log("GET response body:", getResponseBody);
  });
  test("Get booking by firstname", async ({
    bookingApi,
    requestData,
    createdBookingId: bookingId,
  }) => {
    const getResponse = await bookingApi.getByFirstname(requestData.firstname);
    expect(getResponse).toBeOK();

    const getResponseBody = await getResponse.json();
    //console.log("GET response body:", getResponseBody);
    expect(getResponseBody[0].bookingid).toEqual(bookingId);
  });
});
