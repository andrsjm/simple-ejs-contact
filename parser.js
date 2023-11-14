exports.parseContact = (req) => {
    const { name, email, phone, address } = req.body;

    const data = {
        name,
        email,
        phone,
        address,
    };

    return data
}

exports.parseOldName = (req) => {
    return req.body.oldName
}

exports.parsePathName = (req) => {
    return req.params.name
}