const mongoose=require('mongoose');


const inputscheme=new mongoose.Schema({
    data:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Input', inputscheme);