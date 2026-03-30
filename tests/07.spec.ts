import { test, expect } from "@playwright/test";
import postBody from "../test-data/post_body.json";

test("API request using json data from file", async ({ request }) => {
  const response = await request.post("/booking", {
    data: postBody.createBookingData,
  });
  const bookingData = postBody.createBookingData;

  expect(response).toBeOK();
  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.booking).toMatchObject(bookingData);
  const bookingId = responseBody.bookingid;

  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse).toBeOK();
  const getResponseBody = await getResponse.json();
  console.log(getResponseBody);

  const generateTokenResponse = await request.post("/auth", {
    data: postBody.generateTokenData,
  });
  expect(generateTokenResponse).toBeOK();
  const generateTokenResponseBody = await generateTokenResponse.json();
  console.log(generateTokenResponseBody);
  const token = generateTokenResponseBody.token;

  const updateBookingResponse = await request.put(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}`, "Content-Type": "application/json" },
    data: postBody.updateBooking,
  });
  expect(updateBookingResponse).toBeOK();
  const updateBookingResponseBody = await updateBookingResponse.json();
  console.log(updateBookingResponseBody);
  expect(updateBookingResponseBody).toMatchObject(postBody.updateBooking);
});
