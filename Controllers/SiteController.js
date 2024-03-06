// SitesController.js
const Site = require('../Models/Site');
const { v4: uuidv4 } = require('uuid');
exports.getAll = async (req,res)=>{
sites = await Site.find()
res.status(200).json(sites)
}
exports.addSite = async (req, res) => {
   console.log(Date.now())
    try {
        const site = new Site()
           site.name="https://www.b-forbiz.com";
           site.offre="master";
           site.start_date= Date.now();
           site.end_date= Date.now();

        await site.save();
        res.status(201).json({ message: 'Site added successfully', site });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateSite = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    console.log(req.body)
    const { name, offre, start_date, end_date } = req.body;
    try {
        const site = await Site.findByIdAndUpdate(id, { name, offre, start_date, end_date }, { new: false });

       if(site.offre != offre){
        console.log("send")
         req.io.emit('notification', {id:uuidv4(),msg:`The offre of this website ${site.name} is changed from ${site.offre} to ${offre}`,link:"site/test" ,date:Date.now()}
         ); //('notification', site);
  }
        res.status(200).json({ message: 'Site updated successfully', site });
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

