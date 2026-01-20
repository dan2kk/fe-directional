import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from '@/styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className={`${styles.wrapper} ${className || ''}`}>
                {label && <label className={styles.label}>{label}</label>}
                <input ref={ref} className={styles.input} {...props} />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
