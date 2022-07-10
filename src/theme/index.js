import { createTheme } from '@material-ui/core/styles';

const bgColor = "#192346",
    bgColorDark = "#010119",
    accentColor = "#14BC95",
    accentSecondaryColor = "#1ba94c";
    // #252C49

const theme = createTheme({
  palette: {
    primary: {
      main: bgColor
    },
    secondary: {
      main: accentColor
    }
  },
});

export default theme;