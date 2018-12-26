const express = require('express');
const app = express();
const sql = require('sqlite3');
const bodyParser = require('body-parser');

// db.run('CREATE TABLE Card_payments (id INTEGER, card_number TEXT, card_date TEXT, card_cvc TEXT, amount INTEGER, comment TEXT, email TEXT, not_safe INTEGER)');
// db.run('CREATE TABLE Internet_bank_payments' +
//     '(id INTEGER, itn TEXT, bik TEXT, account_number TEXT, for_what TEXT, how_much INTEGER)');
// db.run('CREATE TABLE Request_payment (id INTEGER, itn TEXT, bik TEXT, ' +
//     'account_number TEXT, for_what TEXT, how_much INTEGER, phone TEXT, email TEXT)')

// let db = new sql.Database('./my-bank.db');
// db.serialize(function(){
//     db.each('SELECT id, card_number, card_date, card_cvc, amount, comment, email, not_safe from Card_payments', function(err, row) {
//         console.log(row.id + ' ' + row.card_number + ' ' + row.card_date + ' ' + row.card_cvc  + ' ' +
//             row.amount + ' ' + row.comment + ' ' + row.email + ' ' + row.not_safe);
//     });
//     db.each('SELECT id, itn, bik, account_number, for_what, how_much from Internet_bank_payments', function(err, row) {
//         console.log(row.id + ' ' + row.itn + ' ' + row.bik + ' ' + row.account_number  + ' ' +
//             row.for_what + ' ' + row.how_much);
//     });
//     db.each('SELECT id, itn, bik, account_number, for_what, how_much, phone, email from Request_payment', function(err, row) {
//         console.log(row.id + ' ' + row.itn + ' ' + row.bik + ' ' + row.account_number  + ' ' +
//             row.for_what + ' ' + row.how_much + ' ' + row.phone + ' ' + row.email);
//     });
//     console.log('done');
// });
// db.close();

app.use(express.static('src'));
app.use(bodyParser.json());

function resSend(db, sqlReq, res) {
    db.all(sqlReq, [], (err, rows)=>{
        if(err){
            res.send(err.message);
        }
        console.log(rows);
        res.send(rows);
    });
}

function sendData(req, res, tableName) {
    let db = new sql.Database('./my-bank.db');

    let filter = 'filter' in req.query ? req.query.filter : '';
    let field = 'field' in req.query ? `${tableName}.${req.query.field}` : '';
    let sort = 'sort' in req.query ? req.query.sort : '';

    let sortToSqlReq = sort !== '' && field !== '' ? ` ORDER BY ${field} ${sort.toUpperCase()}` : '';
    let filterToSqlReq = filter !== '' && field !== '' ? ` WHERE ${field} = '${filter}'` : '';
    let sel = `SELECT * FROM ${tableName}`;
    let select = sel + filterToSqlReq + sortToSqlReq;
    console.log(select);
    resSend(db,select, res);
    db.close();
}

app.get('/card-payment', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    sendData(req, res, 'Card_payments');
});

app.get('/internet-bank-payment', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    sendData(req, res, 'Internet_bank_payments');
});

app.get('/request-payment', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    sendData(req, res, 'Request_payment');
});

function insertData(db, sqlReq, data) {
    var stmt = db.prepare(sqlReq);
    stmt.run(data);
    stmt.finalize();
}

function insert(tableName, insertedData, res) {
    let db = new sql.Database('./my-bank.db');
    let maxPaymentsId = 0;
    db.all(`SELECT MAX(${tableName}.id) FROM ${tableName}`, [], (err, rows)=>{
        if(err){
            res.send(err.message);
        }
        if (rows !== undefined) {
            maxPaymentsId = rows[0][`MAX(${tableName}.id)`] === null ? 0 : rows[0][`MAX(${tableName}.id)`];
        }
        console.log('maxPaymentsId');
        console.log(maxPaymentsId);
        insertData(db, `INSERT INTO ${tableName} VALUES(${'?,'.repeat(insertedData.length + 1)
            .substr(0, (insertedData.length + 1) * 2 - 1)})`,
            [parseInt(maxPaymentsId) + 1].concat(insertedData));
    });
    db.close();
}

app.post('/pay', function(req, res){
    res.set("Access-Control-Allow-Origin", "*");
    insert('Card_payments', [req.body.card.number, req.body.card.date, req.body.card.cvc,
        parseInt(req.body.sum.amount), req.body.sum.comment, req.body.sum.email, 0]);
    res.json({success: true});
});

app.post('/create-payment', function(req, res){
    res.set("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    insert('Request_payment', [req.body.itn, req.body.bik, req.body.accountNumber,
        req.body.forWhat, parseInt(req.body.howMuch), req.body.phone, req.body.email]);
    res.json({success: true});
});

app.post('/get-file', function(req, res){
    res.set("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    let data = [req.body.itn, req.body.bik, req.body.accountNumber, req.body.forWhat, parseInt(req.body.howMuch)];
    insert('Internet_bank_payments', data);
    res.json({success: true});
});

app.post('/set-field-not-safe', function(req, res){
    res.set("Access-Control-Allow-Origin", "*");
    let db = new sql.Database('./my-bank.db');
    db.run(`UPDATE Card_payments SET not_safe=${parseInt(req.body.value)} WHERE id=${parseInt(req.body.id)};`);
    db.close();
    res.json({success: true});
});

app.listen(5000, function(err){
    if(err)
    {
        console.log(err);
    }
});
