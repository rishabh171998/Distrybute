const { default: asyncMiddleware } = require('middleware-async');
const sharp=require('sharp');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const VideoCompressionOneMP4=async(dir,filename)=>
{
    try{
      await execFile('ffmpeg' ['-i' ,dir/filename, '-c:v' ,'libx264' ,'-crf', '18', outputcd.mp4])
    }catch(err)
    {
        console.error(err);
    }
}

const VideoCompressionTwoMP4=async(file,filename)=>
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