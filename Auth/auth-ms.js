const { response } = require('express');
const {ExpressApp}=require('./base/base-ms');
const {createErrorResponse } = require('../File/utils/error-util');
const {comparePassword}=require('./utils/auth-util');
const {userUtil}=require('./utils/auth-util');
const {createToken} = require('./middleware/token');
const asMain=(require.main===module)
class AuthApp extends ExpressApp{
    constructor(context)
    {
        super(context);
        this.options=context
    }
    registerRoutes()
    {
        super.registerRoutes();
        const invokeAsync = this.invokeAsync.bind(this);
        this.router.post('/login',invokeAsync(this.handleLogin));
        this.router.post('/register',invokeAsync(this.handleRegister));
    }
    async handleLogin(req) {
        let doc = req.body;
        console.log(doc)
        try {
            const user = await userUtil('http://localhost:3002','/user/getUser','GET',doc);
            if(!user) {
                console.log("entered 6")
                console.log(user.errorode)
                return await createErrorResponse(401,'user.not.active',"Email Not Verified")
            }
            console.log(user.body);
            console.log(user.statusCode)
            const isValidPassword = await comparePassword(doc.password, user.body.cred_id.password);
            if(!isValidPassword) {
                console.log("entered 7")
                return await createErrorResponse(500,'password.not.authenticated',"Password Not Authenticated")
            }
            delete user.body.cred_id.password;
            const token=await createToken(user.body._id);
            return {
                status: 200,
                content:
                {
                    token,
                    ...user.body
                }
            }
        }catch(err){
            console.log("entered 9")
            console.log(err)
            return await createErrorResponse(400,"ddd" ,"edsds");
        }
    }
    async handleRegister(req)
    {
        let doc = req.body;
        const response = await userUtil('http://localhost:3002','/user/insertUser','POST',doc)
        if(!response)
        {
            console.log("entered 11");
            return await createErrorResponse(401,'ddd',"Email Already")
        }
        console.log(response.statusCode)
        if(response.statusCode== 200) {
            console.log("entered 8")
             return {
                 status: 200,
                 content: response.body
             }
        }
        console.log("entered 10")
        return {
            status: response.statusCode,
            content: response.error
        }
    }
}
if(asMain) {
    let context = {
        PORT : 3001
    }
    new AuthApp(context).run();
}
