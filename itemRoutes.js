"use strict"

const express = require("express")

const router = new express.Router();

let { items } = require("./fakeDb.js");



/** Returns shopping list in JSON: 
 * { items: [
 *      {name: "popsicle", price: 1.45},
 *      {name: "cheerios", price: 3.40},
 * ]}
 */
 router.get("/", function(req, res, next){

    return res.json({ items });
});



/** Accepts new item in JSON, pushes to shopping list, returns added item:
 *    input: {name: "popsicle", price: 1.45}
 *    output: {added: {name: "popsicle", price: 1.45}}
 */
router.post("/", function(req, res, next){

    items.push(req.body);

    return res.json({ added: req.body });
});


/**  */
router.get("/:name", function(req, res, next){

});


/**  */
router.patch("/:name", function(req, res, next){

});


/**  */
router.delete("/:name", function(req, res, next){

});


module.exports = router;