import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import classes from './Sales.css';
import { addSales, updateSales, loadSales, filterSales, deleteSales } from '../../../action/sales';


const Sales = ({ addSales, updateSales, loadSales, sales, filterSales, deleteSales }) => {

    let tableState = [];

    // State for add sale
    const [state, setState] = useState({
        typeofbrick: "grade1",
        drivername: "",
        vehicletype: "",
        quantity: "",
        vehicleno: "",
        uploaddate: moment().format('ll')
    });
    // State for filtering
    const [filterState, setFilterState] = useState({
        typeofbrick: "",
        drivername: "",
        vehicletype: "",
        vehicleno: "",
        uploaddate: ""
    });


    useEffect(() => {
        loadSales();
    }, []);


    for(let key in sales){
        // console.log(sales[key]);
        tableState.push({
            ...sales[key],
            id: sales[key]._id
        })
    }

    // Add sale input change handler
    const inputChangeHandler = event => {
        let inputValue = event.target.value;
        setState({
            ...state,
            [event.target.name]: inputValue,
            // uploaddate: moment().format('ll')
        });
    }

    // Add sale submit handler
    const salesSubmitHandler = event => {
        event.preventDefault();
        setState({
            ...state,
        });
        if(state.id){
            updateSales(state);
            setState({
            typeofbrick: "grade1",
            drivername: "",
            vehicletype: "",
            quantity: "",
            vehicleno: "",
            uploaddate: moment().format('ll')
            });
        }
        else{
            addSales(state);
            setState({
                typeofbrick: "grade1",
                drivername: "",
                vehicletype: "",
                quantity: "",
                vehicleno: "",
                uploaddate: moment().format('ll')
            });
        }
    }

    const resetClickHandler = () => {
        setState({
            typeofbrick: "grade1",
            drivername: "",
            vehicletype: "",
            quantity: "",
            vehicleno: "",
            uploaddate: moment().format('ll')
        })
    }

    // Handles table update button
    const updateHandler = (event) => {
        setState({
            ...tableState[event.target.id],
            // uploaddate: moment().format('ll')
        });
    }
    // Handles table delete button
    const deleteHandler = (event) => {
        deleteSales(event.target.id);
    }

    // Filter sale input change handler
    const filterInputChangeHandler = event => {
        setFilterState({
            ...filterState,
            [event.target.name]: event.target.value,
            // uploaddate: moment().format('ll')
        });
    }
    // Filter submit handler
    const filterSubmitHandler = (event) => {
        event.preventDefault();
        // loadSales(filterState);
        filterSales(filterState);
        console.log('Filter Clicked');
    }

    let salesTable = null;

    if(tableState){
        salesTable = tableState.map((sale, index) => (
            <div className={classes.TableRow}>
                    <div className={classes.TableColumn}>
                        <div>{sale.typeofbrick}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{sale.drivername}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{sale.vehicletype}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{sale.quantity}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{sale.vehicleno}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{sale.uploaddate}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={index} className={classes.Update} onClick={updateHandler} type='button' value="Update"/>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={sale._id} className={classes.Update} onClick={deleteHandler} type='button' value="Delete"/>
                    </div>
                </div>
        ))
    }
    return (
        <div className={classes.SalesContainer}>
            <div className={classes.PageTitle}>
                Sales
            </div>
            <div className={classes.Sales}>
                <form onSubmit={salesSubmitHandler}>
                    <div className={classes.BrickType}>
                        <label className={classes.BrickTypeContents} for="typeofbrick">Choose type of brick :-</label>
                        <select 
                            className={classes.SalesDetailsInfo} 
                            id="typeofbrick" 
                            name="typeofbrick"
                            onChange={inputChangeHandler}
                            value={state.typeofbrick}
                        >
                            <option value="firstclass">First Class</option>
                            <option value="secondclass">Second Class</option>
                            <option value="firstclassbroken">First Class Broken</option>
                            <option value="secondclassbroken">Second Class Broken</option>
                            <option value="picket">Picket</option>
                            <option value="mixture">Mixture</option>
                        </select>
                    </div>
                    <div className={classes.SalesDetails}>
                        <div className={classes.SalesDetailsGroup}>
                            <label>Driver Name :</label>
                            <input 
                                className={classes.SalesDetailsInfo}
                                type='text' 
                                placeholder='Driver Name'
                                name="drivername"
                                onChange={inputChangeHandler}
                                required
                                value={state.drivername}
                            />
                        </div>
                        <div className={classes.SalesDetailsGroup}>
                            <label>Vehicle Type :</label>
                            <input 
                                className={classes.SalesDetailsInfo} 
                                type='text' 
                                placeholder='Vehicle Type'
                                name="vehicletype"
                                onChange={inputChangeHandler}
                                required
                                value={state.vehicletype}
                            />
                        </div>
                        <div className={classes.SalesDetailsGroup}>
                            <label>Quantity :</label>
                            <input 
                                className={classes.SalesDetailsInfo} 
                                type='number' 
                                placeholder='Quantity'
                                name="quantity"
                                onChange={inputChangeHandler}
                                required
                                value={state.quantity}
                            />
                        </div>
                        <div className={classes.SalesDetailsGroup}>
                            <label>Vehicle No :</label>
                            <input 
                                className={classes.SalesDetailsInfo} 
                                type='text' 
                                placeholder='Vehicle No'
                                name="vehicleno"
                                onChange={inputChangeHandler}
                                required
                                value={state.vehicleno}
                            />
                        </div>
                        <div className={classes.SalesDetailsGroup}>
                            <label>Date & Time :</label>
                            <input 
                                className={classes.SalesDetailsInfo} 
                                type='text' 
                                placeholder='Date & Time'
                                name="uploaddate"
                                value={state.uploaddate}
                                onChange={inputChangeHandler}
                                required
                                value={state.uploaddate}
                            />
                        </div>
                    </div>
                    <div className={classes.Submit}>
                        {state.id ? 
                            <div className={classes.UpdateContainer}>
                                <input className={classes.SubmitButton} type="submit" value="Update"/>
                                <input className={classes.SubmitButton} type="submit" value="Reset" onClick={resetClickHandler}/>
                            </div>
                            :
                            <input className={classes.SubmitButton} type="submit" value="Add Sale"/>
                        }
                    </div>
                </form>
            </div>
            <div className={classes.FilterOptions}>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Brick Type</lable>
                    <select 
                            onChange={filterInputChangeHandler}
                            name='typeofbrick'
                            value={filterState.typeofbrick}
                        >
                            <option value=""></option>
                            <option value="firstclass">First Class</option>
                            <option value="secondclass">Second Class</option>
                            <option value="firstclassbroken">First Class Broken</option>
                            <option value="secondclassbroken">Second Class Broken</option>
                            <option value="picket">Picket</option>
                            <option value="mixture">Mixture</option>
                    </select>
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Driver Name</lable>
                    <input 
                        placeholder='Driver Name' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='drivername'
                        value={filterState.drivername}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Vehicle Type</lable>
                    <input 
                        placeholder='Vehicle Type' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='vehicletype'
                        value={filterState.vehicletype}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Vehicle No</lable>
                    <input 
                        placeholder='Vehicle No' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='vehicleno'
                        value={filterState.vehicleno}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Upload Date</lable>
                    <input 
                        placeholder='Upload Date' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='uploaddate'
                        value={filterState.uploaddate}
                        />
                </div>
                <div className={classes.FilterOptionSearch}>
                {/* <div className={classes.SearchButton}> */}
                    <input className={classes.SearchButton} value='Search' type='button' onClick={filterSubmitHandler}/>
                </div>
            </div>
            <div className={classes.SalesTableContainer}>
                <div className={classes.TableRowHeader}>
                    <div className={classes.TableColumnHeader}>
                        Brick Type
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Driver Name
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Vehicle Type
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Quantity
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Vehicle No
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Date & Time
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Update
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Delete
                    </div>
                </div>
                
                {salesTable}
            </div>
        </div>
        
    )
}

Sales.propTypes = {
    addSales: PropTypes.func.isRequired,
    updateSales: PropTypes.func.isRequired,
    loadSales: PropTypes.func.isRequired,
    filterSales: PropTypes.func.isRequired,
    deleteSales: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    sales: state.sales.sales,
});

export default connect(mapStateToProps, { addSales, updateSales, loadSales, filterSales, deleteSales })(Sales);