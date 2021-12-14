const {UploadController}=require('./controllers/upload-controller')
const { response } = require('express');
const {ExpressApp}=require('./base/base-ms')
//const {createErrorResponse } = require('./utils/error-util');
const {mongoUrl} =require('./utils/mongoCred');
const {initIpfsConnect}=require('./utils/ipfsConnect')
const {upload}=require('./Multer/multer-util');
const { initMongoConnect } = require('./utils/mongoDB-util');
const asMain=(require.main === module);
//const addFile=require('./FileHandling/addFile');
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
const {JPEGTOMOZJPEG, asyncJPEGTOMOZJEPG}=require('./utils/compression-one')
const ipfsURL='http://localhost:5001'
const {asyncMiddleware}=require('middleware-async');
async function initIPFS(context)
{
   return await initIpfsConnect(context);
}
async function initDatabase(context)
{
   return await initMongoConnect(context);
}
async function initController(context)
{
    const controller=new UploadController(context)
    context.controller=controller;
    context.collection='FILE'
    return context;
}
class VIDEOUploadService extends ExpressApp{
    constructor(context)
    {
        super(context)
        this.options=context
        this.client=context.ipfsClient
        this.db=context.db;
        this.controller=context.controller
    }
    registerRoutes()
    {
        super.registerRoutes();
        const invokeAsync=this.invokeAsync.bind(this)
        this.router.post('/video/upload', validateJWT(),upload.single("file"),invokeAsync(this.controller.uploadFile))
        this.router.post('/video/upload/:type',validateJWT(),upload.single("file"),invokeAsync(this.controller.uploadFileType));
    }
}

    if(asMain) {
        let context = {
            PORT : process.env.VIDEO_UPLOAD_MS_PORT||3010,
            options: 
            {
                ipfsURL,
                mongoUrl
            }
        }
        initDatabase(context).then(contexts => {
          initIPFS(context).then(result=>
            { initController(context).then(con=>
                
            {
               new VIDEOUploadService(context).run() 
            }).catch(err => {
        console.log(err);   
        })
      })
    })

    }