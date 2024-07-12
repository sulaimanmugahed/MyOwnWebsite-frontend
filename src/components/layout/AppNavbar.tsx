
import {
  Typography,
  useTheme,
  Toolbar,
  ListItemText,
  ListItem,
  ListItemButton,
  List,
  IconButton,
  AppBar,
  Drawer,
  Divider,
  Box,
  MenuItem,
  Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { AppLink } from '../common/AppLink';
import AppButton from '../common/AppButton';
import { useAuth } from '../../hooks/UseAuth';
import { AppModal } from '../common/AppModal';
import { toast } from 'sonner';
import AppMenu from '../common/AppMenu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useProfileData } from '../../hooks/ProfileHooks';
import { useTranslation } from 'react-i18next';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}



const drawerWidth = 240;

export default function AppNavBar(props: Props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logOutConfirmModalOpen, setLogOutConfirmModalOpen] = useState(false)

  /////
  const [manageMenuAnchorEl, setManageMenuAnchorEl] = useState<null | HTMLElement>(null);
  const manageMenuOpen = Boolean(manageMenuAnchorEl);
  const handleManageMenuClose = () => {
    setManageMenuAnchorEl(null);
  };
  const handleManageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setManageMenuAnchorEl(event.currentTarget);
  };
  ///
  const { profile } = useProfileData()

  const location = useLocation()

  const activePath = useMemo(() => {
    return location.pathname
  }, [location])


  const theme = useTheme()
  const { logUserOut, isAuthenticated, roles } = useAuth()

  const { t, i18n } = useTranslation()

  const handelLogout = () => {
    logUserOut()
    setLogOutConfirmModalOpen(false)
    toast(t('success_logout'))
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const navItems = [
    {
      name: t('home'),
      to: '/'
    },
    {
      name: t('projects'),
      to: '/projects'
    },
    {
      name: t('about'),
      to: '/about'
    },
    {
      name: t('contact'),
      to: '/contact'
    }
  ]



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, direction: 'ltr' }}>
        <Typography variant="h6" color={'primary'} component={'span'}>{profile?.personalData?.firstName} </Typography>{profile?.personalData?.lastName?.charAt(0)}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (

          <AppLink key={item.to} href={item.to} color={activePath === item.to ? 'primary' : 'inherit'} underline='none'>
            <ListItem>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </AppLink>


        ))}

        {
          roles?.includes("Admin") && (
            <AppLink href='manage/projects' color={activePath.startsWith('/manage') ? 'primary' : 'inherit'} underline='none'>
              <ListItem>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={'Mange projects'} />
                </ListItemButton>
              </ListItem>
            </AppLink>
          )
        }

        {isAuthenticated

          ? (
            <ListItem>
              <ListItemButton onClick={() => setLogOutConfirmModalOpen(true)} sx={{ textAlign: 'center' }}>
                <ListItemText primary={t('logout')} />
              </ListItemButton>
            </ListItem>
          )
          : (

            <AppLink href={'/login'} color={activePath === '/login' ? 'primary' : 'inherit'} underline='none'>
              <ListItem>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={t('login')} />
                </ListItemButton>
              </ListItem>
            </AppLink>
          )}

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>

      <AppBar sx={{ bgcolor: theme.palette.background.paper, zIndex: 1000 }} component="nav" position='static'>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge={i18n.resolvedLanguage === 'ar' ? 'end' : 'start'}
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"

            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Typography variant="h6" color={'primary'} component={'span'}>{profile?.personalData?.firstName} </Typography>{profile?.personalData?.lastName?.charAt(0)}
          </Typography>
          {
            (roles?.includes("Admin")) && (
              <AppMenu sx={{ display: { xs: 'none', sm: 'inline-block' } }} color={activePath.startsWith('/manage') ? 'primary' : 'inherit'} anchorEl={manageMenuAnchorEl} handleMenuClick={handleManageMenuClick} handleMenuClose={handleManageMenuClose} open={manageMenuOpen} menuName='Manage'>
                <AppLink underline='none' color={activePath === '/manage/projects' ? 'primary' : 'inherit'} onClick={handleManageMenuClose} href='manage/projects'>
                  <MenuItem disableRipple>
                    Projects
                  </MenuItem>
                </AppLink>
              </AppMenu>
            )
          }

          <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}>
            {
              navItems.map((item) => (
                <AppLink color={'inherit'} href={item.to} key={item.to}>
                  <AppButton color={activePath === item.to ? 'primary' : 'inherit'}>
                    {item.name}
                  </AppButton>
                </AppLink>
              ))
            }


          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 0 } }}>
            {isAuthenticated

              ? (
                <Tooltip title='Logout'>
                  <IconButton onClick={() => setLogOutConfirmModalOpen(true)}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              )
              : (
                <AppLink color={'inherit'} href='/login'>
                  <Tooltip title='Login'>
                    <IconButton >
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </Tooltip>
                </AppLink>
              )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor={i18n.resolvedLanguage === 'ar' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <AppModal open={logOutConfirmModalOpen}>
        <Box sx={{ textAlign: 'center' }}>

          <Typography color={'text.primary'} variant='h6' gutterBottom>{t('logout')}</Typography>
          <Typography color={'text.secondary'} variant='body2' gutterBottom>{t('logout_confirm_message')}</Typography>

          <Box sx={{
            pt: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <AppButton variant='contained' onClick={handelLogout}>{t('yes')}</AppButton>
            <AppButton variant='outlined' color='error' onClick={() => setLogOutConfirmModalOpen(false)}>{t('no')}</AppButton>
          </Box>
        </Box>
      </AppModal >

    </>
  );
}