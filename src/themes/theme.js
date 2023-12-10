import { createTheme } from "@mui/material";
import { amber, blue, blueGrey, grey } from "@mui/material/colors";


const rootTheme = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                a: {
                    textDecoration: "none",
                },
                ul: {
                    listStyle: "none",
                    padding: 0
                },
            }
        }
    }
}

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: blueGrey,
        divider: blueGrey[700],
        background: {
            default: blueGrey[900],
            paper: blueGrey[900],
        },
        text: {
            primary: blue[200],
            secondary: grey[500],
        },
    },
    components: {
        ...rootTheme
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: amber,
        divider: amber[200],
        text: {
            primary: grey[900],
            secondary: grey[800],
        }
    },
    components: {
        ...rootTheme
    }
})