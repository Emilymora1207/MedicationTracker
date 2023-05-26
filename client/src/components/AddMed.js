import logo from '../assets/Asset1.svg';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    background: {
        backgroundImage: 'linear-gradient(to bottom, rgba(77, 205, 255, 0.4), rgba(69, 245, 0, 0.4))',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',

        margin: '20px'
    },
    question: {
        display: 'flex',
        padding: '15px',
        justifyContent: 'space-between',
        // alignItems: 'space-between'
    },
    inputs: {
        border: 'none',
        backgroundColor: 'rgba(136, 163, 173, 0.4)',
        height: '20px',
        borderRadius: '5px',
        width: '200px',
        margin: '5px',
        border: 'none',
        outline: 'none',
    },
    selects: {
        display: 'flex',
        flexDirection: 'column',
    },
    labels: {
        width: '300px',
    },
    button: {
        cursor: 'pointer',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        height: '38px',
        padding: '8px 24px',
        borderRadius: '50px',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255),rgb(107, 236, 56))',
        // boxShadow: '0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
        // transition: 'all .2s ease-out',
        // ':hover': {
        //     boxShadow: '0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%)',
        // }
    }
}

function AddMed() {
    return (
        <div style={styles.container}>
            <div style={styles.background}>
            <h1>Add a New Medication</h1>
            <img style={{height: '100px'}} alt="logo" src={logo} />
            <form style={styles.form}>
                <section style={styles.question} className='question'>
                    <label style={styles.labels} for='medName'>Medication Name: </label>
                    <input style={styles.inputs} type='text' name='medName' placeholder='i.e. Ibuprophen' />
                </section>
                <section style={styles.question} className='question'>
                    <label style={styles.labels} for='range'>How often do you take your Medication? </label>
                    <div style={styles.selects}>
                        <select style={styles.inputs} name='subRange'>
                            <option value='every'>Every</option>
                            <option value='everyOther'>Every other</option>
                        </select>
                        <select style={styles.inputs} name='range'>
                            <option value='daily'>Day</option>
                            <option value='weekly'>Week</option>
                            <option value='monthly'>Month</option>
                        </select>
                    </div>
                </section>
                <section style={styles.question} className='question'>
                    <label style={styles.labels} for='amount'>How many times do you need to take this Medication? <br /><sub>if no set amount write 'N/A'</sub></label>
                    <input style={styles.inputs} type='text' placeholder='i.e. "30"' name='amount' />
                </section>
                <section style={styles.question} className='question'>
                    <label style={styles.labels} for='dosage'>What dosage do you take?</label>
                    <input style={styles.inputs} type='text' placeholder='i.e. "450mg"' name='dosage' />
                </section>
            </form>
            </div>
        </div>
    )
}

export default AddMed;