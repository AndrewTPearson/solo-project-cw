// global imports
const request = require("supertest");

// local imports
const mongoose = require("../db");
const app = require("../index");
const Event = require("../models/event_model");

/* Connecting to the DB before each test. */
beforeAll(async () => {
  await Event.deleteMany({});
});

/* Connecting DB connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});

/* TEST CASE | HAPPY PATH: Get all events from DB, return nothing */
// describe("HAPPY PATH: Get all events from DB, return nothing", () => {
//   it("returns all events, currently none", async () => {
//     const res = await request(app).get("/events");
//     expect(res.statusCode).toBe(201);
//     expect(res.body.length).toBe(0);
//   })
// });

/* TEST CASE | HAPPY PATH: Add an event to DB correctly */
describe("HAPPY PATH: Add an event to DB correctly", () => {
  it("creates first event", async () => {
    const res = await request(app).post("/add-event").send({
      owner: "64415e6c97483b215fd4c3ee",
      title: "Yoga",
      description: "Join us for a peaceful morning of yoga in the park. All levels welcome!",
      date: "2023-05-01T10:00:00.000Z",
      location: "Central Park, New York",
      coordinates: [
        40.785091,
        -73.968285
      ],
      image: "event1-mock_bjhoxl.jpg",
      limitAttendees: 20,
      invitees: [],
      hideFrom: [],
      joined: [],
      announcements: [],
      canceled: false,
      active: true,
      liked: false
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Yoga");
  });
});

