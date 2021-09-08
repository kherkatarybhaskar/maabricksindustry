const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Sales = require('../../models/Sales');

// @route  GET api/sales
// @desc   Get all sales of a user
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const sales = await Sales.find({ user: req.user.id }).sort({ date: -1 });
       
        if(!sales){
            return res.status(400).json('No sales found');
        }
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/sales
// @desc    Add a sale
// @access  Private
router.post('/', [auth, [
    check('typeofbrick', 'Type of brick is required').not().isEmpty(),
    check('drivername', 'Driver name is required').not().isEmpty(),
    check('vehicletype', 'Vehicle type is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        typeofbrick,
        factoryname,
        drivername,
        vehicletype,
        quantity,
        vehicleno,
        uploaddate
    } = req.body;

    let sales = new Sales({
        typeofbrick,
        factoryname,
        drivername,
        vehicletype,
        quantity,
        vehicleno,
        uploaddate,
        user: req.user.id
    });
    await sales.save();
    res.json(sales);
});

// @route   UPDATE api/sales/update/:id
// @desc    Update a sale
// @access  Private
router.post('/update/:id', auth, async (req, res) => {
    try {
        const {
            typeofbrick,
            factoryname,
            drivername,
            vehicletype,
            quantity,
            vehicleno,
            uploaddate
        } = req.body;
        // console.log(typeofbrick,
        //     drivername,
        //     vehicletype,
        //     quantity,
        //     vehicleno,
        //     uploaddate)
        let sale = await Sales.findById(req.params.id);

        if(!sale){
            return res.status(404).json({ msg: 'Sale not found'});
        }

        // Check user
        if(sale.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        sale = await Sales.updateOne(
            { _id: req.params.id },
            {
                typeofbrick,
                factoryname,
                drivername,
                vehicletype,
                quantity,
                vehicleno,
                uploaddate
            }
        );

        res.json(sale);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Sale not found'});
        }
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/sales/:id
// @desc    Delete a sale
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);

        if(!sale){
            return res.status(404).json({ msg: 'Sale not found'});
        }

        // Check user
        if(sale.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await sale.remove();

        res.json({ msg: 'Sale deleted' });
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'Sale not found'});
        }
        res.status(500).send('Server error');
    }
});

// @route  GET api/sales/filter
// @desc   Get all sales of a user with filter options
// @access Private
router.get('/filter', auth, async (req, res) => {
    try {
        const {
            typeofbrick,
            factoryname,
            drivername,
            vehicletype,
            vehicleno,
            uploaddate
        } = req.query;
        
        let query = {
            typeofbrick,
            factoryname,
            drivername,
            vehicletype,
            vehicleno,
            uploaddate
        }
        if(query.typeofbrick==''){
            delete query.typeofbrick
        }
        if(query.factoryname==''){
            delete query.factoryname
        }
        if(query.drivername==''){
            delete query.drivername
        }
        if(query.vehicletype==''){
            delete query.vehicletype
        }
        if(query.vehicleno==''){
            delete query.vehicleno
        }
        if(query.uploaddate==''){
            delete query.uploaddate
        }
        const sales = await Sales.find(query).sort({ date: -1});
        res.json(sales);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;