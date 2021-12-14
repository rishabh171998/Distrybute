
const downloadService=require('../services/download-service')

class DownloadController
{
    constructor(context)
    {
        //console.log(context)
        this.options=context
        this.node=context.ipfsClient,
        this.db=context.db,
        this.collection=context.collection
    }
async downloadFile(req,res)
{
   
   try{ 
    const file_details=req.params.id;
    console.log(this.options.controller.node)
    console.log("**********************************************************************************************************************************************************")
    console.log(this.options.controller.node)
    const {result,status}=await downloadService.downloadFile(file_details,this.db,'FILE');
    if(status!=500)
    {
        console.log(result);
        res.status(status).send(result);
    }
    else{
         res.status(500).send("Error Downloading File");
    }
}catch(err)
{
    console.error(err);
}

}
}
module.exports=
{
    DownloadController
}