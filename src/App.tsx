import CardList from "./components/CardList/CardList";
//import CardList from "./components/CardList/CardList";
import Header from "./components/Header";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      <Header /> 
      {/* <SignIn/> */}
      <CardList moviesList={[]} />

    </div>
  );
}

export default App;
