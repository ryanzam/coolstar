import { registerUser } from '@/app/api/auth';
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignupForm = () => {

    const router = useRouter();
    const [state, formAction, isPending] = useActionState(registerUser, null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Account created! 🎉");
            router.push("/signin")
        }
    }, [state?.success])

    return (
        <>
            {state && state.error && (
                <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    {state.error}
                </div>
            )}
            <form action={formAction}>
                <Card>
                    <CardContent className="space-y-4">
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                type='text'
                                placeholder="Sam"
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                name="email"
                                type='email'
                                placeholder="sam@gmail.com"
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                name="password"
                                type='password'
                                placeholder="*********"
                                required
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Must be at least 8 characters
                        </p>


                        <Button type='submit' className='w-full cursor-pointer' size={'lg'} disabled={isPending}>Register</Button>

                        {/* <div className="flex items-center my-3">
                            <div className="grow border-t border-gray-300"></div>
                            <span className="shrink mx-4 text-gray-500">OR</span>
                            <div className="grow border-t border-gray-300"></div>
                        </div> */}

                        <p className='text-sm text-gray-400'>Already have an account? <a href="/signin" className="text-black hover:underline">Sign in</a></p>

                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default SignupForm