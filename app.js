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

    res.render('pages/index', {listOfContacts : data, massage: null})
})

app.get('/contact', (req, res) => {
    res.render('pages/addContact', {title: 'Add Contact', action: '/contact', contact: null})
})

app.post('/contact', (req, res) => {
    const data = readFile()
    
    const newContact = parseContact(req)

    data.push(newContact)

    writeFile(data)

    res.redirect('/')
})

app.post('/delete-contact', (req, res) => {
    const data = readFile()
    
    const contact = parseContact(req)

    const newData = deleteContact(data, contact.name)

    writeFile(newData)

    res.redirect('/')
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

    res.redirect('/') 
})


app.listen(3000, () => {
    console.log("Running on Port 3000")
})