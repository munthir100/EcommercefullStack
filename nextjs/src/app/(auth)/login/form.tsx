import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Login } from '../actions';
import { Input, Button } from '@nextui-org/react'; // Use NextUI components  
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from './validation-schema';
import { z } from 'zod';

type LoginFormInputs = z.infer<typeof validationSchema>;

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(validationSchema),
        mode: 'onChange', // Enable real-time validation  
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string[]>([]);

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);
        try {
            await Login(data);
            router.push('/admin');
        } catch (error: any) {
            setError([error.message]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
                <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
                    Username
                </label>
                <Input
                    isClearable
                    id="username"
                    type="text"
                    {...register('username')}
                    isInvalid={errors.username?.message ? true : false}
                    errorMessage={errors.username?.message}
                    color={errors.username ? 'danger' : 'default'}
                />
            </div>

            <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                </label>
                <Input
                    isClearable
                    id="password"
                    type="password"
                    {...register('password')}
                    isInvalid={errors.password?.message ? true : false}
                    errorMessage={errors.password?.message}
                    color={errors.password ? 'danger' : 'default'}
                />
            </div>

            {error.length > 0 && (
                <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                    {error.map((err, index) => (
                        <div key={index}>{err}</div>
                    ))}
                </div>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                color="primary" // Change to primary color  
                size="lg"
                className="mt-4"
                isLoading={isLoading}
            >
                {isLoading ? 'Loading...' : 'Login'}
            </Button>
        </form>
    );
}