import request from "supertest";
import { baseUrl } from '../data/config.mjs';


export async function createToken(){
    const payload = {
        "email"    : "bu.ami@gmail.com",
        "password" : "password123"
    }
    //send request
    const response = await request (baseUrl)
        .post("/authentications") //endpoint
        .send(payload)  //request body
        .set("Content-Type","application/json")  //header
    
    const token = (await response).body.data.accessToken
    return token
}