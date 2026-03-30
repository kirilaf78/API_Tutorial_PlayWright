import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

// Экспортируем функцию вместо константы
export function generateBookingData() {
  const fname = faker.person.firstName();
  const lname = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 100, max: 1000 });
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");

  // Возвращаем собранный объект
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