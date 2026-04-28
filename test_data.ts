import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";


export function generateBookingData() {
  const fname = faker.person.firstName();
  const lname = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 100, max: 1000 });
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");

  // Return the compiled object
  return {
    firstname: fname,
    lastname: lname,
    totalprice: totalPrice,
    depositpaid: true,
    bookingdates: {
      checkin: checkInDate,
      checkout: checkOutDate,
    },
    additionalneeds: "super bowls",
  };
}

export function generateTokenData() {
  return {
    username: "admin",
    password: "password123",
  };
}

export function generatePartialBookingData() {
  return {
    firstname: faker.person.firstName(),
  };
}
