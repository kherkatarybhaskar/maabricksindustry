const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth =  require('../../middleware/auth');
const Cook = require('../../models/Cook');

// @route  GET api/sales
// @desc   Get all sales of a user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const cook = await Cook.find({ user: req.user.id }).sort({ uploadtime: -1 });
        if(!cook){
            return res.status(400).json('No cook found');
        }
        res.json(cook);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/cook
// @desc    Create of Update a user profile
// @access  Private
router.post('/', [auth, [
    check('cookname', 'Cook name is required').not().isEmpty(),
    check('quantitycooked', 'Quantity cooked is required').not().isEmpty(),
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        cookname,
        quantitycooked
    } = req.body;

    let cook = new Cook({
        cookname,
        quantitycooked,
        user: req.user.id
    });
    await cook.save();
    res.json(cook);
});

// @route   UPDATE api/sales/update/:id
// @desc    Delete a cook
// @access  Private
router.post('/update/:id', auth, async (req, res) => {
    try {
        const { 
            cookname,
            quantitycooked 
        } = req.body;

        let cook = await Cook.findById(req.params.id);

        if(!cook){
            return res.status(404).json({ msg: 'Sale not found'});
        }

        // Check user
        if(cook.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        cook = await Cook.updateOne(
            { _id: req.params.id },
            {
                cookname,
                quantitycooked
            }
        );

        res.json(cook);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Cook not found'});
        }
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/cook/:id
// @desc    Delete a sale
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const cook = await Cook.findById(req.params.id);

        if(!cook){
            return res.status(404).json({ msg: 'Cook not found'});
        }

        // Check user
        if(cook.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await cook.remove();

        res.json({ msg: 'Cook deleted' });
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Cook not found'});
        }
        res.status(500).send('Server error');
    }
});
module.exports = router;