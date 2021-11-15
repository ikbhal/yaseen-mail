const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mailjet = require('node-mailjet')
// .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
.connect('51adbeea591a8cfc93cfad67bc690e3a',
 '3ff8fe7a682c89045372c90c303522f9')

app.get('/mail', (req,res) =>{
    var msg = req.query.msg || 'Jikr Allah 1000 times daily';
    var to= req.query.to || 'iqbalforall@gmail.com';
    sendMail(to, msg);
    res.send("send mail msg:" + msg + " to iqbalforall@gmail.com")
});

function sendMail(to, msg){
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": "iqbalforall@gmail.com",
                "Name": "Shaik Ikbhal Basha"
            },
            "To": [{
                "Email": to||"iqbalforall@gmail.com",
                "Name": "user"
            }],
            "Subject": "Read yaseen surah",
            "TextPart": msg|| 'default yaseen mail messager: read yaseen daily',
            "HTMLPart": "Read yaseen surah daily"
        }]
    });
    request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    });
}

app.get("/", (req, res) => {
    sendMail('iqbalforall@gmail.com', 'Read Quran daily ' + Date.now());
    res.send("mail send to iqbalforall@gmail.com saying read yaseen , date now is " + Date.now());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
