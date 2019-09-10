let allMessages = [];

function getAllMessages(req, res){
    res.status(200).json(allMessages);
}
function createMessage(req, res){
    let {username, message} = req.body;
    let newMessage = {username, message}
    allMessages.push(newMessage);
    res.status(200).json(allMessages);
    if(req.session.history){
        req.session.history.push(newMessage);
    } else {
        req.session.history = [];
        req.session.history.push(newMessage)
    }
}
function history(req, res){
    res.status(200).json(req.session.history)
}

module.exports = {
    getAllMessages,
    createMessage,
    history
}