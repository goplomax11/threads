import PostThread from "@/components/forms/postThread";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await getUser(user.id);

    if(!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={userInfo._id} />
        </>
    )
}

export default Page;