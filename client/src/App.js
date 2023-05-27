import './styles/App.css';
import Header from './components/Header';
import AddMed from './components/pages/AddMed';
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp';
import TodaysMeds from './components/pages/TodaysMeds';

import medic from './assets/medicSeedPractice'

function App() {
  return (
    <div>
      <Header />
      <TodaysMeds medic={medic}/>
    </div>
  );
}

export default App;
