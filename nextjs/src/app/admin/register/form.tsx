"use client";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './validation-schema';
import { formAction } from './formAction';
import { useState } from 'react';

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null); // State for error messages
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const response = await formAction(data);
        } catch (error: any) {
            setError(error.message); // Set the error message to display it
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" {...register('email')} />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <label htmlFor="country_id">Country</label>
                <input id="country_id" {...register('country_id')} />
                {errors.country_id && <span>{errors.country_id.message}</span>}
            </div>

            <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" {...register('phone')} />
                {errors.phone && <span>{errors.phone.message}</span>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" {...register('password')} />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div>
                <label htmlFor="store_name">Store Name</label>
                <input id="store_name" {...register('store_name')} />
                {errors.store_name && <span>{errors.store_name.message}</span>}
            </div>

            <div>
                <label htmlFor="link">Store Link</label>
                <input id="link" {...register('link')} />
                {errors.link && <span>{errors.link.message}</span>}
            </div>

            <button type="submit">Register</button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
    );
};

export default RegisterForm;
