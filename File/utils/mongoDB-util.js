const mongoClient=require('mongodb').MongoClient;

const initMongoConnect=async(context)=>
{
  let {options}=context;
  let connectUrl=options.mongoUrl;
  const client= await mongoClient.connect(connectUrl,{useUnifiedTopology:true});
  context.db=client.db();
  return context;
}

module.exports ={initMongoConnect}