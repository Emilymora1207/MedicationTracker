import logo from '../assets/Asset1.svg';

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    todaysMeds: {
        width: '30%',
        display: 'flex',
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
    borderSides: {
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    },
    eachMed: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255), rgb(77, 204, 255)',
        borderRadius: '5px',
        margin: '10px',
        color: 'white'
    },
    checkbox: {
        // 'appearance': 'none',
        accentColor: 'rgb(14, 56, 107)',
        color: 'rgb(41, 227, 0)',
        height: '20px',
        width: '20px',
        border: '2px, black, solid',
        borderRadius: '50%', 
        background: 'white',
        ':focus': {
            color: 'rgb(150, 239, 116)'
        }
        },
    }

function TodaysMeds({ medic }) {
    return (
        <div style={styles.centered}>
            <h1>Today's Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <div style={styles.todaysMeds}>
                <div style={styles.borderSides}></div>
                <form style={styles.form}>
                    {medic.map((medic) => (
                        <div style={styles.eachMed}>
                            <label id={medic.name} style={styles.label}>
                                <h3>{medic.name}</h3>
                                <p>{medic.dosage}</p>
                            </label>
                            <input htmlfor={medic.name} type='checkbox' style={styles.checkbox} />
                        </div>
                    ))}
                </form>
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default TodaysMeds;