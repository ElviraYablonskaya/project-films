import Router from "./pages/Router";
import ThemeProvider from "./context/Theme/Provider";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSelectors, setThemeValue } from "./redux/reducers/themeSlice";
import { Theme } from "./@types";

function App() {
  const themeValue = useSelector(ThemeSelectors.getThemeValue);
  const dispatch = useDispatch();
  const onChangeTheme = (value: Theme) => () => {
    dispatch(setThemeValue(value));
  };
  return (
    <>
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
