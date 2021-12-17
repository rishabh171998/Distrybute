const { deleteFile } = require('../utils/delete-file');
const {ThumbGen}=require('../utils/thumbnailGen');
const fs=require('fs')
const path=require('path');
async function  pubsubService(context,doc)
{
 try{
    const file_path=await ThumbGen(doc);
    const file=fs.readFileSync(path.join('store/', file_path));
    console.log(context.ipfsClient)
                const addFile=await context.ipfsClient.add({path:file_path,content:file})
           console.log(addFile);
           deleteFile('store/',file_path);
 }catch(err)
 {
     console.error(err);
 }   
 
}

module.exports=
{
    pubsubService
}