import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Counter from "./Counter";
import PayButton from "./PayButton";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" Component={Counter} />
          <Route path="/paybutton" Component={PayButton} />
        </Routes>
      </Router>
  );
}

export default App;