const { response } = require('express');
const {ExpressApp}=require('./base/base-ms')
const {createErrorResponse } = require('./utils/error-util');
const {mongoUrl} =require('./utils/mongoCred');
const {initIpfsConnect}=require('./utils/ipfsConnect')
const {upload}=require('./Multer/multer-util');
const { initMongoConnect } = require('./utils/mongoDB-util');
const asMain=(require.main === module);
const addFile=require('./FileHandling/addFile');
const Hash = require('ipfs-only-hash')
const fs=require('fs')
const {validateJWT}=require('./middleware/token')
const {globSource}=require('ipfs-http-client')
const path = require('path');
const { nanoid } = require('nanoid');
const {Blob,Buffer}=require('buffer')
const BufferList = require('bl/BufferList');
const { allowedNodeEnvironmentFlags } = require('process');
const all = require('it-all')
//const { concat }= require('uint8arrays/concat')
 const { pipe } =require('it-pipe')
 const { pack }=require( 'it-tar')
const concat = require('it-concat')
const ipfsURL='http://localhost:5001'
async function initIPFS(context)
{
   return await initIpfsConnect(context);
}
async function initDatabase(context)
{
   return await initMongoConnect(context);
}
const COLLECTION_NAME='FILES'

class FileService extends ExpressApp{
    constructor(context)
    {
        super(context)
        this.options=context
        this.client=context.ipfsClient
        this.db=context.db;
    }

    registerRoutes()
    {
        super.registerRoutes();
        const invokeAsync=this.invokeAsync.bind(this)
        this.router.post('/file/upload', validateJWT(),upload.single("file"),invokeAsync(this.uploadFile))
        this.router.get('/file/download/:id',validateJWT(),invokeAsync(this.downloadFile))
    }
    async  uploadFile(req)
    {
       console.log(req.file);
       const stream = fs.createReadStream(path.join('./store/', req.file.filename))
       const hash = await Hash.of(stream)
      console.log(hash);
        try
        {
            const ipfsFileExist=await this.db.collection(COLLECTION_NAME).findOne({"file_Details.ifps_id":hash})
            if(ipfsFileExist)
            {
                await this.db.collection(COLLECTION_NAME).findOneAndUpdate({"file_Details.ifps_id":hash},{$addToSet: {"file_Details.owners":req.validateJWTPayload},$set:{"file_Details.multiple_owners":true}})
               
                return { status: 200, content:"Content Updated"}
            }
            let doc= 
            {
                id: nanoid(),
                file_Details:
                {  
                   ifps_id:hash,
                   multiple_owners:false,
                   owners:[req.validateJWTPayload]
                }
                }
                const file=fs.readFileSync(path.join('./store/', req.file.filename));
                const addFile=await this.client.add({path:req.file.filename,content:file})
               console.log(addFile)
                let insertRes = await this.db.collection(COLLECTION_NAME).insertOne(doc);
                if(!insertRes)
                {
                 console.log("entered 1")
                    return await createErrorResponse(500,'error.in.regitering',"Error in Registering");
                }
                console.log(doc)
                return{
                    status:200,
                    content:doc
                }
        }catch(err)
        {
            console.log(err)
            return await createErrorResponse(500,'error.uploading.file','Error Uploading File');
        }
    }
    async  downloadFile(req)
    {
      const id=req.params.id;
      console.log( await this.client.commands())
      try{
          const file=await this.db.collection(COLLECTION_NAME).findOne({"id":id});
          console.log(file)
          if(!file)
          {
              return await createErrorResponse(404,'file.not.found',"File Not Found");
          }
          console.log(file.file_Details.ifps_id)
         const ipfs_file= await all(this.client.get('/ipfs/'+file.file_Details.ifps_id))
         //const buff=await concat(ipfs_file)
       //  buff.slice(0,2)
       const buuu=await addFile.addFile(this.client,'/ipfs/'+file.file_Details.ifps_id)
        console.log(buuu[0])
        const buf=ipfs_file

        for await (const itr of buf)
        {
          fs.appendFileSync("./store/de.jpeg",itr)
        }
        fs.appendFileSync('./store/ff.mp4',Buffer(buuu[0].body))
         //console.log(ipfs_file)
      //   const buf=concat(ipfs_file)
//console.log(buf[0])
       //  fs.writeFileSync("./store/7.jpeg",buf)
     //  for await (const itr of ipfs_file)
       // {
        //  console.log(typeof(itr))
       //}
    //   const blob=new Blob(ipfs_file,{type:'image/jpeg'});
      // console.log(blob)
      //console.log(ipfs_file[0].path)
       //fs.writeFileSync("./store/6.jpeg",ipfs_file)
      // for await (const itr of ipfs_file) {
   
        //const content = new BufferList()
    //}
      
      //  console.log(content)
    //   // const buff=Buffer.from(content)
      
      
       //fs.appendFileSync("./store/3.jpeg",buff)
       //for(const files of ipfs_file)
       //{
         //console.log(files)
       //}
      }catch(err)
      {
          console.log(err);
        return await createErrorResponse(500,'error.finding.file','Error Finding File');
      }
      
    }
}
    if(asMain) {
        let context = {
            PORT : 3007,
            options: 
            {
                ipfsURL,
                mongoUrl
            }
        }
        initDatabase(context).then(contexts => {
          initIPFS(context).then(result=>
            {
               new FileService(context).run() 
            }).catch(err => {
        console.log(err);   
        })
      })

    }
