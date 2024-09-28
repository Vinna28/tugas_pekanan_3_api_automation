import  request  from 'supertest';
import  { expect } from 'chai';
import { baseUrl } from '../data/config.mjs';
import { regisUser } from './registration.mjs';
import { createToken } from './login.mjs';

describe('Customers Endpoint Testing', () => {
//   this.timeout(6000);

  it('should return Create New Customer', async () => {
    const payload = {
      "name"       : "Budi",
      "phone"      : "081234567890",
      "address"    : "Bandoeng",
      "description": "Budi anak Pak Edi"
    }

    //Call function to registration 
    regisUser();

    // Send Request
    const response = await request(baseUrl)
    .post('/customers') //endpoint
    .set('Authorization', 'Bearer ' + await createToken()) //set auth
    .send(payload)  //request body
    .set("Content-Type","application/json")  //header

    // Asssertion menggunakan Chai
    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal("Customer berhasil ditambahkan");

  }); 

  it('should return Get List Customers', async () => {
    // Send Request
    const response = await request(baseUrl)
    .get('/customers') //endpoint
    .set('Authorization', 'Bearer ' + await createToken()) //set auth

    // Asssertion menggunakan Chai
    expect(response.status).to.equal(200);
    expect(response.body.data.customers[0]).to.have.property("name", "Budi");
  }); 
});