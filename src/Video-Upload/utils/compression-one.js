const { default: asyncMiddleware } = require('middleware-async');
const sharp=require('sharp');
const path=require('path')
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const events=require('events');
const eventEmitter=new events.EventEmitter();
const ffmpeg=require('fluent-ffmpeg')

const compressed_file=(filename)=>
{
    return 'compressed-30-'+filename
}
const VideoCompressionOneMP4=async(dir,filename)=>
{
    let result;
    try{
const process=await execFile('ffmpeg' ,['-i' ,path.join(dir,filename), '-c:v' ,'libx264' ,'-crf', '40', path.join(dir,'compressed-30-'+filename)], (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', stderr);
            throw error;
        }
        console.log('Success', stdout);   
    })

/*
await ffmpeg(path.join(dir,filename))
.withVideoCodec('libx264')
.addOptions(['-crf 5'])
.output(path.join(dir,'compressed-30-'+filename)).on('end',()=>
{
    console.log('finished')
}).run();*/
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
    VideoCompressionOneMP4,
    VideoCompressionTwoMP4
}