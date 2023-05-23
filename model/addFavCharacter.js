const mongoose=require('mongoose');

const favCharacterSchema=new mongoose.Schema({
    characterName:{
        type:String,
        required:true
    },
    castName:{
        type:String,
        required:true
    },
    favCharUrl:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const FavCharacterModel=mongoose.model('favCharacter',favCharacterSchema);

module.exports=FavCharacterModel;