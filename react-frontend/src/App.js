import './css/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './login/Login';
import Register from './login/Register';
import FitnessGame from './fitness-game/FitnessGame';
import Covid from './covid/Covid';


const cache = new InMemoryCache({
  typePolicies: {
      Query: {
          fields: {
              courses: {
                  merge(existing = [], incoming) {
                      return [...existing, ...incoming];
                  },
              },
          },
      },
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:2003/users',
  cache,
});

function App () {
  return(
    <>
    <ApolloProvider client={client}>
    <Router>
    <div className="container">
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/fitness-game" element={<FitnessGame/>}/>
        <Route path="/covid" element={<Covid/>}/>
        
        <Route  path="*" element={<NotFound/>}/>
      </Routes>
      </div>
    </Router>
    </ApolloProvider>
    </>
  );
}
export default App;