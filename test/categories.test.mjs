import  request  from 'supertest';
import  { expect } from 'chai';
import { baseUrl } from '../data/config.mjs';
import { regisUser } from './registration.mjs';
import { createToken } from './login.mjs';

describe('Categories Endpoint Testing', () => {
  // this.timeout(6000);
  it('should return Create New Category', async () => {
    const payload = {
      "name" : "makanan ringan 1",
      "description" : "makanan ringan dari indofood"
    }

    //Call function to registration
    regisUser();

    // Send Request
    const response = await request(baseUrl)
    .post('/categories') //endpoint
    .set('Authorization', 'Bearer ' + await createToken()) //set auth
    .send(payload)  //request body
    .set("Content-Type","application/json")  //header

    // Asssertion menggunakan Chai
    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal("Category berhasil ditambahkan");

  }); 

  it('should return Get List Categories', async () => {
    // Send Request
    const response = await request(baseUrl)
    .get('/categories') //endpoint
    .set('Authorization', 'Bearer ' + await createToken()) //set auth

    // Asssertion menggunakan Chai
    expect(response.status).to.equal(200);
    expect(response.body.data.categories[0]).to.have.property("name", "makanan ringan 1");
  }); 
});