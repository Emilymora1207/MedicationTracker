import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { setAutomaticRefresh } from 'react-admin';
import { useDispatch } from 'react-redux';



import dayjs from 'dayjs';
// import medic from '../assets/medicSeedPractice'

import { QUERY_MEDICS } from '../utils/queries';
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

function TodaysMeds() {
    const dispatch = useDispatch();
dispatch(setAutomaticRefresh(false))
    // window.location.reload(false)


    // const [err, setErr] = useState(false)
    // const [medicForToday, setMedicForToday] = useState([])
    // const [formState, setFormState] = useState({
    //     amount: '',
    //     everyOtherTime: ''
    // })

    //only reloads the page once a day
    const [then, setThen] = useState();
    const [now, setNow] = useState();
    const [checkThen, setCheckThen] = useState();

    const checkLastReload = () => {
        setNow(dayjs().format(MM/DD/YYYY))
        setCheckThen(localStorage.getItem('then'))
    }
    // useEffect to check if a page has been loaded today and only load a new page if its a new day
    useEffect(
        () => {
            checkLastReload();
            if (now !== checkThen || checkThen === null) {
                setThen(dayjs().format(MM/DD/YYYY))
               localStorage.setItem('then', then);
               window.location.reload();
            }
            setGetTodaysChecked(localStorage.getItem("checkedMeds"));
        },[]
    )

//persists the checked boxes on a checklist 
const [todaysChecked, setTodaysChecked] = useState([])
const [getTodaysChecked, setGetTodaysChecked] = useState();

const handleCheckedMeds = (name) => {
    setTodaysChecked.push(name)
    localStorage.setItem('checkedMeds', todaysChecked)
}

// setTodaysChecked(
//     localStorage.setItem("selectedMeds", )
//   );

//   useEffect(() => {
//     setTodaysChecked(localStorage.getItem("checkedMeds", JSON.stringify(todaysChecked)));
//   });  


    const { medicId } = useParams();

    const { loading, data } = useQuery(QUERY_MEDICS, {
        // pass URL parameter
        variables: { medicId: medicId },
    });

    const medic = data?.medic || [];

    if (loading) {
        return <div>Loading...</div>;
    }
    const [updateMed, { error, response }] = useMutation(UPDATE_MED)

    for (let i = 0; i < medic.length; i++) {

        if (medic[i].everyOtherTime !== null) {
            setFormState.everyOtherTime(!medic[i].everyOtherTime)
        }
            if (medic[i].everyOtherTime !== false && (medic.range === 'day' || (medic.range === 'week' && dayjs().day() === dayjs().day(medic[i].dayOfWeek)) || (medic.range === 'month' && dayjs().date() === dayjs().date(medic[i].dayOfMonth)))) {
                setMedicForToday.push(medic[i])
                setFormState.amount(medic[i].amount - 1);
    
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
        updateAmountAndEOT()
        }
    }
    return (
        <div style={styles.centered}>
            <h1>Today's Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <div style={styles.todaysMeds}>
                <div style={styles.borderSides}></div>
                <form style={styles.form}>
                    {medicForToday.map((medic) => (
                        <div style={styles.eachMed}>
                            <label id={medic.name} style={styles.label}>
                                <h3>{medic.name}</h3>
                                <p>{medic.dosage}</p>
                            </label>
                            <input onChange={handleCheckedMeds(medic.name)} checked={getTodaysChecked.includes({'checkedMeds': medic.name})} htmlfor={medic.name} type='checkbox' style={styles.checkbox} />
                        </div>
                    ))}
                </form>
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default TodaysMeds;