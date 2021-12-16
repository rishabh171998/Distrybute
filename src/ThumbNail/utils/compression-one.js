const { default: asyncMiddleware } = require('middleware-async');
const sharp=require('sharp');

const JPEGTOMOZJPEG=async(file,filename)=>
{

    try{
   const sharper= await sharp(file).toFormat("jpeg",{mozjpeg:true,quality:75}).withMetadata().toFile("store/compressed-75-"+filename)
   sharper.filePath="compressed-75-"+filename;
    return sharper;
    }catch(err)
    {
        console.error(err);
    }
}

const JPEGTOMOZJPEGTEN=async(file,filename)=>
{

    try{
        const sharper= await sharp(file).toFormat("jpeg",{mozjpeg:true,quality:50}).withMetadata().toFile("store/compressed-50-"+filename)
       sharper.filePath="compressed-50-"+filename;
        return sharper;
    }catch(err)
    {
        console.error(err);
    }
}


module.exports=
{
    JPEGTOMOZJPEGTEN,
    JPEGTOMOZJPEG
}