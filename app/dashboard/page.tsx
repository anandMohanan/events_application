
import { auth, signOut } from "@/auth";

const DashboardPage = async () => {
    const session = await auth();
    // const signOutAction = async () => {
    //     "use server"
    //     await signOut()
    // }
    return (
        <>
            {JSON.stringify(session)}

            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button type="submit">Sign out </button>
            </form>

        </>
    )

}

export default DashboardPage;
