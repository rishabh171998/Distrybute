const fs = require('fs').promises;
const path = require('path');

const deleteFile = async (dir, file) => { 
    await fs.unlink(path.join(dir, file))      
    console.log('Deleted')
}

module.exports=
{
    deleteFile
}