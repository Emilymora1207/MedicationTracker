import logo from '../assets/Asset1.svg';

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

function EditMed({ medic }) {

    return (
        <div style={styles.centered}>
            <h1>Update Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            {/* adds the gradient border */}
            <div style={styles.addMed}>
                <div style={styles.borderSides}></div>
                <form style={styles.form}>
                    <label style={styles.labels} for='medName'>Medication Name: </label>
                    <input defaultValue={medic[0].name} style={styles.inputs} type='text' name='medName' />
                    <label style={styles.labels} for='range'>How often do you take your Medication? </label>
                    <div style={styles.selects}>
                        <select defaultValue={medic[0].subRange} style={styles.inputs} name='subRange'>
                            <option value='every'>Every</option>
                            <option value='every other'>Every other</option>
                        </select>
                        <select defaultValue={medic[0].range} style={styles.inputs} name='range'>
                            <option value='daily'>Day</option>
                            <option value='weekly'>Week</option>
                            <option value='monthly'>Month</option>
                        </select>
                    </div>
                    <label style={styles.labels} for='amount'>How many times do you need to take this Medication? <br /><sub>if no set amount write 'N/A'</sub></label>
                    <input defaultValue={medic[0].amount || ''} style={styles.inputs} type='text' placeholder='i.e. "30"' name='amount' />
                    <label style={styles.labels} for='dosage'>What dosage do you take?</label>
                    <input defaultValue={medic[0].dosage} style={styles.inputs} type='text' placeholder='i.e. "450mg"' name='dosage' />
                    <button style={styles.button} className='addMed'>Update</button>
                </form>
                {/* adds the gradient border */}
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default EditMed;