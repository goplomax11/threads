import { getUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/threadCard";

interface ThreadTabProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}


const ThreadTab = async ({ currentUserId, accountId, accountType }: ThreadTabProps) => {
    const result = await getUserPosts(accountId);

    if (!result) redirect("/")

    return (
        <section>
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread.id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                            ? { name: result.name, image: result.image, id: result.id }
                            : thread.author
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    )
}

export default ThreadTab