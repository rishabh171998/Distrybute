const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {validationResult}=require('express-validator')
const dotenv=require('dotenv')
/**
 * @type {Express App}
 * @type {Number}
 * @type {Express Route}
 */
class ExpressApp
{
    constructor(context)
    {
        this.context=context;
        const app=express(),
        router=express.Router();
        this.PORT=context.PORT
        this.express;
        this.app=app;
        this.router=router;
        this.env=dotenv
    }
    run()
    {
        this.initExpress();
        this.startExpress();
        //return the App
        return this;
    }

    invokeAsync(method)
    {
        return(req,res,next)=>
        {
            // call the method expected to return promise, resolves to {status, content}
            method.call(this,req,res).then(result=>
                {
                    res.status(result.status).send(result.content);

                }).catch(err=>{
                        console.log(err);
                        })
        }
    }
    checkValidationResults(req,res,next)
    {
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})
        }
    }
    registerRoutes(){}

    registerErrorRoutes(app)
    {
        app.use('*',(req,res)=>
        {
            res.status(404).json(
                {
                    msg:'Route Not Found'
                }
            )
        })
    }
    initExpress() {
        const router = this.router,
            app = this.app;
            app.use(bodyParser.json({}));
            app.use(cors());
            this.env.config();
            // app.use(this.verifyJwt());
            this.registerRoutes();
            app.use('/', router); // Mount The Middleware at path '/'   
            this.registerErrorRoutes(app);
    }
    startExpress()
    {
        const app=this.app;
        try{
            app.listen(this.PORT,()=>
            {
                console.log(`Server Running on :${this.PORT}`);
            })
        }catch(err)
        {
            console.error(err);
        }
    }
}

module.exports = {ExpressApp};
