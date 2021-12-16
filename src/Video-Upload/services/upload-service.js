const {createResponse}=require('../utils/responses/response')
const {createErrorResponse}=require('../utils/responses/error-util')
const {InsertDocument}=require('../shared-data/doa')
const fs=require('fs')
const Hash = require('ipfs-only-hash')
const path=require('path')
const { nanoid } = require('nanoid');
const { captureRejections } = require('events')
const { JPEGTOMOZJPEG, JPEGTOMOZJPEGTEN, VideoCompressionOneMP4 } = require('../utils/compression-one')
const {deleteFile}=require('../utils/delete-file')
const events=require('events');
const eventEmitter=new events.EventEmitter();
async function  uploadFile(file_details,database,database_collection,owner,node)
    { 
       try{
                const file=fs.readFileSync(path.join('store/', file_details.filename));
                await node.add({path:file_details.filename,content:file})
                const hash = await Hash.of(file)
                const exif=await exifr.parse(file,true)
                let doc= 
                {
                    id: nanoid(),
                    file_Details:
                    {  
                       decentra_id:hash,
                       multiple_owners:false,
                       owners:[owner],
                       metadata
                    }}
                let insertRes = await InsertDocument(database,database_collection,doc);
              await deleteFile('store/', file_details.filename)
                if(!insertRes)
                {
                    return await createErrorResponse(500,'error.inserting.data',"Error Inserting Data");
                }
                delete doc.file_Details.decentra_id
                return await createResponse(200,doc);
        }catch(err)
        {
            console.error(err)
            return await createErrorResponse(500,'error.uploading.file','Error Uploading File');
        }
    }
    async function  uploadFileTypeOne(file_details,database,database_collection,owner,node,pschat)
    {  
       try{  
              const file=fs.readFileSync(path.join('store/', file_details.filename));
              const filePath= await VideoCompressionOneMP4('store/',file_details.filename);
               console.log(filePath)
               const file_compressed=fs.readFileSync(path.join('store/', filePath));
            
                const addFile=await node.add({path:file_details.filename,content:file_compressed})
                const hash = await Hash.of(file_compressed)
               // const exif=await exifr.parse(file_compressed,true)
                console.log(addFile)
                let doc= 
            {
                id: nanoid(),
                file_Details:
                {  
                   decentra_id:hash,
                   multiple_owners:false,
                   owners:[owner]
                }}
                let insertRes = await InsertDocument(database,database_collection,doc);
                pschat.send(doc);
               const messageReceived= await pschat.messageHandler;
               console.log(messageReceived);
              await deleteFile('store/', file_details.filename)
             
                await deleteFile('store/', sharper.filePath)
                if(!insertRes)
                {
                  
                    return await createErrorResponse(500,'error.inserting.data',"Error Inserting Data");
                }
                delete doc.file_Details.decentra_id
                return await createResponse(200,doc);
        }catch(err)
        {
            console.error(err)
            return await createErrorResponse(500,'error.uploading.file','Error Uploading File');
        }
    }
    async function  uploadFileTypeTwo(file_details,database,database_collection,owner,node)
    {  
        try{  
               const file=fs.readFileSync(path.join('store/', file_details.filename));
                const sharper= await JPEGTOMOZJPEG(file,file_details.filename);
                console.log(sharper)
                 const file_compressed=fs.readFileSync(path.join('store/',sharper.filePath));
                 const addFile=await node.add({path:file_details.filename,content:file_compressed})
                 const hash = await Hash.of(file_compressed)
                 console.log(addFile)
                 const exif=await exifr.parse(file_compressed,true)
                 let doc= 
             {
                 id: nanoid(),
                 file_Details:
                 {  
                    decentra_id:hash,
                    multiple_owners:false,
                    owners:[owner],
                    exif:exif
                 }}
                 let insertRes = await InsertDocument(database,database_collection,doc);
                 await deleteFile('store/', file_details.filename)
                 await deleteFile('store/',sharper.filePath)
                 if(!insertRes)
                 {
                     return await createErrorResponse(500,'error.inserting.data',"Error Inserting Data");
                 }
                 delete doc.file_Details.decentra_id
                 return await createResponse(200,doc);
         }catch(err)
         {
             console.error(err)
             return await createErrorResponse(500,'error.uploading.file','Error Uploading File');
         }
     }
    module.exports=
    {
        uploadFile,
        uploadFileTypeOne,
        uploadFileTypeTwo
    }