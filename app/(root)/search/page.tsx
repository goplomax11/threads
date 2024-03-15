import ProfileHeader from "@/components/shared/profileHeader";
import ThreadTab from "@/components/shared/threadTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/userCard";
import { profileTabs } from "@/constants";
import { getUser, getUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await getUser(user.id);
    console.log(userInfo?.onboarded)
    if(!userInfo?.onboarded) redirect("/onboarding");

    const result = await getUsers({
        userId: user.id,
        searchedString: "",
        pageNumber: 1,
        pageSize: 25,
    })

    console.log(result);

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No users</p>
                ) : (
                    <>
                        {result.users.map((user) => (
                            <UserCard 
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                username={user.username}
                                imgUrl={user.image}
                                personType="User"
                            />
                        ))}
                    </>
                )}

            </div>
        </section>
    )
}

export default Page;