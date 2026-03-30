import { test, expect } from "@playwright/test";
import postBody from "../test-data/post_body.json";

test("API request using json data from file", async ({ request }) => {
  const response = await request.post("/booking", {data: postBody.createBookingData});
  const bookingData = postBody.createBookingData;

  expect(response).toBeOK();
  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.booking).toMatchObject(bookingData);
  

});
