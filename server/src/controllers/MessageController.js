const Message = require('../models/Message');

module.exports = {
    async store(req, res){
        const { content, user } = req.body;
        const message = new Message({
            content,
            user
        });
        await message.save();
        await message.populate('user').execPopulate();
        console.log(message);
        return res.json(message);
    },
    
    async index(request, response){
        const messages = await Message.find({})
        .populate('user')
        .exec();
        return response.json(messages);
    },
    
    async show(request, response){
        const message = await Message.findById(request.params.id);

        if(!message) 
            return response.status(404).send({error: 'Message not found'});
        
        return response.json(message);
    },

    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await Message.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err)
        }
    },

    async update(request, response){
        try{
            const message = await Message.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            return response.json(message);
        }catch(err){
            return response.status(400).send(err)
        }
    }
}
