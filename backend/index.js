import express from "express"
import cors from "cors"
import mysql from "mysql"

const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YES",
    database: "drone_dispatch"
})

app.get("/", (req,res) => {
    res.json("hello this is the backend")
})

app.get("/product", (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in database operation");
        } else {
            res.json(result);
        }
    });
});

app.post("/product", (req, res) => {
    const { barcode, pname, weight } = req.body;

    const q = "CALL add_product(?, ?, ?)";

    db.query(q, [barcode, pname, weight], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    });
})

app.delete("/product", (req, res) => {
    const { barcode } = req.body;
    const q = "CALL remove_product(?)"

    db.query(q, barcode, (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    })
})

app.get("/employee", (req, res) => {
    const q = "SELECT * FROM employees";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in database operation");
        } else {
            res.json(result);
        }
    });
});

app.get("/customer", (req, res) => {
    const q = "SELECT * FROM customers";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in database operation");
        } else {
            res.json(result);
        }
    });
});

app.post("/customer", (req, res) => {
    const { uname, first_name, last_name, address, bdate, rating, credit } = req.body;

    const q = "CALL add_customer(?, ?, ?, ?, ?, ?, ?)";

    db.query(q, [uname, first_name, last_name, address, bdate, rating, credit], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    });
})

app.delete("/customer", (req, res) => {
    const { uname } = req.body;
    const q = "CALL remove_customer(?)"

    db.query(q, uname, (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    })
})

app.get("/drone_pilot", (req, res) => {
    const q = "SELECT * FROM drone_pilots"; 
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in database operation");
        } else {
            res.json(result);
        }
    });
});

app.post("/drone_pilot", (req, res) => {
    const { uname, first_name, last_name, address, bdate, taxID, service, salary, licenseID, experience } = req.body;

    const q = "CALL add_drone_pilot(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(q, [uname, first_name, last_name, address, bdate, taxID, service, salary, licenseID, experience], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    });
})

app.delete("/drone_pilot", (req, res) => {
    const { uname } = req.body;
    const q = "CALL remove_drone_pilot(?)"

    db.query(q, uname, (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    })
})

app.get("/drone", (req, res) => {
    const q = "SELECT * FROM drones"; 
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in database operation");
        } else {
            res.json(result);
        }
    });
});

app.post("/drone", (req, res) => {
    const { storeID, droneTag, capacity, remainingTrips, pilot } = req.body;

    const q = "CALL add_drone(?, ?, ?, ?, ?)";

    db.query(q, [storeID, droneTag, capacity, remainingTrips, pilot], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    });
})

app.delete("/drone", (req, res) => {
    const { storeID, droneTag } = req.body;
    const q = "CALL remove_drone(?, ?)"

    db.query(q, [storeID, droneTag], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error calling stored procedure add_product.");
        }
        return res.json(result);
    })
})

app.post("/swap_drone_control", (req, res) => {
    const { incomingPilot, outgoingPilot } = req.body;

    const q = "CALL swap_drone_control(?, ?)";

    db.query(q, [incomingPilot, outgoingPilot], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure swap_drone_control.");
        }
        return res.json(result);
    });
});

app.post("/increase_customer_credits", (req, res) => {
    const { uname, amount } = req.body;

    const q = "CALL increase_customer_credits(?, ?)";

    db.query(q, [uname, amount], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure increase_customer_credits.");
        }
        return res.json({ message: "Customer credits increased successfully." });
    });
});

app.post("/repair_refuel_drone", (req, res) => {
    const { drone_store, drone_tag, refueled_trips } = req.body;

    const q = "CALL repair_refuel_drone(?, ?, ?)";

    db.query(q, [drone_store, drone_tag, refueled_trips], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure increase_customer_credits.");
        }
        return res.json({ message: "Customer credits increased successfully." });
    });
});

app.get("/orders", (req, res) => {
    const q = "SELECT * FROM orders";
    db.query(q, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching orders from database");
        } else {
            res.json(result);
        }
    });
});

app.get("/order_lines", (req, res) => {
    const { orderID } = req.params;
    const q = "SELECT * FROM order_lines";
    db.query(q, [orderID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching order lines from database");
        } else {
            res.json(result);
        }
    });
});

app.post("/begin_order", (req, res) => {
    const { orderID, sold_on, purchased_by, carrier_store, carrier_tag, barcode, price, quantity } = req.body;
    const q = "CALL begin_order(?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(q, [orderID, sold_on, purchased_by, carrier_store, carrier_tag, barcode, price, quantity], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).send("Error executing stored procedure begin_order: " + err.message);
        } else {
            res.json(result);
        }
    });
});



app.post("/add_order_line", (req, res) => {
    const { orderID, barcode, price, quantity } = req.body;
    const q = "CALL add_order_line(?, ?, ?, ?)";

    db.query(q, [orderID, barcode, price, quantity], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure add_order_line.");
        } else {
            res.json(result);
        }
    });
});

app.post("/deliver_order", (req, res) => {
    const { orderID } = req.body;
    const q = "CALL deliver_order(?)";

    db.query(q, [orderID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure deliver_order.");
        } else {
            res.json(result);
        }
    });
});


app.delete("/cancel_order", (req, res) => {
    const { orderID } = req.body;
    const q = "CALL cancel_order(?)";

    db.query(q, [orderID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error executing stored procedure cancel_order.");
        } else {
            res.json(result);
        }
    });
});

app.get("/roles", (req, res) => {
    db.query("SELECT * FROM role_distribution", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch role distribution");
        } else {
            res.json(results);
        }
    });
});

app.get("/customer-credits", (req, res) => {
    db.query("SELECT * FROM customer_credit_check", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch customer credits and status");
        } else {
            res.json(results);
        }
    });
});

app.get("/drone-traffic", (req, res) => {
    db.query("SELECT * FROM drone_traffic_control", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch drone traffic control");
        } else {
            res.json(results);
        }
    });
});

app.get("/popular-products", (req, res) => {
    db.query("SELECT * FROM most_popular_products", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch popular products");
        } else {
            res.json(results);
        }
    });
});

app.get("/pilot-roster", (req, res) => {
    db.query("SELECT * FROM drone_pilot_roster", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch drone pilot roster");
        } else {
            res.json(results);
        }
    });
});

app.get("/store-sales", (req, res) => {
    db.query("SELECT * FROM store_sales_overview", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch store sales overview");
        } else {
            res.json(results);
        }
    });
});

app.get("/order-in-progress", (req, res) => {
    db.query("SELECT * FROM orders_in_progress", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to fetch store sales overview");
        } else {
            res.json(results);
        }
    });
});


app.listen(8802, ()=> {
    console.log("connected to backed")
})