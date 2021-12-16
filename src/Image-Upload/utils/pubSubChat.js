const pubsub=require('../base/pubsub');


const initPubSubChat=async (context)=>
{
    try{
    const pub=await new pubsub(context.pubSubConnect,context.TOPIC,context.messageHandler)
    context.pubSubChat=pub;
    return context;   
}catch(err)
{
    console.error(err);
}
}
module.exports=
{
    initPubSubChat
}