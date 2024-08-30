import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'


export const DisplayCard = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => (
    <section  className={twMerge("shadow-lg rounded-lg p-6", className)}>
        {children}
    </section>
)