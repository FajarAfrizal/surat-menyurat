const multer = require('multer');
const { format } = require('date-fns');
const fs = require('fs');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = 'uploads/mail/';

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const currentDate = format(new Date(), 'dd-MM-yyyy');
    cb(null, currentDate + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;