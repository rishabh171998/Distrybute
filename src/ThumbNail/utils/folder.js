const fs=require('fs');
async function deleteFile(path)
{

    await fs.unlink(path);
}



module.exports=
{deleteFile}