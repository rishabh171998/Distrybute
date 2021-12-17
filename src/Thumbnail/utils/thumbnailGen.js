const { default: asyncMiddleware } = require('middleware-async');
const sharp=require('sharp');
const genThumbnail=require('simple-thumbnail')
const ThumbGen=async(decentra_id)=>
{
    try{
   await genThumbnail('http://localhost:8080/ipfs/'+decentra_id,'store/thumbnail-'+decentra_id+'.png','250x?');
   console.log(decentra_id);
   const path='thumbnail-'+decentra_id+'-'+'.png';
    return path;
    }catch(err)
    {
        console.error(err);
    }
}

/*const JPEGTOMOZJPEGTEN=async(file,filename)=>
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
*/

module.exports=
{
    ThumbGen
}