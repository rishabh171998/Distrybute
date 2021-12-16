const pubsub=require('../base/pubsub');


const receivedMessage=async (libp2pNode)=>
{
    const pub=new pubsub(libp2pNode,pubsubChat.TOPIC,({from,message})=>
    {
      
     console.log(message.data);
    })

}
module.exports=
{
    receivedMessage
}