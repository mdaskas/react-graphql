type Props = {
    label?: string
    type?: string
    name?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    error?: string
    ref?: React.Ref<HTMLInputElement>
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>

export default function DM_Input({
    label,
    type = 'text',
    name,
    value,
    onChange,
    onBlur,
    error,
    ref,
    ...rest
}: Props) {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={label} className="mb-1 text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={label}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
                {...rest}
            />
            {error && (
                <span className="text-red-500 text-sm mt-1">{error}</span>
            )}
        </div>
    )
}
