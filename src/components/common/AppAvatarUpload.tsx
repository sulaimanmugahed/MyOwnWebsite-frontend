
import { Avatar, AvatarProps } from '@files-ui/react';

type AppAvatarUploadProps = {
} & AvatarProps

const AppAvatarUpload = ({ children, ...props }: AppAvatarUploadProps) => {

    return (
        <Avatar{...props} />
    );
}

export default AppAvatarUpload;