const {createResponse}=require('../utils/responses/response')
const {createErrorResponse}=require('../utils/responses/error-util')
const {InsertDocument}=require('../shared-data/doa')
const fs=require('fs')
const Hash = require('ipfs-only-hash')
const path=require('path')
const { nanoid } = require('nanoid');
const { captureRejections } = require('events')
const { ThumbGen } = require('../utils/thumbnailGen')
const {deleteFile}=require('../utils/delete-file')
const exifr=require('exifr')
async function  uploadFile(file_details,database,database_collection,owner,node,libp2p)
    { 
       try{
                
                return await createResponse(200,doc);
        }catch(err)
        {
            console.error(err)
            return await createErrorResponse(500,'error.uploading.file','Error Uploading File');
        }
    }
    async function  uploadFileTypeOne(file_details,database,database_collection,owner,node)
    {  
       try{  
              const file=fs.readFileSync(path.join('store/', file_details.filename));
              const hash = await Hash.of(file)
               const sharper =await ThumbGen(hash);
                const file_compressed=fs.readFileSync(path.join('store/', sharper.filePath));
                const addFile=await node.add({path:file_details.filename,content:file_compressed})
               // const hash = await Hash.of(file_compressed)
                const exif=await exifr.parse(file_compressed,true)
                console.log(addFile)
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