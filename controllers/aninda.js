
//const uploadFileMd = require("../middleware/uploadmiddleware");

exports.testMethod = (req, res, next) => {
    res.status(200).json({
        responseMessage: "Test Message"
    });
}

    const util = require("util");
    const multer = require("multer");
    const maxSize = 2 * 1024 * 1024;
    
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/uploads/aninda");
      },
      filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, "Aninda_"+Date.now()+"_"+file.originalname);
      },
    });
    
    let uploadFile = multer({
      storage: storage,
      limits: { fileSize: maxSize },
    }).single("file");
    
    let uploadFileMiddleware = util.promisify(uploadFile);




exports.uploadFile = async (req, res, next) => {

    try {
        await uploadFileMiddleware(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file,
          file: req.file,
          filedestination: "https://ftpserver.herokuapp.com/ftp/uploads/aninda/"+req.file.filename
        });
      } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
}


