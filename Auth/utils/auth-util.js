const bcrypt =require('bcryptjs');
RequestWrapper = require('request-wrapper'),
http = new RequestWrapper();
const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

const userUtil = async (baseUrl,routeUrl,method, doc) => {
    try {
        return await http.request({
            url: baseUrl + routeUrl,
            method,
            body : doc
        })
    }catch(err) {
        console.error(err);
    }
}
module.exports = {
    userUtil,
    comparePassword
}