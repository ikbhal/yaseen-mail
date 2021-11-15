const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mailjet = require('node-mailjet')
// .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
.connect('51adbeea591a8cfc93cfad67bc690e3a',
 '3ff8fe7a682c89045372c90c303522f9')

app.get("/", (req, res) => {


    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": "iqbalforall@gmail.com",
                "Name": "Shaik Ikbhal Basha"
            },
            "To": [{
                "Email": "iqbalforall@gmail.com",
                "Name": "Shaik Ikbhal Basha"
            }],
            "Subject": "Read yaseen surah",
            "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
            "HTMLPart": "Read yaseen surah daily"
        }]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    });


res.send("mail send to iqbalforall@gmail.com saying read yaseen");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
