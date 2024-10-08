import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Counter from "./Counter";
import PayButton from "./PayButton";
import Main from "./Main";
import GeneratePaymentButton from "./GeneratePaymentButton";
import EnvironmentSelector from "./EnvironmentSelector";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/counter" Component={Counter} />
          <Route path="/paybutton" Component={PayButton} />
          <Route path="/generate-payment-button" Component={GeneratePaymentButton} />
          <Route path="/environment-selector" Component={EnvironmentSelector} />
        </Routes>
      </Router>
  );
}

export default App;