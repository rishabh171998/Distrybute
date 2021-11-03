let mongoose=require('mongoose');
const validator=require('validator');
let schema =mongoose.Schema;
let Userschema =new schema(
    {
    cred_id:
    {
        email:
        {
            unique:true,
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            validate:
            {
                validator: validator.isEmail,
                message:'{VALUE} is not a cvalid email',
                isAsync:false
            }
        },
        password:
        {
            type:String,
            default:null,
        },
        date_created:
        {
            type:String,
            default:new Date()
        }
    },
    First_Name:
    {     
     type:String,
     required:true
    },
    Last_Name:
    {
        type:String,
        required:true
    },
    Subscription:
    {
        type:String,
        enum:['FREE','PAID'],
        default:'FREE'
    },
    planID:
    {
        type:schema.Types.ObjectId,
        ref:'PLANS'
    },
    StorageDetails:
    {
        storageSize:
        {
            type:Number,
            default:0
        },
        storageLimit:
        {
            type:Number,
            default:5120
        }
    }
    }
)
const User=mongoose.model('User',Userschema);
module.exports=
{
    User:User
}