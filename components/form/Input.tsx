import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  label?: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  placeholder?: string
  onChange?: () => {}
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label className="block font-medium leading-6 text-gray-900" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            `
          form-input
          block
          w-full
          rounded-md
          border-0
          p-3
          text-gray-500
          shadow-sm
          outline-0
          ring-1
          ring-inset
          ring-gray-300
          placeholder:py-2
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          sm:text-sm
          sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'cursor-default opacity-50'
          )}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    </div>
  )
}
export default Input
