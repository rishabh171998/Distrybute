
const uploadService=require('../services/upload-service')

class UploadController
{
    constructor(context)
    {
        //console.log(context)
        this.options=context
        this.node=context.ipfsClient,
        this.db=context.db,
        this.collection=context.collection
        this.libp2p=context.pubsubConnect
    }
async uploadFile(req,res)
{
   
   try{ 
    const file_details=req.file;
    const current_owner=req.validateJWTPayload;
   /* console.log(this.options.controller.node)
    console.log("**********************************************************************************************************************************************************")
    console.log(this.options.controller.node)
*/
    const {result,status}=await uploadService.uploadFile(file_details,this.db,'FILE',current_owner,this.options.controller.node,this.options.controller.libp2p);
    if(status!=500)
    {
        res.status(status).send(result);
    }
    else{
         res.status(500).send("Error Uploading File");
    }
}catch(err)
{
    console.error(err);
}

}
async uploadFileType(req,res)
{
   
   try{
    const compression_type=req.params.type;
    const file_details=req.file;
    const current_owner=req.validateJWTPayload;
  /*  console.log(this.options.controller.node)
    console.log("**********************************************************************************************************************************************************")
    console.log(this.options.controller.node)
    */
   if(compression_type=="50"||compression_type=="75")
    {
     if(compression_type=="50")
     {
    const {result,status}=await uploadService.uploadFileTypeOne(file_details,this.db,'FILE',current_owner,this.options.controller.node);
    if(status!=500)
    {
        res.status(status).send(result);
    }
    else{
         res.status(500).send("Error Uploading File");
    } 
}
    else if(compression_type=="75")
        {
       const {result,status}=await uploadService.uploadFileTypeTwo(file_details,this.db,'FILE',current_owner,this.options.controller.node);
       if(status!=500)
       {
           res.status(status).send(result);
       }
       else{
            res.status(500).send("Error Uploading File");
       } 
    } 
}else{
    res.status(500).send("Error Uploading File")
}
    
}catch(err)
{
    console.error(err);
}

}
}
module.exports=
{
    UploadController
}