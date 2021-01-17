const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(request, response) {
        // console.log(request.body);
        const { name,email,avatar } = request.body.data;
        try{
            var user = await User.findOne({ email });
            if(!user){
                user = new User({
                   name,email,avatar
                });
                console.log(user);
                await user.save();
            }
            
            console.log(user);
            const token = jwt.sign({ _id: user._id },'abcd', {
                expiresIn: 604800,
            });
            response.setHeader('authorization', token);
            return response.status(200).send({...user,token});
        }catch(err){
            return response.status(401).send(err);
        }
    },
}
