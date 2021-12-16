const {UploadController}=require('./controllers/upload-controller')
const { response } = require('express');
const {ExpressApp}=require('./base/base-ms')
const {mongoUrl} =require('./utils/mongoCred');
const {initIpfsConnect}=require('./utils/ipfsConnect')
const {upload}=require('./Multer/multer-util');
const { initMongoConnect } = require('./utils/mongoDB-util');
const Node=require('./utils/libp2pPUBSUB')
const asMain=(require.main === module);
//const addFile=require('./FileHandling/addFile');
const fs=require('fs')
const {validateJWT}=require('./middleware/token')
const ipfsURL='http://localhost:5001'
const { initPubSubChat } = require('./utils/pubSubChat');
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
    try{
    const controller=new UploadController(context)
    context.controller=controller;
    context.collection='FILE'
    return context;
    }catch(err)
    {
        console.error(err);
    }
}
async function initPSChat(context)
{
    const node= await Node.nodeCreate();
    await node.start();
    context.pubSubConnect=node
    context.TOPIC='Thumbnail/libp2p/1.00'
    context.messageHandler=({from,message})=>
    {
        return message.data;
    }
    return await initPubSubChat(context);
}
class IMAGEUploadService extends ExpressApp{
    constructor(context)
    {
        super(context)
        this.options=context
        this.client=context.ipfsClient
        this.db=context.db;
        this.libp2p=context.pubsubConnect
        this.pub=context.pubSubChat
        this.controller=context.controller
    }
    registerRoutes()
    {
        super.registerRoutes();
        const invokeAsync=this.invokeAsync.bind(this)
        this.router.post('/image/upload', validateJWT(),upload.single("file"),invokeAsync(this.controller.uploadFile))
        this.router.post('/image/upload/:type',validateJWT(),upload.single("file"),invokeAsync(this.controller.uploadFileType));
    }
}

    if(asMain) {
        let context = {
            PORT : process.env.IMAGE_UPLOAD_MS_PORT||3009,
            options: 
            {
                ipfsURL,
                mongoUrl
            }
        }
        initDatabase(context).then(contexts => {
          initIPFS(context).then(result=>
            { 
                    initPSChat(context).then(ca=>
                        {
                    initController(context).then(con=>    
            {
               new IMAGEUploadService(context).run() 
            }).catch(err => {
        console.log(err);   
        })
      })
    })
        })
    }