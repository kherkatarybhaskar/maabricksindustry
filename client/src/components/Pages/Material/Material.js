import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import classes from './Material.css';
import { addMaterial, updateMaterial, loadMaterial, filterMaterial, deleteMaterial } from '../../../action/material';

const Material = ({ material, addMaterial, updateMaterial, loadMaterial, filterMaterial, deleteMaterial }) => {
    
    let tableState = [];

    const [state, setState] = useState({
        vehicleplateno: "",
        drivername: "",
        vehicletype: "",
        materialname: "",
        quantity: "",
        sender: "",
        uploaddate: moment().format('ll')
    });
    // State for filtering
    const [filterState, setFilterState] = useState({
        vehicleplateno: "",
        drivername: "",
        vehicletype: "",
        materialname: "",
        quantity: "",
        sender: "",
        uploaddate: ""
    });

    useEffect(() =>{
        loadMaterial();
    },[]);

    for(let key in material){
        // console.log(sales[key]);
        tableState.push({
            ...material[key],
            id: material[key]._id
        })
    }
    const inputChangeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
            // uploaddate: moment().format('ll')
        });
    }

    // Add Material submit handler
    const materialSubmitHandler = event => {
        event.preventDefault();
        setState({
            ...state,
        });
        if(state.id){
            updateMaterial(state);
            setState({
                vehicleplateno: "",
                drivername: "",
                vehicletype: "",
                materialname: "",
                quantity: "",
                sender: "",
                uploaddate: moment().format('ll')
            });
        }
        else{
            addMaterial(state);
            setState({
                vehicleplateno: "",
                drivername: "",
                vehicletype: "",
                materialname: "",
                quantity: "",
                sender: "",
                uploaddate: moment().format('ll')
            });
        }
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
        deleteMaterial(event.target.id);
    }
    const resetClickHandler = () => {
        setState({
            vehicleplateno: "",
            drivername: "",
            vehicletype: "",
            materialname: "",
            quantity: "",
            sender: "",
            uploaddate: moment().format('ll')
        })
    }
    // Filter sale input change handler
    const filterInputChangeHandler = event => {
        setFilterState({
            ...filterState,
            [event.target.name]: event.target.value,
        });
    }
    // Filter submit handler
    const filterSubmitHandler = (event) => {
        event.preventDefault();
        filterMaterial(filterState);
    }


    let materialTable = null;

    if(tableState){
        materialTable = tableState.map((material, index) => (
            <div className={classes.TableRow}>
                    <div className={classes.TableColumn}>
                        <div>{material.vehicleplateno}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.drivername}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.vehicletype}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.materialname}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.quantity}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.sender}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{material.uploaddate}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={index} className={classes.Update} onClick={updateHandler} type='button' value="Update"/>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={material._id} className={classes.Update} onClick={deleteHandler} type='button' value="Delete"/>
                    </div>
                </div>
        ))
    }

    return (
        <div className={classes.MaterialContainer}>
            <div className={classes.PageTitle}>
                Material
            </div>
            <div className={classes.Material}>
                <form className={classes.MaterialDetailsForm} onSubmit={materialSubmitHandler}>
                    <div className={classes.MaterialDetails}>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Vehicle Plate No :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Vehicle Plate No'
                                name="vehicleplateno"
                                onChange={inputChangeHandler}
                                required
                                value={state.vehicleplateno}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Driver Name :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Driver Name'
                                name="drivername"
                                onChange={inputChangeHandler}
                                required
                                value={state.drivername}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Vehicle Type :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Vehicle Type'
                                name="vehicletype"
                                onChange={inputChangeHandler}
                                required
                                value={state.vehicletype}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Material Name :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Material Name'
                                name="materialname"
                                onChange={inputChangeHandler}
                                required
                                value={state.materialname}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Quantity :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Quantity'
                                name="quantity"
                                onChange={inputChangeHandler}
                                required
                                value={state.quantity}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Sender :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                placeholder='Sender'
                                name="sender"
                                onChange={inputChangeHandler}
                                required
                                value={state.sender}
                            />
                        </div>
                        <div className={classes.MaterialDetailsGroup}>
                            <label>Upload Date :</label>
                            <input 
                                className={classes.MaterialDetailsInfo}
                                type='text' 
                                // placeholder='Da'
                                name="uploaddate"
                                onChange={inputChangeHandler}
                                required
                                value={state.uploaddate}
                            />
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
                    </div>
                </form>
            </div>
            <div className={classes.FilterOptions}>
                
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Vehicle Plate No</lable>
                    <input 
                        placeholder='Vehicle Plate No' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='vehicleplateno'
                        value={filterState.vehicleplateno}
                        />
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
                    <lable className={classes.FilterOptionLabel}>Material Name</lable>
                    <input 
                        placeholder='Material Name' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='materialname'
                        value={filterState.materialname}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Quantity</lable>
                    <input 
                        placeholder='Quantity' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='quantity'
                        value={filterState.quantity}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Sender</lable>
                    <input 
                        placeholder='Sender' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='sender'
                        value={filterState.sender}
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
            <div className={classes.MaterialTableContainer}>
                <div className={classes.TableRowHeader}>
                    <div className={classes.TableColumnHeader}>
                        Vehicle Plate No
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Driver Name
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Vehicle Type
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Material Name
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Quantity
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Sender
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
                {materialTable}
            </div>
        </div>
    )
}

Material.propTypes = {
    addMaterial: PropTypes.func.isRequired,
    updateMaterial: PropTypes.func.isRequired,
    loadMaterial: PropTypes.func.isRequired,
    filterMaterial: PropTypes.func.isRequired,
    deleteMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    material: state.material.material,
});

export default connect(mapStateToProps, { addMaterial, updateMaterial, loadMaterial, filterMaterial, deleteMaterial })(Material);