const {ExpressApp}=require('./base/base-ms');
const {mongoUrl} =require('./utils/mongoCred');
const {createErrorResponse}=require('../File/utils/error-util');
const {initMongoConnect}=require('./utils/mongoDB-util'); 
const bcrypt=require('bcryptjs')
const asMain=(require.main === module);

async function initResources(context)
{
    return await initMongoConnect(context);
}
const COLLECTION_NAME='USERS';
class UserService extends ExpressApp
{
    constructor(context)
    {
        super(context);
        this.options=context;
        this.db=context.db;
    }
  
    registerRoutes()
    {
        super.registerRoutes();
        const invokeAsync=this.invokeAsync.bind(this);
        this.router.get('/user/getUser' ,invokeAsync(this.getUserEmail));
        this.router.post('/user/insertUser',invokeAsync(this.addNewUser));
    }

    async getUserEmail(req)
    {
        const {email}=req.body;
        try{
            const user=await this.db.collection(COLLECTION_NAME).findOne({"cred_id.email":email});
            console.log(user)
            if(!user) {
                console.log("entered 5")
                return await createErrorResponse(404,'user.not.found',"User Not Found");
            }

            return {
                status: 200,
                content: user
            }
        }catch(err) {
            console.log("entered 4")
            return await createErrorResponse(500,'error.finding.user','Error Finding User');
        }
    }  
    async addNewUser(req) 
    {
          const {email,password,first_name,last_name}=req.body;
          try{
            const EmailExist=await this.db.collection(COLLECTION_NAME).findOne({"cred_id.email":email});
           if(EmailExist)
           {
            console.log("entered 3")
           return await createErrorResponse(404,'dddf',"Email Already Exists");
           }
           const salt=await bcrypt.genSalt(10)
           const hashPassword=await bcrypt.hash(password,salt);
           let doc=
           {
               cred_id:
               {
                   email:email,
                   password:hashPassword
               },
               First_Name:first_name,
               Last_Name:last_name
           }
           let insertRes = await this.db.collection(COLLECTION_NAME).insertOne(doc);
           if(!insertRes)
           {
            console.log("entered 1")
               return await createErrorResponse(500,'error.in.regitering',"Error in Registering");
           }
           console.log(doc)
           delete doc.cred_id.password;
           return{
               status:200,
               content:doc
           }
          }catch(err)
          {
            console.log("entered 2")
            return await createErrorResponse(500,'error.creating.user','Error Creating User');
          }
    }

    
}
if(asMain) {
    let context = {
        PORT : 3002,
        options : {
            mongoUrl
        }
    }
    initResources(context).then(result => {
        new UserService(context).run();
    }).catch(err => {
        console.log(err);
    })
}