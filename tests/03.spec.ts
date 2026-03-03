import { test, expect } from '@playwright/test';
import { generateBookingData } from '../test-data';



test('Post API request using dynamic data', async ({ request}) => {

 const requestData = generateBookingData();
const postResponse = await request.post('/booking', {
  data: requestData,

})
expect(postResponse.status()).toBe(200);
const responseBody = await postResponse.json();
console.log(responseBody);
expect(responseBody.booking).toMatchObject(requestData);


}) 

