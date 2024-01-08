"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login_validator } from "@/lib/validators/login_validator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FormError } from "@/components/form/FormError"
import { FormSuccess } from "@/components/form/FormSuccess"
import { login } from "@/actions/login"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function LoginForm({ className, ...props }: UserAuthFormProps) {
    const [error, setError] = React.useState<string | undefined>("");
    const [success, setSuccess] = React.useState<string | undefined>("");

    const [isPending, startTransition] = React.useTransition();
    const form = useForm<z.infer<typeof login_validator>>(
        {
            resolver: zodResolver(login_validator),
            defaultValues: {
                email: "",
                password: ""
            },
        }
    );


    const onLoginSubmit = (values: z.infer<typeof login_validator>) => {
        setSuccess("")
        setError("")
        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error);
                // setSuccess(data?.success)
            })
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField

                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Email </FormLabel>
                                    <FormControl>

                                        <Input
                                            {...field}
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Password </FormLabel>
                                    <FormControl>

                                        <Input
                                            {...field}
                                            placeholder="********"
                                            disabled={isPending}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">Login</Button>
                </form>

            </Form>
        </div >
    )
}
