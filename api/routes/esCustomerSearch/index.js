const express = require("express");
const router = express.Router();
const multer = require("multer")();
const data = require("./index.json");

router.post("/", multer.none(), function (req, res, next) {
	const request = JSON.parse(req.body.data);
	
	const customerName = request.customerName;
	const pageNumber = request.pageNumber;
	const pageSize = request.pageSize;

	const startingValue = pageNumber * pageSize;
	const endingValue = (pageNumber + 1) * pageSize;

	const filteredData = data.customer.filter((eachCustomer) =>
		eachCustomer.customerName
			.toLowerCase()
			.includes(customerName.toLowerCase())
	);
	res.send({
		total: filteredData.length,
		customer: filteredData.slice(startingValue, endingValue),
	});
});

module.exports = router;
