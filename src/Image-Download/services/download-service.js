const {createResponse}=require('../utils/responses/response')
const {createErrorResponse}=require('../utils/responses/error-util')
const {FindByFile_ID}=require('../shared-data/doa')
const fs=require('fs')
const Hash = require('ipfs-only-hash')
const path=require('path')
const { nanoid } = require('nanoid');
async function  downloadFile(file_details,database,database_collection)
    {
        try
        {
                let fileRes = await FindByFile_ID(file_details,database,database_collection);
                if(!fileRes)
                {
                 console.log("entered 1")
                    return await createErrorResponse(500,'error.finding.data',"Error Finding Data");
                }
               return await createResponse(200,fileRes);
        }catch(err)
        {
            console.log(err)
            return await createErrorResponse(500,'error.finding.file','Error Finding File');
        }
    }

    module.exports={downloadFile}