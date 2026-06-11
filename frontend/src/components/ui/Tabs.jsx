import { createContext, useContext, useState } from 'react'
import { cn } from '@utils/cn'

const TabsContext = createContext()

export const Tabs = ({ defaultValue, value, onValueChange, children, className }) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  const setValue = onValueChange || setInternalValue

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ className, children }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-neutral-gray-100 p-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export const TabsTrigger = ({ value, className, children }) => {
  const { value: currentValue, setValue } = useContext(TabsContext)
  const isActive = currentValue === value

  return (
    <button
      onClick={() => setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isActive
          ? 'bg-white text-neutral-gray-800 shadow-sm'
          : 'text-neutral-gray-600 hover:text-neutral-gray-800',
        className
      )}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, className, children }) => {
  const { value: currentValue } = useContext(TabsContext)

  if (currentValue !== value) return null

  return <div className={className}>{children}</div>
}
