const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth =  require('../../middleware/auth');
const Material = require('../../models/Material');

// @route  GET api/sales
// @desc   Get all sales of a user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const material = await Material.find({ user: req.user.id }).sort({ uploadtime: -1 });
        if(!material){
            return res.status(400).json('No material found');
        }
        res.json(material);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/material
// @desc    Create of Update a user profile
// @access  Private
router.post('/', [auth, [
    check('vehicleplateno', 'Vehicle plate no is required').not().isEmpty(),
    check('drivername', 'Driver name is required').not().isEmpty(),
    check('vehicletype', 'Vehicle type is required').not().isEmpty(),
    check('materialname', 'Material is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    check('sender', 'Sender is required').not().isEmpty(),
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        vehicleplateno,
        drivername,
        vehicletype,
        materialname,
        quantity,
        sender,
        uploaddate
    } = req.body;

    let material = new Material({
        vehicleplateno,
        drivername,
        vehicletype,
        materialname,
        quantity,
        sender,
        uploaddate,
        user: req.user.id
    });
    await material.save();
    res.json(material);
});

// @route   UPDATE api/sales/update/:id
// @desc    Delete a material
// @access  Private
router.post('/update/:id', auth, async (req, res) => {
    try {
        const { 
            vehicleplateno,
            drivername,
            vehicletype,
            materialname,
            quantity,
            sender,
            uploaddate
        } = req.body;

        let material = await Material.findById(req.params.id);

        if(!material){
            return res.status(404).json({ msg: 'Sale not found'});
        }

        // Check user
        if(material.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        material = await Material.updateOne(
            { _id: req.params.id },
            {
                vehicleplateno,
                drivername,
                vehicletype,
                materialname,
                quantity,
                sender,
                uploaddate
            }
        );

        res.json(material);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Material not found'});
        }
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/material/:id
// @desc    Delete a sale
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if(!material){
            return res.status(404).json({ msg: 'Material not found'});
        }

        // Check user
        if(material.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await material.remove();

        res.json({ msg: 'Material deleted' });
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Material not found'});
        }
        res.status(500).send('Server error');
    }
});
// @route  GET api/material/filter
// @desc   Get all material of a user with filter options
// @access Private
router.get('/filter', auth, async (req, res) => {
    try {
        const {
            vehicleplateno,
            drivername,
            vehicletype,
            materialname,
            quantity,
            sender,
            uploaddate
        } = req.query;
        
        let query = {
            vehicleplateno,
            drivername,
            vehicletype,
            materialname,
            quantity,
            sender,
            uploaddate
        }
        if(query.vehicleplateno==''){
            delete query.vehicleplateno
        }
        if(query.drivername==''){
            delete query.drivername
        }
        if(query.vehicletype==''){
            delete query.vehicletype
        }
        if(query.materialname==''){
            delete query.materialname
        }
        if(query.quantity==''){
            delete query.quantity
        }
        if(query.sender==''){
            delete query.sender
        }
        if(query.uploaddate==''){
            delete query.uploaddate
        }
        const material = await Material.find(query).sort({ date: -1});
        res.json(material);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;