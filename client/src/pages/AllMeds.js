import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_MEDICS, QUERY_ME } from '../utils/queries';
import { REMOVE_MED } from '../utils/mutations';

import logo from '../assets/Asset1.svg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { useState } from 'react';
// import '../styles/pages.css'


const styles = {
  centered: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  allMeds: {
    width: '30%',
    display: 'flex',

    // justifyContent: 'center',
  },
  outsideForm: {

    display: 'flex',
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
    justifyContent: 'space-around',
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

  // const [removeMed, { error }] = useMutation(REMOVE_MED, {
  //   update(cache, { data: { removeMed } }) {
  //     try {
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: removeMed },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });

  const handleDeleteMed= async (medic) => {
    // try {
    //   const { data } = await removeMed({
    //     variables: { medic },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };
  
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { medicId } = useParams();

  const { loading, data } = useQuery(QUERY_MEDICS, {
    // pass URL parameter
    variables: { medicId: medicId },
  });
  console.log(data);
  const medic = data?.medics?.medics || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={styles.centered}>
      <h1>{`All Medication`}</h1>
      <img style={{ height: '100px' }} alt="logo" src={logo} />
      <div style={styles.allMeds}>
        <div style={styles.borderSides}></div>
            <form style={styles.form} onSubmit={(e) => { e.preventDefault() }}>
            {data?.medics?.medics.lenght === 0 ? (<div style={styles.centered}><h2>You have no medications added!</h2><p>Click <Link to='/addMed'>here</Link> to add a new medication</p></div>) : ('')}
              {medic.map((medic) => {
                return (
                  <div className={`${medic.name}`} style={styles.eachMed}>
                    <h3>{medic.name}</h3>
                    <p>{medic.dosage}</p>
                    <div style={styles.buttons}>
                      <Link to={`/update/${medic._id}`}> <button style={styles.button}>Update</button></Link>
                      <Popup style={styles.popUp} trigger={<button
                        style={styles.buttonGrey}
                         >Delete</button>}
                        closeOnDocumentClick
                        closeOnEscape
                        modal
                        nested
                      >
                        {close => (
                          <div >
                            <h3>Do you want to delete this medication?</h3>
                            <button onClick={handleDeleteMed(medic.id)} style={styles.button}>Delete</button>
                            <button  onClick={() => close()} style={styles.buttonGrey}
                            >Cancel</button>
                          </div>
                        )}

                      </Popup>
                    </div>
                  </div>
                )
              })}
            </form>
            <div style={styles.borderSides}></div>
        </div>

      {/* </div> */}
    </div>
  )
}

export default AllMeds;