import { ADD_MED } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { HashRouter as Router, useNavigate } from 'react-router-dom';

import logo from '../assets/Asset1.svg';

const styles = {
    container: {
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
    borderSides: {
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    }
}

function AddMed() {
    const navigate= useNavigate();
    const [err, setErr] = useState(false);
    
    const [weekQuestion, setWeekQuestion] = useState(false)
    const [MonthQuestion, setMonthQuestion] = useState(false)

    const [formState, setFormState] = useState({
        name: '',
        dosage: '',
        amount: '',
        range: 'day',
        everyOtherTime: null,
        dayOfWeek: null,
        dayOfMonth: null,
        userId: ''

    });

    const [addMedic, { error, response }] = useMutation(ADD_MED);

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {}
    if (loading) {
        return <div></div>
    }
    console.log(userData)

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.value === 'week') {
            setWeekQuestion(true);
            setMonthQuestion(false);
            setFormState({dayOfMonth: null});
        } else if (event.target.value === 'month') {
            setMonthQuestion(true);
            setWeekQuestion(false);
            setFormState({dayOfWeek: null});
        } else if (event.target.value === 'day') {
            setWeekQuestion(false);
            setMonthQuestion(false);
            setFormState({dayOfWeek: null});
            setFormState({dayOfMonth: null});
        }

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        setFormState({userId: userData._id});
        event.preventDefault();
        console.log(formState);

        try {
            const { response } = await addMedic({
                variables: { medic: {
                    ...formState, 
                    amount: parseInt(formState.amount),
                    dayOfWeek: parseInt(formState.dayOfWeek),
                    dayOfMonth: parseInt(formState.dayOfMonth),
                    everyOtherTime: formState.everyOtherTime === "true" ? true : null
                } },  
            });

            navigate('/allMeds')
            window.location.reload(false)

            return response
            setErr(false);
        } catch (e) {
            console.error(e);
            setErr(true)
        }
    };

    return (
        <div style={styles.container}>
            <h1>Add a New Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            {/* adds the gradient border */}
            <div style={styles.addMed}>
                <div style={styles.borderSides}></div>
                <form onSubmit={handleFormSubmit} style={styles.form}>
                    <label style={styles.labels} for='medName'>Medication Name: </label>
                    <input onChange={handleChange} style={styles.inputs} type='text' name='name' />
                    <label style={styles.labels} for='range'>How often do you take your Medication? </label>
                    <div style={styles.selects}>
                        <select onChange={handleChange} style={styles.inputs} name='everyOtherTime'>
                            <option>Every</option>
                            <option value='true'>Every other</option>
                        </select>
                        <select onChange={handleChange} style={styles.inputs} name='range'>
                            <option value='day'>Day</option>
                            <option value='week'>Week</option>
                            <option value='month'>Month</option>
                        </select>
                    </div>
                    {weekQuestion ? (<div><label style={styles.labels} for='dayOfWeek' >What day of the week do you take your Medication? </label><select style={styles.inputs} onChange={handleChange} name='dayOfWeek'>
                        <option value='0'>Sunday</option>
                        <option value='1'>Monday</option>
                        <option value='2'>Tuesday</option>
                        <option value='3'>Wednesday</option>
                        <option value='4'>Thursday</option>
                        <option value='5'>Friday</option>
                        <option value='6'>Saturday</option>
                    </select></div>) : ('')}
                    {MonthQuestion ? (<div><label style={styles.labels} for='dayOfMonth'>What day of the Month do you take your Medication? </label><select style={styles.inputs} onChange={handleChange} name='dayOfMonth'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                        <option value='20'>20</option>
                        <option value='21'>21</option>
                        <option value='22'>22</option>
                        <option value='23'>23</option>
                        <option value='24'>24</option>
                        <option value='25'>25</option>
                        <option value='26'>26</option>
                        <option value='27'>27</option>
                        <option value='28'>28</option>
                        <option value='29'>29</option>
                        <option value='30'>30</option>
                        <option value='31'>31</option>
                    </select></div>) : ('')}
                    <label style={styles.labels} for='amount'>How many times do you need to take this Medication? <br /><sub>if no set amount write 'N/A'</sub></label>
                    <input onChange={handleChange} style={styles.inputs} type='text' placeholder='i.e. "30"' name='amount' />
                    <label style={styles.labels} for='dosage'>What dosage do you take?</label>
                    <input onChange={handleChange} style={styles.inputs} type='text' placeholder='i.e. "450mg"' name='dosage' />
                    <button style={styles.button} className='addMed'>Add Medication</button>
                </form>
                {/* adds the gradient border */}
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default AddMed;