import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';

import dayjs from 'dayjs';
// import medic from '../assets/medicSeedPractice'

import { QUERY_MEDICS, QUERY_ME } from '../utils/queries';
import { UPDATE_MED } from '../utils/mutations';

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
// function currentDay() {
//     ('#currentDay').text(dayjs().format(' MM/DD/YYYY'))
//   } ;
function TodaysMeds() {
    const [todaysChecked, setTodaysChecked] = useState([])
const [getTodaysChecked, setGetTodaysChecked] = useState();

const [then, setThen] = useState();
const [now, setNow] = useState();
const [checkThen, setCheckThen] = useState();

const [err, setErr] = useState(false)
    const [medicForToday, setMedicForToday] = useState([])
    const [formState, setFormState] = useState({
        amount: '',
        everyOtherTime: ''
    });

    const { load, usersData } = useQuery(QUERY_ME);
    const userData = usersData?.me || {}

    console.log(userData)

    //only reloads the page once a day


    const checkLastReload = () => {
        setNow(dayjs().format('MM/DD/YYYY'))
        setCheckThen(localStorage.getItem('then'))
    }
    // useEffect to check if a page has been loaded today and only load a new page if its a new day
    useEffect(
        () => {
            checkLastReload();
            if (now !== checkThen || checkThen === null) {
                setThen(dayjs().format('MM/DD/YYYY'))
               localStorage.setItem('then', then);
               window.location.reload();
            }

        },[]
    )
useEffect( 
    () => {
        setGetTodaysChecked(localStorage.getItem("checkedMeds"));
    }, [getTodaysChecked]
)

//persists the checked boxes on a checklist 


const handleCheckedMeds = (name) => {
    // setTodaysChecked.push(name)
    localStorage.setItem('checkedMeds', todaysChecked)
}

    

    const { medicId } = useParams();

    const { loading, data } = useQuery(QUERY_MEDICS, {
        // pass URL parameter
        variables: { medicId: medicId },
    });

    const medic = data?.medics.medics || [];
    console.log(medic)

// mutation for updating the medic
    const [updateMed, { error, response }] = useMutation(UPDATE_MED)


const updateAmountAndEOT = async () => {

    try {
        const { response } = await updateMed({
            variables: { ...formState },
        });

        setErr(false);
    } catch (e) {
        console.error(e);
        setErr(true)
    }
}


//goes through all the medication for that user and pulls only the ones needed for today 
    // for (let i = 0; i < medic.length; i++) {

        // only if daily, or if monthly or weekly matched today on dayjs
            const isTodayMed = medic => ((medic.everyOtherTime === true || medic.everyOtherTime ===null) && (medic.range === 'day' || (medic.range === 'week' && dayjs().day() === medic.dayOfWeek) || (medic.range === 'month' && dayjs().date() === medic.dayOfMonth))) 
            // {
    //             setMedicForToday(medicForToday.concat(medic[i]))
    //             if (medic[i].everyOtherTime !== null) {
    //                 setFormState({everyOtherTime: !medic[i].everyOtherTime})
    //             }
    //             // setMedicForToday(medicForToday  => [...medicForToday, medic[i]])
    //             // setMedicForToday.push(medic[i])
    //             setFormState({amount: (medic[i].amount - 1)});

    //     // updateAmountAndEOT()
    //     // }
    //     console.log(medicForToday)
    // }

    if (load) {
        return <div>Loading...</div>
    }
    if (loading) {
        return <div>Loading...</div>;
    };
    return (
        <div style={styles.centered}>
            <h1>Today's Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <div style={styles.todaysMeds}>
                <div style={styles.borderSides}></div>
                {Auth.loggedIn() ? (<form style={styles.form}>
                {!medic ? (<div style={styles.form}><h2>You have no medications to take today!</h2><p>Click <Link to='/addNew'>here</Link> to add a new medication</p></div>) : ('')}
                    {medic.filter(isTodayMed).map((medic) => (
                        <div style={styles.eachMed}>
                            <label id={medic.name} style={styles.label}>
                                <h3>{medic.name}</h3>
                                <p>{medic.dosage}</p>
                            </label>
                            <input 
                            onChange={handleCheckedMeds(medic.name)} 
                            // checked={getTodaysChecked.includes({'checkedMeds': medic.name})} 
                            htmlfor={medic.name} type='checkbox' style={styles.checkbox} />
                        </div>
                    ))}
                </form> ) : ( <h2>You must be logged in to view the Medication Tracker!</h2>) }
                
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}


export default TodaysMeds;