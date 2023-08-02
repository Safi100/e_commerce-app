const Advertisement = require('../models/advertisement')
module.exports.getAdvertisementS = async (req, res) => {
    try{
        const advertisement = await Advertisement.find()
        res.status(200).json(advertisement)
    }catch(e){
        console.log(e);
    }
}