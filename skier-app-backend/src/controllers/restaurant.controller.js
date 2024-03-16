const Restaurant = require("../models/restaurant.model");

// Get all Restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({});
    return res.json({ status: "ok", restaurant });
  } catch (error) {
    return res.json({ status: "error", error: "No restaurants found" });
  }
};

// Create a new restaurant
const createRestaurant = async (req, res) => {
  const { name, loc } = req.body;

  if (!name || !loc)
    return res.json({
      status: "error",
      error: "Please provide both name and location",
    });

  try {
    const newRestaurant = Restaurant.create({
      name: req.body.name,
      loc: req.body.loc,
    });
    return res.json({ status: "ok", error: "Added restaurant successfully" });
  } catch (error) {
    return res.json({
      status: "error",
      error: "Unable to save a new restaurant",
    });
  }
};

module.exports = { getAllRestaurants, createRestaurant };
