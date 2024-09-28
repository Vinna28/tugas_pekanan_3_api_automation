import request from "supertest";
import { baseUrl } from '../data/config.mjs';


export async function regisUser(){
    const payload = {
        "name"     : "Toko Kelontong Bu Ami",
        "email"    : "bu.ami@gmail.com",
        "password" : "password123"
    }
    //send request
    const response = await request (baseUrl)
        .post("/registration") //endpoint
        .send(payload)  //request body
        .set("Content-Type","application/json")  //header

    return (await response)
}