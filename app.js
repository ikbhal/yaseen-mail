const express = require("express");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCqJyBoPLXy4CpotZPOsSKjK4rKJTCAbgE",
  authDomain: "ikbhal-cb53f.firebaseapp.com",
  projectId: "ikbhal-cb53f"
});

var db = firebase.firestore();

const app = express();

app.use(express.json());
const port = process.env.PORT || 3001;
const mailjet = require('node-mailjet')
// .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
.connect('51adbeea591a8cfc93cfad67bc690e3a',
 '3ff8fe7a682c89045372c90c303522f9');

app.get('/list', (req, res) => {

    db.collection("yasee-mail").get().then((querySnapshot) => {
        var result = {};
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            result[doc.id] = doc.data();
        });

        res.send({body: result, status: "ok"});
    });
    // res.send("yaseen list from firstore soon");
});
app.get('/done', (req, res) => {
    var readYaseenFlag = req.query.readYaseen ==='true';
    var sdate = req.query.sdate || new Date().toISOString().slice(0, 10);
    db.collection("yasee-mail").add({
        
        // date: new Date().now(),
        sdate: sdate,
        read_yaseen: readYaseenFlag
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    res.send('done');
});

app.get('/firestore_test', (req, res) => {

    db.collection("yasee-mail").get().then((querySnapshot) => {
        var result = {};
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            result[doc.id] = doc.data();
        });
        res.json({body:result, status:"ok"});
    });
    // res.send("firestore test");
});
app.post('/mail_status', (req, res) => {
    var msg = req.body.msg || 'default msg: Namaaz daily 5 times with jamaat';
    var to = req.body.to || 'iqbalforall@gmail.com';
    sendMail(to, msg);
    res.send("mail status to: " + to + ", msg:" + msg);
});
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
