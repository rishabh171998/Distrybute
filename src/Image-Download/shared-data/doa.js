

async function findByDecentraID(decentraID,database,database_collection)
{
    return await database.collection(database_collection).findOne({"file_Details.decentra_id":decentraID});
}

async function UpdateOwner(decentraID,database,database_collection,new_owner)
{
    return await database.collection(database_collection).findOneAndUpdate({"file_Details.decentra_id":decentraID},{$addToSet: {"file_Details.owners":new_owner},$set:{"file_Details.multiple_owners":true}})
}

async function findByDecentraIDAndOwner(decentraID,database,database_collection)
{
    return await database.collection(database_collection).findOne({"file_Details.decentra_id":decentraID});
}
async function InsertDocument(database,database_collection,data)
{
    return await database.collection(database_collection).insertOne(data);
}
async function FindByFile_ID(File_id,database,database_collection)
{
  return await  database.collection(database_collection).findOne({"id":File_id});
}
module.exports=
{
    findByDecentraID,
  UpdateOwner,
    InsertDocument,FindByFile_ID
}