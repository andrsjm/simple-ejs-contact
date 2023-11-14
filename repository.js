exports.deleteContact = (data, name) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === name){
            data.splice(i, 1)
        }
    }

    return data
}

exports.getData = (data, name) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === name){
            return data[i]
        }
    }

    return null
}

exports.updateData = (data, newContact, oldName) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i]['name'] === oldName){
            data[i] = newContact;
            break;
        }
    }

    return data
}