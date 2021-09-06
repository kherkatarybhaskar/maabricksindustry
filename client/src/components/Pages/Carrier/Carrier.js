import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import classes from './Carrier.css';
import { addCarrier, updateCarrier, loadCarrier, filterCarrier, deleteCarrier } from '../../../action/carrier';

const Carrier = ({ carrier, addCarrier, updateCarrier, loadCarrier, filterCarrier, deleteCarrier }) => {
    
    let tableState = [];

    const [state, setState] = useState({
        carriername: '',
        uploaddate: moment().format('ll')
    });
    // State for filtering
    const [filterState, setFilterState] = useState({
        carriername: '',
        uploaddate: ""
    });

    useEffect(() =>{
        loadCarrier();
    },[]);

    for(let key in carrier){
        // console.log(sales[key]);
        tableState.push({
            ...carrier[key],
            id: carrier[key]._id
        })
    }
    const inputChangeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
            // uploaddate: moment().format('ll')
        });
    }

    // Add Carrier submit handler
    const carrierSubmitHandler = event => {
        event.preventDefault();
        setState({
            ...state,
        });
        if(state.id){
            updateCarrier(state);
            setState({
                carriername: '',
                uploaddate: moment().format('ll')
            });
        }
        else{
            addCarrier(state);
            setState({
                carriername: '',
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
        deleteCarrier(event.target.id);
    }
    const resetClickHandler = () => {
        setState({
            carriername: '',
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
        console.log('Filter Clicked');
        filterCarrier(filterState);
    }


    let carrierTable = null;

    if(tableState){
        carrierTable = tableState.map((carrier, index) => (
            <div className={classes.TableRow}>
                    <div className={classes.TableColumn}>
                        <div>{carrier.carriername}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{carrier.uploaddate}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={index} className={classes.Update} onClick={updateHandler} type='button' value="Update"/>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={carrier._id} className={classes.Update} onClick={deleteHandler} type='button' value="Delete"/>
                    </div>
                </div>
        ))
    }

    return (
        <div className={classes.CarrierContainer}>
            <div className={classes.PageTitle}>
                Cycle Party
            </div>
            <div className={classes.Carrier}>
                <form className={classes.CarrierDetailsForm} onSubmit={carrierSubmitHandler}>
                    <div className={classes.CarrierDetails}>
                        <div className={classes.CarrierDetailsGroup}>
                            <label>Cycle Party Name :</label>
                            <input 
                                className={classes.CarrierDetailsInfo}
                                type='text' 
                                placeholder='Cycle Party Name'
                                name="carriername"
                                onChange={inputChangeHandler}
                                required
                                value={state.carriername}
                            />
                        </div>
                        <div className={classes.CarrierDetailsGroup}>
                            <label>Upload Date :</label>
                            <input 
                                className={classes.CarrierDetailsInfo}
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
                    <lable className={classes.FilterOptionLabel}>Cycle Party Name</lable>
                    <input 
                        placeholder='Cycle Party Name' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='carriername'
                        value={filterState.carriername}
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
            <div className={classes.CarrierTableContainer}>
                <div className={classes.TableRowHeader}>
                    <div className={classes.TableColumnHeader}>
                        Cycle Party Name
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Date
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Update
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Delete
                    </div>
                </div>
                {carrierTable}
            </div>
        </div>
    )
}

Carrier.propTypes = {
    addCarrier: PropTypes.func.isRequired,
    updateCarrier: PropTypes.func.isRequired,
    loadCarrier: PropTypes.func.isRequired,
    filterCarrier: PropTypes.func.isRequired,
    deleteCarrier: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    carrier: state.carrier.carrier,
});

export default connect(mapStateToProps, { addCarrier, updateCarrier, loadCarrier, filterCarrier, deleteCarrier })(Carrier);