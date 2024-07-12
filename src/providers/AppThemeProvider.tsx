import { GlobalStyles, colors } from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { ReactNode, createContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type ThemeContextType = {
  switchColorMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => { },
});

export function AppThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const { i18n } = useTranslation()




  let theme = useMemo(
    () =>
      createTheme({
        direction: i18n.resolvedLanguage === "ar" ? "rtl" : "ltr",
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),

        },
        status: {
          danger: 'red'
        },
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: {
                main: '#8DA290'
              },
              divider: '#232730',
              text: {
                primary: colors.grey[900],
                secondary: colors.grey[800],
              },
            }
            : {
              // palette values for dark mode
              primary: {
                main: '#8DA290'
              },
              // divider: '#232730',
              background: {
                default: '#232730',
                paper: '#232730',
              },
              text: {
                primary: '#fff',
                secondary: colors.grey[400],
              },
            }),
        },
      }),
    [mode]
  );
  theme = responsiveFontSizes(theme)
  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
            },

          }}
        />
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
