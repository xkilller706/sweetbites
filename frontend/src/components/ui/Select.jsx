import { cn } from '@utils/cn'

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-lg border border-neutral-gray-300 bg-white px-3 py-2 text-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export const SelectOption = ({ children, ...props }) => {
  return <option {...props}>{children}</option>
}
