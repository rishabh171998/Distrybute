const mongoClient=require('mongodb').MongoClient;

const initMongoConnect=async(context)=>
{
  try{
  let {options}=context;
  let connectUrl=options.mongoUrl;
  const client= await mongoClient.connect(connectUrl,{useUnifiedTopology:true});
  context.db=client.db();
  return context;
  }catch(err)
  {
    console.error(err)
  }
}

module.exports ={initMongoConnect}