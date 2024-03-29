import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await getUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>
        </section>
    )
}

export default Page;