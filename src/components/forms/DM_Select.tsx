type Option = {
    value: string | number
    label: string
}

type Props = {
    label?: string
    options: Option[]
    error?: string
    name?: string
    ref?: React.Ref<HTMLSelectElement>
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
    onBlur?: React.FocusEventHandler<HTMLSelectElement>
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'onBlur'>

export default function DM_Select({
    label,
    options,
    error,
    name,
    ref,
    onChange,
    onBlur,
    ...rest
}: Props) {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="mb-1 text-sm font-medium">
                    {label}
                </label>
            )}
            <select
                id={name}
                ref={ref}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                className={`rounded border px-3 py-2 focus:border-blue-500 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
                {...rest}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
        </div>
    )
}
