
import { Box } from "@mui/material";
import { QuickAccess } from "./components/layout/QuickAccess";
import AppNavbar from "./components/layout/AppNavbar";
import { Outlet } from "react-router-dom";
import { AppAuthProvider } from "./providers/AppAuthProvider";
import { AppToaster } from "./components/common/AppToaster";
import { useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";







function App() {

  const { i18n } = useTranslation()
  useLayoutEffect(() => {

    // document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.dir = i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.resolvedLanguage]);



  return (
    <>
      <AppAuthProvider>
        <AppToaster />
        <AppNavbar />
        <Box>
          <Outlet />

        </Box>
        <QuickAccess />
      </AppAuthProvider>
    </>
  );
}

export default App;
