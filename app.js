const express = require('express');
const { readFile, writeFile } = require('./readFile');
const bodyParser = require('body-parser');
const { parseContact, parsePathName, parseOldName, parseName } = require('./parser');
const { deleteContact, getData, updateData } = require('./repository');

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const data = readFile()

    res.render('pages/index', {listOfContacts : data, message: null})
})

app.get('/contact', (req, res) => {
    res.render('pages/addContact', {title: 'Add Contact', action: '/contact', contact: null})
})

app.post('/contact', (req, res) => {
    const data = readFile()
    
    const newContact = parseContact(req)

    data.push(newContact)

    writeFile(data)

    const successMessage = 'Contact added successfully!';
    res.render('pages/index', { listOfContacts: data, message: successMessage });
})

app.post('/delete-contact', (req, res) => {
    const data = readFile()
    
    const contact = parseContact(req)

    const newData = deleteContact(data, contact.name)

    writeFile(newData)

    const successMessage = 'Contact deleted successfully!';
    res.render('pages/index', { listOfContacts: data, message: successMessage });
})

app.get('/edit-contact/:name', (req, res) => {
    const data = readFile()
    
    const name = parsePathName(req)
    
    let tempData = getData(data, name)

    tempData['oldName'] = name

    res.render('pages/addContact', {title: 'Edit Contact', action: '/edit-contact', contact: tempData})
})

app.post('/edit-contact', (req, res) => {
    const data = readFile()

    const newContact = parseContact(req)

    const oldName = parseOldName(req)

    const newData = updateData(data, newContact, oldName)

    writeFile(newData)

    const successMessage = 'Contact edited successfully!';
    res.render('pages/index', { listOfContacts: data, message: successMessage });
})

app.listen(3000, () => {
    console.log("Running on Port 3000")
})