import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AddMed from './pages/AddMed';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import TodaysMeds from './pages/TodaysMeds';
import AllMeds from './pages/AllMeds';
import EditMed from './pages/EditMed';
import FindPharm from './pages/FindPharm'
// **********************will need to delete once conttected to back end******
import medic from './assets/medicSeedPractice';


const httpLink = createHttpLink({
  uri: '/graphql',
});

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div style={{height: '100%'}}>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<TodaysMeds medic={medic}/>}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/signup'
              element={<SignUp/>}
            />
            <Route
              path='/addNew'
              element={<AddMed/>}
              />
            <Route
              path='/allMeds'
              element={<AllMeds medic={medic}/>}
              />
            <Route
              path='/update/:id'
              element={<EditMed medic={medic}/>}
              />
            <Route
              path='/findPharmacy'
              element={<FindPharm/>}
              />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
