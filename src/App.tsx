import './App.css';
import { Header } from './components/header';
import { Main } from './components/main';

function App() {
    return (
        <div className='schedule-container'>
            <h1>Weekly Schedule</h1>
            <div className='schedule-grid'>
                <Header />
                <Main />
            </div>
        </div>
    );
}

export default App;
