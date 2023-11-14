const express = require('express');
const { readFile, writeFile } = require('./readFile');
const bodyParser = require('body-parser');

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const data = readFile()

    res.render('pages/index', {listOfContacts : data})
})

app.get('/contact', (req, res) => {
    res.render('pages/addContact', {title: 'Add Contact', action: '/contact', contact: null})
})

app.post('/contact', (req, res) => {
    const data = readFile()
    
    const { name, email, phone, address } = req.body;

    const newContact = {
        name,
        email,
        phone,
        address,
    };

    data.push(newContact)

    writeFile(data)

    res.render('pages/index', {listOfContacts : data})
})

app.post('/delete-contact', (req, res) => {
    const data = readFile()
    
    const { contactName } = req.body;

    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === contactName){
            data.splice(i, 1)
        }
    }

    writeFile(data)

    res.redirect('/')
})

app.get('/edit-contact/:name', (req, res) => {
    const data = readFile()
    
    const name = req.params.name
    
    let tempData

    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === name){
            tempData = data[i]
            break;
        }
    }

    tempData['oldName'] = name

    res.render('pages/addContact', {title: 'Edit Contact', action: '/edit-contact', contact: tempData})
})

app.post('/edit-contact', (req, res) => {
    const data = readFile()

    const { oldName, name, email, phone, address } = req.body;

    const newContact = {
        name,
        email,
        phone,
        address,
    };

    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === oldName){
            data[i] = newContact;
            break;
        }
    }  

    writeFile(data)

    res.redirect('/') 
})


app.listen(3000, () => {
    console.log("Running on Port 3000")
})