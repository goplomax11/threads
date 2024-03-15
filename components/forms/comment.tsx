'use client'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation, ThreadValidation } from "@/lib/validations/thread";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";

interface CommentProps {
    threadId: string;
    currentUserImage: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImage, currentUserId }: CommentProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

        form.reset();
    }

    return (
        <Form {...form}>
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image
                                    src={currentUserImage}
                                    alt="Profile image"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input 
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='comment-form_btn'>
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}

export default Comment;