require("./db/conn");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const Contact = require("./models/contact");
const Token = require("./models/token");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get("/contact", async (req, res) => {
    const token = req.headers["token"];
    const tokenData = await Token.find({ token: token });
    if (tokenData.length == 0) {
        res.send({ data: "No Data Found", message: "No Api Token" });
    } else {
        const contactData = await Contact.find();
        res.send({ data: contactData, message: "Success" });
    }
})

app.post("/contact", async (req, res) => {
    const token = req.headers["token"];
    const contactData = req.body;
    const tokenData = await Token.find({ token: token });
    if (token) {
        if (tokenData.length == 0) {
            res.send({ data: "No Data Added", message: "Invalid Api Token" });
        } else {
            if (contactData) {
                const contactDataRes = new Contact(contactData);
                contactDataRes.save().then(() => {
                    res.send({ data: contactDataRes, message: "Success" });
                }).catch((e) => {
                    res.send({ data: e, message: "Failed" });
                })
            } else {
                res.send({ data: "No Data Added", message: "Provide Some Data" });
            }
        }
    } else {
        res.send({ data: "No Data Added", message: "Please Provide Api Token" });
    }
})

app.delete("/contact", async (req, res) => {
    const token = req.headers["token"];
    const _id = req.headers["id"];
    const tokenData = await Token.find({ token: token });
    if (token) {
        if (tokenData.length == 0) {
            res.send({ data: "No Data Deleted", message: "Invalid Api Token" });
        } else {
            if (_id) {
                try {
                    const deleteDataRes = await Contact.deleteMany({ _id });
                    res.send({ data: deleteDataRes, message: "Success" });
                } catch (e) {
                    res.send({ data: e, message: "Failed" });
                }
            }else{
                res.send({ data: "No Data Deleted", message: "Provide Some Id" });
            }
        }
    } else {
        res.send({ data: "No Data Added", message: "Please Provide Api Token" });
    }
})


app.listen(port, () => {
    console.log("Listening");
})