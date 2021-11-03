const fs=require('fs');
const all=require('it-all')
const {pipe}=require('it-pipe')
const { extract } =require('it-tar')
const toBuffer =require('it-to-buffer')
const map =require('it-map')
async function * tarballed (source) {
    yield * pipe(
      source,
      extract(),
      async function * (source) {
        for await (const entry of source) {
          yield {
            ...entry,
            body: await toBuffer(map(entry.body, (buf) => buf.slice()))
          }
        }
      }
    )
  }
  async function collect (source) {
    return all(source)
  }
const addFile=async(Client,ipfs_id)=>
{
   
    const fileAdded=await pipe(Client.get(ipfs_id),tarballed,collect)

 return fileAdded;
}
module.exports.addFile=addFile