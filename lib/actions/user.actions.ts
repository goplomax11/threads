"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface updateUserParams {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser(
    {
        userId,
        username,
        name,
        bio,
        image,
        path
    }: updateUserParams
): Promise<void> {
    connectToDB();

    await User.findOneAndUpdate(
        { id: userId },
        {

            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        },
        { upsert: true }
    );

    try {
        if (path === "profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function getUser(userId: string) {
    try {
        connectToDB();

        return await User
            .findOne({id: userId})
            // .populate({})

    } catch(error: any) {
        throw new Error(`Failed to get user: ${error.message}`)
    }
}

export async function getUserPosts(userId: string) {
    try {
        connectToDB();

        return await User
            .findOne({id: userId})
            .populate({
                path: "threads",
                model: Thread,
                populate: {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image id"
                    }
                }
            })

    } catch(error: any) {
        throw new Error(`Failed to get user posts: ${error.message}`);
    }
}

export async function getUsers({
    searchedString = "",
    userId,
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}: {
    searchedString: string;
    userId: string;
    pageNumber: number;
    pageSize: number;
    sortBy?: SortOrder;
}) {
    try{
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchedString, "i");

        const query: FilterQuery<typeof User> = {
            id: {$ne: userId}
        };

        if(searchedString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ]
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext }

    } catch(error: any) {
        throw new Error(`Failed to get users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {

    } catch(error) {
        throw new Error()
    }
}