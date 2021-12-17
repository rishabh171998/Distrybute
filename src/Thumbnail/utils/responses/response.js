async function createResponse(status, message) {
    return {
        status,
        result: {
            message
        }
    }
}
module.exports = {createResponse};