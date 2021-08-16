const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth =  require('../../middleware/auth');
const Carrier = require('../../models/Carrier');

// @route  GET api/sales
// @desc   Get all sales of a user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const carrier = await Carrier.find({ user: req.user.id }).sort({ uploadtime: -1 });
        if(!carrier){
            return res.status(400).json('No carrier found');
        }
        res.json(carrier);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/carrier
// @desc    Create of Update a user profile
// @access  Private
router.post('/', [auth, [
    check('carriername', 'Carrier name is required').not().isEmpty(),
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        carriername,
    } = req.body;

    let carrier = new Carrier({
        carriername,
        user: req.user.id
    });
    await carrier.save();
    res.json(carrier);
});

// @route   UPDATE api/sales/update/:id
// @desc    Delete a carrier
// @access  Private
router.post('/update/:id', auth, async (req, res) => {
    try {
        const { carriername } = req.body;

        let carrier = await Carrier.findById(req.params.id);

        if(!carrier){
            return res.status(404).json({ msg: 'Sale not found'});
        }

        // Check user
        if(carrier.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        carrier = await Carrier.updateOne(
            { _id: req.params.id },
            {
                carriername
            }
        );

        res.json(carrier);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Carrier not found'});
        }
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/carrier/:id
// @desc    Delete a sale
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const carrier = await Carrier.findById(req.params.id);

        if(!carrier){
            return res.status(404).json({ msg: 'Carrier not found'});
        }

        // Check user
        if(carrier.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await carrier.remove();

        res.json({ msg: 'Carrier deleted' });
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Carrier not found'});
        }
        res.status(500).send('Server error');
    }
});
module.exports = router;