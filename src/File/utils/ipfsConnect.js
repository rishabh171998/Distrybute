const {create}=require('ipfs-http-client');


const initIpfsConnect=async (context)=>
{
    let {options}=context
    let connectionUrl=options.ipfsURL
    const client= await create('http://localhost:5001')
 
    context.ipfsClient=client
    return context;
}

module.exports={initIpfsConnect}