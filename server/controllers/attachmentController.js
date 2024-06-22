// server\controllers\attachmentController.js
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

const uploadFile = (req, res) => {

    console.log(req.body)
    console.log(req.file)
    console.log("req")
    res.send("file uploaded sucessfully");
}

module.exports = {
    uploadFile
};