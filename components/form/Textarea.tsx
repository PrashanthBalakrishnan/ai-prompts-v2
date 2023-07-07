import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextareaPropts {
  label: string
  id: string
  required: boolean
  register: UseFormRegister<FieldValues>
  disabled?: boolean
  placeholder?: string
}

const Textarea: React.FC<TextareaPropts> = ({
  label,
  id,
  required,
  register,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      <label className="block font-medium leading-6 text-gray-900" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">
        <textarea
          className={clsx(
            `
        flex
        h-[200px]
        w-full
        resize-none
        rounded-lg
        p-3
        text-sm
        text-gray-500
        outline-0
        ring-1
        ring-inset
        ring-gray-300
        `,
            disabled && 'cursor-default opacity-50'
          )}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, { required })}
        />
      </div>
    </div>
  )
}
export default Textarea
