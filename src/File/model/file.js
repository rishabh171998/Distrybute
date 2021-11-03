let mongoose=require('mongoose');
const validator=require('validator');
let schema =mongoose.Schema;
let Fileschema =new schema(
    {
  
        file_meta:
        [

            {
                type:Schema.type.ObjectId, ref : 'MetaData'
            }
        ],
        date_added:
        {
            type:String,
            default:new Date()
        },
    file_Details:
    {     
       ifps_id:
       {
         unique:true,
         type:String,
         required:true  
       },
       multiple_owners:
       {
           type:Boolean,
           required:true
       },
       owners:
        [

            {
                type:String
            }
        ]
       
    }
    }
)
const File=mongoose.model('File',Fileschema);
module.exports=
{
    File:File
}