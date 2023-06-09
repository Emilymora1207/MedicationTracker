import logo from '../assets/Asset1.svg';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { HashRouter as Router, useNavigate } from 'react-router-dom';
import { UPDATE_MED } from '../utils/mutations';
import { QUERY_SINGLE_MEDIC } from '../utils/queries';

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addMed: {
        display: 'flex',
        width: '30%',
    },
    form: {
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-around',
        borderRadius: '0%',
        alignItems: 'center',
        width: '97.6%'
    },
    question: {
        display: 'flex',
        padding: '15px',
        justifyContent: 'space-between',
        // alignItems: 'space-between'
    },
    inputs: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px black solid',
        height: '20px',
        width: '80%',
        outline: 'none',
        background: 'none',
        margin: '15px 0'
    },
    selects: {
        display: 'flex',
    },
    labels: {
        width: '80%',
        textAlign: 'left',
        margin: '15px 0'
    },
    buttonGrey: {
        margin: '5px',
        cursor: 'pointer',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        height: '38px',
        padding: '8px 24px',
        borderRadius: '50px',
        backgroundImage: 'linear-gradient(45deg, rgb(115, 115, 115) ,rgb(160, 160, 160))',
        border: 'none',
        boxShadow: '0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
        transition: 'all .2s ease-out',
        ':hover': {
            boxShadow: '0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%)',
        }
    },
    button: {
        cursor: 'pointer',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        height: '38px',
        padding: '8px 24px',
        borderRadius: '50px',
        border: 'none',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255),rgb(107, 236, 56))',
        boxShadow: '0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
        transition: 'all .2s ease-out',
        ':hover': {
            boxShadow: '0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%)',
        }
    },
    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'right'
    },
    borderSides: {
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    }
}

function EditMed() {
    const navigate= useNavigate();
    const [err, setErr] = useState(false)
    const { id } = useParams()
    // grabbing the medication to update
    const { loading, data } = useQuery(QUERY_SINGLE_MEDIC, {
        // pass URL parameter
        variables: { medicId: id },
    });
    console.log(data);
    const medic = data?.getMedic || {};
    console.log(medic)



   
    //updating the medication 

    const [weekQuestion, setWeekQuestion] = useState(false);
    const [MonthQuestion, setMonthQuestion] = useState(false);

    const [formState, setFormState] = useState({
        name: medic.name,
        dosage: medic.dosage,
        amount: medic.amount,
        range: medic.range,
        everyOtherTime: medic.everyOtherTime || undefined,
        dayOfWeek: medic.dayOfWeek || undefined,
        dayOfMonth: medic.dayOfMonth || undefined,
        userId: ''
    });

    const [updateMed, { error, response }] = useMutation(UPDATE_MED);
 if (loading) {
        return <div>Loading...</div>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === 'week') {
            setWeekQuestion(true)
            setMonthQuestion(false)
            return value
        } else if (value === 'month') {
            setMonthQuestion(true)
            setWeekQuestion(false)
            return value
        } else if (value === 'day') {
            setWeekQuestion(false);
            setMonthQuestion(false);
            return value
        }

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { response } = await updateMed({
                variables: {medicId: id, medic: {
                    ...formState, 
                    amount: parseInt(formState.amount),
                    dayOfWeek: parseInt(formState.dayOfWeek),
                    dayOfMonth: parseInt(formState.dayOfMonth),
                    everyOtherTime: formState.everyOtherTime === "true" ? true : null
                } },
            });
            navigate('/allMeds')
            window.location.reload(false)
            setErr(false);
        } catch (e) {
            console.error(e);
            setErr(true)
        }
    };

    return (
        <div style={styles.centered}>
            <h1>Update Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            {/* adds the gradient border */}
            <div style={styles.addMed}>
                <div style={styles.borderSides}></div>
                <form onSubmit={handleFormSubmit} style={styles.form}>
                    <label
                        style={styles.labels}
                        for='name'>Medication Name: </label>
                    <input
                        onChange={handleChange}
                        defaultValue={medic.name}
                        style={styles.inputs}
                        type='text'
                        name='name' />
                    <label
                        style={styles.labels}
                        for='range'>How often do you take your Medication? </label>
                    <div style={styles.selects}>
                        <select
                            onChange={handleChange}
                            style={styles.inputs}
                            name='everyOtherTime'>
                            <option selected={medic.everyOtherTime === undefined}>Every</option>
                            <option selected={medic.everyOtherTime === (true || false)}
                                value='true'>Every other</option>
                        </select>
                        <select
                            onChange={handleChange}
                            defaultValue={medic.range}
                            style={styles.inputs}
                            name='range'>
                            <option
                                selected={medic.range === 'day'}
                                value='day'>Day</option>
                            <option
                                selected={medic.range === 'week'}
                                value='week'>Week</option>
                            <option
                                selected={medic.range === 'month'}
                                value='month'>Month</option>
                        </select>
                    </div>
                    {weekQuestion ? (<div><h3>What day of the week do you take your Medication? </h3><select onChange={handleChange} name='dayOfWeek'>
                        <option 
                        selected={medic.dayOfWeek === 0} 
                        value='0'>Sunday</option>
                        <option 
                        selected={medic.dayOfWeek === 1} 
                        value='1'>Monday</option>
                        <option 
                         selected={medic.dayOfWeek === 2} 
                        value='2'>Tuesday</option>
                        <option 
                        selected={medic.dayOfWeek === 3} 
                        value='3'>Wednesday</option>
                        <option 
                        selected={medic.dayOfWeek === 4} 
                        value='4'>Thursday</option>
                        <option 
                        selected={medic.dayOfWeek === 5} 
                        value='5'>Friday</option>
                        <option 
                        selected={medic.dayOfWeek === 6} 
                        value='6'>Saturday</option>
                    </select></div>) : ('')}
                    {MonthQuestion ? (<div><h3>What day of the Month do you take your Medication? </h3><select onChange={handleChange} name='dayOfMonth'>
                        <option 
                        selected={medic.dayOfMonth === 1} 
                        value='1'>1</option>
                        <option 
                        selected={medic.dayOfMonth === 2}
                        value='2'>2</option>
                        <option 
                        selected={medic.dayOfMonth === 3}
                        value='3'>3</option>
                        <option 
                        selected={medic.dayOfMonth === 4}
                        value='4'>4</option>
                        <option 
                        selected={medic.dayOfMonth === 5}
                        value='5'>5</option>
                        <option 
                        selected={medic.dayOfMonth === 6}
                        value='6'>6</option>
                        <option 
                        selected={medic.dayOfMonth === 7}
                        value='7'>7</option>
                        <option 
                        selected={medic.dayOfMonth === 8}
                        value='8'>8</option>
                        <option 
                        selected={medic.dayOfMonth === 9}
                        value='9'>9</option>
                        <option 
                        selected={medic.dayOfMonth === 10}
                        value='10'>10</option>
                        <option 
                        selected={medic.dayOfMonth === 11}
                        value='11'>11</option>
                        <option 
                        selected={medic.dayOfMonth === 12}
                        value='12'>12</option>
                        <option 
                        selected={medic.dayOfMonth === 13}
                        value='13'>13</option>
                        <option 
                        selected={medic.dayOfMonth === 14}
                        value='14'>14</option>
                        <option 
                        selected={medic.dayOfMonth === 15}
                        value='15'>15</option>
                        <option 
                        selected={medic.dayOfMonth === 16}
                        value='16'>16</option>
                        <option 
                        selected={medic.dayOfMonth === 17}
                        value='17'>17</option>
                        <option 
                        selected={medic.dayOfMonth === 18}
                        value='18'>18</option>
                        <option 
                        selected={medic.dayOfMonth === 19}
                        value='19'>19</option>
                        <option 
                        selected={medic.dayOfMonth === 20}
                        value='20'>20</option>
                        <option 
                        selected={medic.dayOfMonth === 21}
                        value='21'>21</option>
                        <option 
                        selected={medic.dayOfMonth === 22}
                        value='22'>22</option>
                        <option 
                        selected={medic.dayOfMonth === 23}
                        value='23'>23</option>
                        <option 
                        selected={medic.dayOfMonth === 24}
                        value='24'>24</option>
                        <option 
                        selected={medic.dayOfMonth === 25}
                        value='25'>25</option>
                        <option 
                        selected={medic.dayOfMonth === 26}
                        value='26'>26</option>
                        <option 
                        selected={medic.dayOfMonth === 27}
                        value='27'>27</option>
                        <option 
                        selected={medic.dayOfMonth === 28}
                        value='28'>28</option>
                        <option 
                        selected={medic.dayOfMonth === 29}
                        value='29'>29</option>
                        <option 
                        selected={medic.dayOfMonth === 30}
                        value='30'>30</option>
                        <option 
                        selected={medic.dayOfMonth === 31}
                        value='31'>31</option>
                    </select></div>) : ('')}
                    <label
                        style={styles.labels}
                        for='amount'>How many times do you need to take this Medication? <br /><sub>if no set amount write 'N/A'</sub></label>
                    <input 
                        onChange={handleChange}
                        defaultValue={medic.amount || ''}
                        style={styles.inputs}
                        type='text'
                        placeholder='i.e. "30"'
                        name='amount' />
                    <label
                        style={styles.labels}
                        for='dosage'>What dosage do you take?</label>
                    <input
                        onChange={handleChange}
                        defaultValue={medic.dosage}
                        style={styles.inputs}
                        type='text'
                        placeholder='i.e. "450mg"'
                        name='dosage' />
                    <div style={styles.buttons}>
                    <button
                        type='submit'
                        style={styles.button}
                        className='addMed'>Update</button>
                        <Link to='/allMeds'>
                        <button 
                            type='cancel'
                            style={styles.buttonGrey}></button>
                           </Link> 
                    </div>
                </form>
                {/* adds the gradient border */}
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default EditMed;