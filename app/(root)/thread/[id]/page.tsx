import ThreadCard from "@/components/cards/threadCard";
import Comment from "@/components/forms/comment";
import { getThreadById } from "@/lib/actions/thread.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await getUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await getThreadById(params.id);

    console.log(thread.children)

    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread.id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>

            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImage={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10 ">
                {thread.children.map((childItem: any) => (
                    <ThreadCard
                        key={childItem.id}
                        id={childItem._id}
                        currentUserId={childItem?.id || ""}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;