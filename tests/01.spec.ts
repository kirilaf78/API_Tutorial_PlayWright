import { test, expect } from "@playwright/test";

test("API request using static body", async ({ request }) => {
  const response = await request.post("/booking", {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "super bowls",
    },
  });

  expect(response).toBeOK();
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.booking.firstname).toBe("Jim");
  expect(responseBody.booking.lastname).toBe("Brown");
  expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
  expect(responseBody.booking.bookingdates.checkout).toBe("2019-01-01");

});
