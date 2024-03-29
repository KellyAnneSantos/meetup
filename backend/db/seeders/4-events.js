"use strict";

const { Event } = require("../models");

const events = [
  {
    groupId: 1,
    venueId: 1,
    name: "Event One",
    description: "test",
    type: "Online",
    capacity: 100,
    price: 1.0,
    startDate: "2023-01-01",
    endDate: "2023-01-02",
  },
  {
    groupId: 2,
    venueId: 2,
    name: "Event Two",
    description: "test",
    type: "In person",
    capacity: 200,
    price: 2.0,
    startDate: "2023-01-03",
    endDate: "2023-01-04",
  },
  {
    groupId: 3,
    venueId: 3,
    name: "Event Three",
    description: "test",
    type: "Online",
    capacity: 300,
    price: 3.0,
    startDate: "2023-01-05",
    endDate: "2023-01-06",
  },
  {
    groupId: 4,
    venueId: 4,
    name: "Event Four",
    description: "test",
    type: "In person",
    capacity: 400,
    price: 4.0,
    startDate: "2023-01-07",
    endDate: "2023-01-08",
  },
  {
    groupId: 5,
    venueId: 5,
    name: "Event Five",
    description: "test",
    type: "Online",
    capacity: 500,
    price: 5.0,
    startDate: "2023-01-09",
    endDate: "2023-01-10",
  },
  {
    groupId: 6,
    venueId: 6,
    name: "Event Six",
    description: "test",
    type: "In person",
    capacity: 600,
    price: 6.0,
    startDate: "2023-01-11",
    endDate: "2023-01-12",
  },
  {
    groupId: 7,
    venueId: 7,
    name: "Event Seven",
    description: "test",
    type: "Online",
    capacity: 700,
    price: 7.0,
    startDate: "2023-01-13",
    endDate: "2023-01-14",
  },
  {
    groupId: 8,
    venueId: 8,
    name: "Event Eight",
    description: "test",
    type: "In person",
    capacity: 800,
    price: 8.0,
    startDate: "2023-01-15",
    endDate: "2023-01-16",
  },
  {
    groupId: 9,
    venueId: 9,
    name: "Event Nine",
    description: "test",
    type: "Online",
    capacity: 900,
    price: 9.0,
    startDate: "2023-01-17",
    endDate: "2023-01-18",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Event.bulkCreate(events, {
      validate: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
