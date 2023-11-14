const fs = require('fs')

exports.readFile = () => {
    try {
        // Membaca file secara synchronous dan mengembalikan hasil parsing JSON
        const data = fs.readFileSync('./data/data.json', 'utf-8');
        return JSON.parse(data)
    } catch (err) {
        // Menangani kesalahan dengan mencetak pesan dan mengembalikan array kosong
        console.error('Terjadi kesalahan dalam membaca file:', err.message);
        return [];
    }
}

exports.writeFile = (data) => {
    fs.writeFileSync('./data/data.json', JSON.stringify(data))
}