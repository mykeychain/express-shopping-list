"use strict"

const express = require("express");
const {NotFoundError} = require("./expressError");
const router = new express.Router();

let {items} = require("./fakeDb.js");

/** Returns shopping list in JSON:
 * { items: [
 *      {name: "popsicle", price: 1.45},
 *      {name: "cheerios", price: 3.40},
 * ]}
 */
router.get("/", function (req, res, next) {

  return res.json({ items });
});

/** Accepts new item in JSON, pushes to shopping list, returns added item:
 *    input: {name: "popsicle", price: 1.45}
 *    output: {added: {name: "popsicle", price: 1.45}}
 */
router.post("/", function (req, res, next) {

  //don't blindly push to db
  items.push(req.body);

  return res.status(201).json({added: req.body});
});

/**
 * Returns an individual item object:
 * {name: "popsicle", "price": 1.45}
 */
router.get("/:name", function (req, res, next) {

  let item = items[findItemIndex(req.params.name)];
  return res.json(item);

});

/**
 * Accepts new item in JSON, pushes to shopping list, returns added item:
 *    input: {name: "new popsicle", price: 2.45}
 *    output: {updated: {name: "new popsicle", price: 2.45}}
 */
router.patch("/:name", function (req, res, next) {
  let itemIndex = findItemIndex(req.params.name);
  items[itemIndex] = req.body;

  return res.json({
    updated: items[itemIndex]
  })
});

/**
 * deletes an item with the name from the shopping list
 */
router.delete("/:name", function (req, res, next) {
  let itemIndex = findItemIndex(req.params.name);
  items.splice(itemIndex, 1);

  return res.json({
    message: "Deleted"
  })
});

module.exports = router;

/*
 * Helper function to return the index of an item on the shopping lsit
 * given the name of the item
 */
function findItemIndex(name) {

  for (let itemIndex in items) {
    let values = Object.values(items[itemIndex]);

    if (values.includes(name)) {
      return itemIndex;
    }
  }

  throw new NotFoundError("Item not found");
}
