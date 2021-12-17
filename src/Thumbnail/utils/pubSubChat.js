const pubsub=require('../base/pubsub');


const initPubSubChat=async (context)=>
{
    try{
    const pub= new pubsub(context.pubSubConnect,context.TOPIC,context.messageHandler)
    console.log(context.messageHandler)
    context.pubSubChat=pub;
    console.log(pub);
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