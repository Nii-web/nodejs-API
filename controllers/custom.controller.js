const Customer = require("../models/customer.model.js");

//creting and saving a new customer
exports.create = (req, res) => {
  // Validating request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Creating a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Saving Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Customer."
      });
    else res.send(data);
  });
};

//Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
      if (err)
       res.status(500).send({
           message:
             err.message|| "An error occursed while retrieving customers"
       });
      else res.send(data);
  })
};

//finding a single customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if(err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Did not find customer with id ${req.params.customerId}.`
                });

            }else{
                res.status(500).send({
                    message: "Error retrieving customer with if" + req.params.customerId
                });
            }
        }else res.send(data);
    });

};

//update a customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Did not find Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );

};

//Deleting a customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Did not find Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });

};

//Deleting all customers from the database
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });

};
