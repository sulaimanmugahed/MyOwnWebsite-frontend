import { SpeedDial, SpeedDialAction, SpeedDialIcon, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { ThemeContext } from "../../providers/AppThemeProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';

import { useTranslation } from "react-i18next";

export const QuickAccess = () => {
    const theme = useTheme();
    const { switchColorMode } = useContext(ThemeContext);
    const activateName = useMemo(
        () => (theme.palette.mode === "dark" ? "Light" : "Dark"),
        [theme]
    );

    const { i18n, t } = useTranslation();

    const switchLanguage = () => {
        const nextLanguage = i18n.resolvedLanguage === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLanguage);
        localStorage.setItem('currentLanguage', nextLanguage)
    };

    return (
        <SpeedDial

            ariaLabel="Navigation speed dial"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon icon={<SettingsIcon />} />}>

            <SpeedDialAction onClick={switchColorMode}
                sx={{
                    p: 1,
                    border: `1px ${theme.palette.text.disabled} solid`,
                }}

                icon={
                    theme.palette.mode === "dark" ? (
                        <LightModeOutlined />
                    ) : (
                        <DarkModeOutlined color="action" />
                    )}
                tooltipTitle={t('switch_mode_message', { mode: activateName })} />
            <SpeedDialAction
                icon={
                    <TranslateIcon />
                }
                onClick={switchLanguage}
                tooltipTitle={t('change-language')}

            />
        </SpeedDial>
    )
}
