import { ADD_MED } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

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
    const [err, setErr] = useState(false);

    const [weekQuestion, setWeekQuestion] = useState(false)
    const [MonthQuestion, setMonthQuestion] = useState(false)

    const [formState, setFormState] = useState({
        name: '',
        dosage: '',
        amount: '',
        range: '',
        everyOtherTime: '',
        userId: ''

    });

    // const [checkPw, setCheckPw] = useState({
    //     password: '',
    //     confirmPw: '',
    // })

    const [addMed, { error, response }] = useMutation(ADD_MED);

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {}
    if (loading) {
        return <div></div>
    }
    console.log(userData)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { response } = await addMed({
                variables: { ...formState },
            });

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
                    <input onChange={handleChange} style={styles.inputs} type='text' name='medName' />
                    <label style={styles.labels} for='range'>How often do you take your Medication? </label>
                    <div style={styles.selects}>
                        <select style={styles.inputs} name='subRange'>
                            <option className='every'>Every</option>
                            <option
                                className='everyOther'
                                value='true'>Every other</option>
                        </select>
                        <select style={styles.inputs} name='range'>
                            <option value='day'>Day</option>
                            <option value='week'>Week</option>
                            <option value='month'>Month</option>
                        </select>
                    </div>
                    <label style={styles.labels} for='amount'>How many times do you need to take this Medication? <br /><sub>if no set amount write 'N/A'</sub></label>
                    <input style={styles.inputs} type='text' placeholder='i.e. "30"' name='amount' />
                    <label style={styles.labels} for='dosage'>What dosage do you take?</label>
                    <input style={styles.inputs} type='text' placeholder='i.e. "450mg"' name='dosage' />
                    <button style={styles.button} className='addMed'>Add Medication</button>
                </form>
                {/* adds the gradient border */}
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default AddMed;