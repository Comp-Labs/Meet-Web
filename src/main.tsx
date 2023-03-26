import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/public-sans';
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import customTheme from "./theme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // NOTE: Not using StrictMode to avoid the double execution of useEffect
  // while trying out the sample
  <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}
    >
  <App />
  </CssVarsProvider>
);
