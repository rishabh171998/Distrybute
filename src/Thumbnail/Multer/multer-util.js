const multer=require('multer');
const path=require('path');

const fileStorageEngine=multer.diskStorage(
    {
        destination:(req,file,cb)=>
        {
            cb(null,"store");
        },
        filename:(req,file,cb)=>
        {
            let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
            cb(null,Date.now() +"--"+ req.validateJWTPayload+'.'+extension);
        }
    }
);

const upload = multer({ storage: fileStorageEngine });

module.exports={upload};