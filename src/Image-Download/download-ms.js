const {DownloadController}=require('./controllers/download-controller')
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
const ipfsURL='http://localhost:5001'
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
    const controller=new DownloadController(context)
    context.controller=controller;
    context.collection='FILE'
    return context;
}
class IMAGEDownloadService extends ExpressApp{
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
        this.router.get('/image/download/:id',validateJWT(),invokeAsync(this.controller.downloadFile))
        this.router.get('/image/download/all',validateJWT(),invokeAsync(this.controller.downloadFile))
    }
}

    if(asMain) {
        let context = {
            PORT : process.env.IMAGE_DOWNLOAD_MS_PORT,
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
               new IMAGEDownloadService(context).run() 
            }).catch(err => {
        console.log(err);   
        })
      })
    })

    }