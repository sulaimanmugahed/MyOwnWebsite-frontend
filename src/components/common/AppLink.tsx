import { Link as RouterLink } from 'react-router-dom';
import { LinkProps, Link as MuiLink } from '@mui/material'

type AppLinkProps = {

  replace?: boolean
} & LinkProps


export const AppLink = ({ replace, ...props }: AppLinkProps) => {
  return (
    <MuiLink replace={replace} {...props} component={RouterLink} to={props.href ?? '#'} />
  )
}
