import { useState, useCallback, ChangeEvent } from 'react';

type ValidatorFn = (value: string) => string | undefined;

interface UseInputResult {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    error: string | undefined;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    reset: () => void;
    validate: () => boolean;
}

/**
 * 입력 상태와 유효성 검사를 관리하기 위한 커스텀 훅
 * @param initialValue 입력의 초기값
 * @param validator 유효하지 않을 경우 에러 메시지 문자열을 반환하고, 유효할 경우 undefined 또는 빈 문자열을 반환하는 선택적 함수
 */
const useInput = (
    initialValue: string = '',
    validator?: ValidatorFn
): UseInputResult => {
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | undefined>(undefined);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const newValue = e.target.value;
            setValue(newValue);

            if (validator) {
                // Real-time validation
                const validationError = validator(newValue);
                setError(validationError);
            }
        },
        [validator]
    );

    const reset = useCallback(() => {
        setValue(initialValue);
        setError(undefined);
    }, [initialValue]);

    const validate = useCallback(() => {
        if (validator) {
            const validationError = validator(value);
            setError(validationError);
            return !validationError;
        }
        return true;
    }, [value, validator]);

    return {
        value,
        onChange,
        setValue,
        error,
        setError,
        reset,
        validate,
    };
};

export default useInput;
