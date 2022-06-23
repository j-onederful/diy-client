import Home from './components/pages/Home'
import Blogpost from './components/pages/Blogpost'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <Router>
      {/* header/nav could be here */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          
          <Route
            path="/blog/:id"
            element={<Blogpost />}
          />
        </Routes>
      </main>
      {/* could be footer */}
    </Router>
  );
}

export default App;
