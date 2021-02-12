const express = require('express');

const multer  = require('multer');
const {protect} = require("../middleware/auth");

const {
    getFiles,
    getFile,
    deleteFile,
    upload,
    download,
    edit
} = require('../controllers/fileController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadFile = multer({
    storage: storage
});

router.post('/upload', uploadFile.single("file"), upload);
router.get('/list', protect, getFiles);
router.get('/:id', protect, getFile);
router.delete('/delete/:id', deleteFile);
router.get('/download/:id', download);
router.put('/update/:id', uploadFile.single("file"), edit)
module.exports = router;