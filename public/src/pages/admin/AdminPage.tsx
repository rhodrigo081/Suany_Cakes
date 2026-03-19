import { AdminLayout } from "@/components/Layout/AdminLayout/AdminLayout"
import { Wrapper } from "@/components/Wrapper"

export const AdminPage = () => {
    return (
        <Wrapper className="w-full flex-column px-10 justify-center items-center">
            <AdminLayout />
        </Wrapper>
    )
}