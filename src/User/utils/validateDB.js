/**
 * @param {String} 
 */
const validateEmail=(email)=>
{
    const regEx= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
}

/**
 * @params {String}
 */
const validateName=(name)=>
{
        const regEx=/^[a-z ,.'-]+$/i
        return regEx.test(name);
}
module.exports=
{
    email:validateEmail,
    name:validateName
}