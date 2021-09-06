import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import classes from './Cook.css';
import { addCook, updateCook, loadCook, filterCook, deleteCook } from '../../../action/cook';

const Cook = ({ cook, addCook, updateCook, loadCook, filterCook, deleteCook }) => {
    
    let tableState = [];

    const [state, setState] = useState({
        cookname: '',
        quantitycooked: '',
        uploaddate: moment().format('ll')
    });
    // State for filtering
    const [filterState, setFilterState] = useState({
        cookname: '',
        quantitycooked: '',
        uploaddate: ""
    });

    useEffect(() =>{
        loadCook();
    },[]);

    for(let key in cook){
        // console.log(sales[key]);
        tableState.push({
            ...cook[key],
            id: cook[key]._id
        })
    }
    const inputChangeHandler = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
            // uploaddate: moment().format('ll')
        });
    }

    // Add Cook submit handler
    const cookSubmitHandler = event => {
        event.preventDefault();
        setState({
            ...state,
        });
        if(state.id){
            updateCook(state);
            setState({
                cookname: '',
                quantitycooked: '',
                uploaddate: moment().format('ll')
            });
        }
        else{
            addCook(state);
            setState({
                cookname: '',
                quantitycooked: '',
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
        deleteCook(event.target.id);
    }
    const resetClickHandler = () => {
        setState({
            cookname: '',
            quantitycooked: '',
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
        filterCook(filterState);
    }


    let cookTable = null;

    if(tableState){
        cookTable = tableState.map((cook, index) => (
            <div className={classes.TableRow}>
                    <div className={classes.TableColumn}>
                        <div>{cook.cookname}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{cook.quantitycooked}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <div>{cook.uploaddate}</div>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={index} className={classes.Update} onClick={updateHandler} type='button' value="Update"/>
                    </div>
                    <div className={classes.TableColumn}>
                        <input id={cook._id} className={classes.Update} onClick={deleteHandler} type='button' value="Delete"/>
                    </div>
                </div>
        ))
    }

    return (
        <div className={classes.CookContainer}>
            <div className={classes.PageTitle}>
                Pather
            </div>
            <div className={classes.Cook}>
                <form className={classes.CookDetailsForm} onSubmit={cookSubmitHandler}>
                    <div className={classes.CookDetails}>
                        <div className={classes.CookDetailsGroup}>
                            <label>Pather Name :</label>
                            <input 
                                className={classes.CookDetailsInfo}
                                type='text' 
                                placeholder='Cook Name'
                                name="cookname"
                                onChange={inputChangeHandler}
                                required
                                value={state.cookname}
                            />
                        </div>
                        <div className={classes.CookDetailsGroup}>
                            <label>Quantity Cooked :</label>
                            <input 
                                className={classes.CookDetailsInfo}
                                type='text' 
                                placeholder='Quantity Cooked'
                                name="quantitycooked"
                                onChange={inputChangeHandler}
                                required
                                value={state.quantitycooked}
                            />
                        </div>
                        <div className={classes.CookDetailsGroup}>
                            <label>Upload Date :</label>
                            <input 
                                className={classes.CookDetailsInfo}
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
                    <lable className={classes.FilterOptionLabel}>Pather Name</lable>
                    <input 
                        placeholder='Pather Name' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='cookname'
                        value={filterState.cookname}
                        />
                </div>
                <div className={classes.FilterOption}>
                    <lable className={classes.FilterOptionLabel}>Quantity Cooked</lable>
                    <input 
                        placeholder='Quantity Cooked' 
                        type='text'
                        onChange={filterInputChangeHandler}
                        name='quantitycooked'
                        value={filterState.quantitycooked}
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
            <div className={classes.CookTableContainer}>
                <div className={classes.TableRowHeader}>
                    <div className={classes.TableColumnHeader}>
                        Pather Name
                    </div>
                    <div className={classes.TableColumnHeader}>
                        Quantity Cooked
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
                {cookTable}
            </div>
        </div>
    )
}

Cook.propTypes = {
    addCook: PropTypes.func.isRequired,
    updateCook: PropTypes.func.isRequired,
    loadCook: PropTypes.func.isRequired,
    filterCook: PropTypes.func.isRequired,
    deleteCook: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cook: state.cook.cook,
});

export default connect(mapStateToProps, { addCook, updateCook, loadCook, filterCook, deleteCook })(Cook);