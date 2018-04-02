const fs = require('fs');
const path = "messages";
let data = [];

getFiles = () => {
    return new Promise((resolve, reject) => {

        fs.readdir(path, (err, files) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

readFileContent = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path + '/' + file, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(result));
            }
        })
    })
};

const db = {
    addMessage: (message) => {
        const messageDate = new Date().toISOString();
        message.datetime = messageDate;
        data.push(message);
        data.splice(0,1);
        return new Promise((resolve, reject) => {
            fs.writeFile('messages/' + messageDate + '.txt', JSON.stringify(message, null, 2), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(message)
                }

            })
        });
    },
    init: callback => {
        getFiles().then(files => {
            const lastElems = files.slice(files.length - 5, files.length);
            lastElems.forEach(file => {
                readFileContent(file).then(fileData => {
                    data.push(fileData)
                })
            });
        });
        callback();
    },
    getData: () => {
        return data;
    }
};


module.exports = db;
