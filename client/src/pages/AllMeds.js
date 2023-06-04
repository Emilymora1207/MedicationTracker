import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_MEDICS } from '../utils/queries';

import logo from '../assets/Asset1.svg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { useState } from 'react';


const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    allMeds: {
        width: '60%',
        display: 'flex',
    },
    outsideForm: {

        display:'flex',
        // flexDirection: 'row'
    },
    activeInactive: {
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '0%',
        alignItems: 'center',
        width: '48.8%'
    },
    form: {
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '0%',
        alignItems: 'center',
        width: '100%'
    },
    borderSides: {
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    },
    eachMed: {
        display: 'flex',
        // justifyContent: 'space-around',
        width: '80%',
        borderBottom: '1px black solid',
        // margin: '10px',
        flexDirection: 'column'
    },
    button: {
        margin: '5px',
        cursor: 'pointer',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        height: '38px',
        padding: '8px 24px',
        borderRadius: '50px',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255),rgb(77, 204, 255))',
        border: 'none',
        boxShadow: '0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
        transition: 'all .2s ease-out',
        ':hover': {
            boxShadow: '0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%)',
        }
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
    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'right'
    },
    popUp: {
        backgrounColor: 'white',
        borderRadius: '5px',
        position: 'fixed',
        width: '100%',
        height: '100vh',
    },
    margins: {
        margin: '0'
    }
}

function AllMeds() {

    // Use `useParams()` to retrieve value of the route parameter `:profileId`
      const { medicId } = useParams();

      const { loading, data } = useQuery(QUERY_MEDICS, {
        // pass URL parameter
        variables: { medicId: medicId },
      });
      console.log(data);
      const medic = data?.medics.medics || [];

      if (loading) {
        return <div>Loading...</div>;
      }
    return (
        <div style={styles.centered}>
            <h1>{`Emily's Medications`}</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <div style={styles.allMeds}>
                <div style={styles.borderSides}></div>
                <div style={styles.outsideForm}>
                    <div style={styles.activeInactive}>
                <h2>Active Medication</h2>
                <form style={styles.form} onSubmit={(e)=> {e.preventDefault()}}>
                    {medic.map((medic) => {
                        return (
                            <div className={medic.name} style={styles.eachMed}>
                                <h3 style={styles.margins}>{medic.name}</h3>
                                <p style={styles.margins}>{medic.dosage}</p>
                                <div style={styles.buttons}>
                                    <Link to={`/update/${medic._id}`}> <button style={styles.button} className={`update-${medic.name}`}>Update</button></Link>
                                    {/* <button
                                        onClick={() => setDeletePopup(true)}
                                        style={styles.buttonGrey}
                                        className={`delete=${medic.name}`}>Delete</button> */}
                                    <Popup style={styles.popUp} trigger={<button
                                        style={styles.buttonGrey}
                                        className={`delete=${medic.name}`}>Delete</button>} 
                                        closeOnDocumentClick
                                        closeOnEscape
                                        modal
                                        nested
                                        >
                                        { close => (
                                        <div >
                                            <h3>Do you want to delete this medication?</h3>
                                            <button style={styles.button}>Delete</button>
                                            <button onClick={() => close()} style={styles.buttonGrey}
                                                >Cancel</button>
                                        </div>
                                        )}
                                        
                                    </Popup>
                                </div>
                            </div>
                        )
                    })}
                </form>
                </div>
                <div style={styles.activeInactive}>
                <h2>Inactive Medication</h2>
                <form style={styles.form} onSubmit={(e)=> {e.preventDefault()}}>
                    {medic.map((medic) => {
                        return (
                            <div className={medic.name} style={styles.eachMed}>
                                <h3 style={styles.margins}>{medic.name}</h3>
                                <p style={styles.margins}>{medic.dosage}</p>
                                <div style={styles.buttons}>
                                    <button style={styles.button} className={`update-${medic.name}`}>Update</button>
                                    {/* <button
                                        onClick={() => setDeletePopup(true)}
                                        style={styles.buttonGrey}
                                        className={`delete=${medic.name}`}>Delete</button> */}
                                    <Popup style={styles.popUp} trigger={<button
                                        style={styles.buttonGrey}
                                        className={`delete=${medic.name}`}>Delete</button>} 
                                        closeOnDocumentClick
                                        closeOnEscape
                                        modal
                                        nested
                                        >
                                        { close => (
                                        <div style={styles.buttons} >
                                            <h3>Do you want to delete this medication?</h3>
                                            <button style={styles.button}>Delete</button>
                                            <button onClick={() => close()} style={styles.buttonGrey}
                                                >Cancel</button>
                                        </div>
                                        )}
                                        
                                    </Popup>
                                </div>
                            </div>
                        )
                    })}
                </form>
                </div>
                </div>
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default AllMeds;