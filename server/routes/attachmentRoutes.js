const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');
const multer = require('multer');
const path = require('path');

// Set up multer storage
// Configure Multer storage (adjust as needed)
const storage = multer.diskStorage({
    destination: './uploads', // Adjust the destination folder
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
  });

const upload = multer({
    storage: storage,
});

router.post('/upload', upload.single('attachment'), (req, res) => {
    console.log(req.file)
    console.log(typeof req.file)
    console.log("req.file===============================")
    console.log(req.body)
    console.log("req.body==============================")

    // if (!req.file) {
    //   return res.status(400).json({ error: 'No file uploaded' });
    // }
  
    // Access uploaded file details (e.g., for database storage)
    // const fileData = {
    //   filename: req.file.filename,
    //   path: req.file.path,
    //   mimetype: req.file.mimetype,
    //   size: req.file.size
    // };
    // console.log(fileData)
    // console.log("fileData=========")
  
    // Consider saving file data to a database if needed
    // ...
  
    res.status(200).json({ message: 'File uploaded successfully' });
  });

// router.post('/upload', upload.single('attachment'), (req, res) => {
//     console.log(req.file)
//     console.log(req.body)
//     if (!req.file) {
//         return res.status(400).json({
//             error: 'No file uploaded'
//         });
//     }

//     const fileData = {
//         filename: req.file.filename,
//         path: req.file.path,
//         mimetype: req.file.mimetype,
//         size: req.file.size
//     };

//     const newFile = new File(fileData);
//     newFile.save()
//         .then(() => res.status(200).json({
//             message: 'File uploaded successfully'
//         }))
//         .catch(err => res.status(500).json({
//             error: err.message
//         }));
// });
router.get('/upload', (req, res) => {
    console.log('GET /upload route hit');
    res.send('works');
});

module.exports = router;