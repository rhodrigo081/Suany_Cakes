import { ProfileEditForm } from "@/components/profile/ProfileEditForm"
import { Wrapper } from "@/components/Wrapper"


export const EditProfilePage = () => {
    return (
        <Wrapper className="w-full flex justify-center items-center">
            <ProfileEditForm />
        </Wrapper>
    )
}