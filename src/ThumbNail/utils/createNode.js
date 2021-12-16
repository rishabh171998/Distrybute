const Node=require('./libp2pPUBSUB');
const initPubSubConnect=async (context)=>
{
  try{  let {options}=context
    let connectionUrl=options.ipfsURL
    const node= await Node.nodeCreate();
    await node.start();
    context.pubsubConnect=node
    return context;
}catch(err)
{
    console.log(err);
}
}

module.exports={initPubSubConnect}