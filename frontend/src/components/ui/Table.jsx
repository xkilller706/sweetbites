import { cn } from '@utils/cn'

export const Table = ({ className, ...props }) => (
  <div className="w-full overflow-auto">
    <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
)

export const TableHeader = ({ className, ...props }) => (
  <thead className={cn('border-b border-neutral-gray-200', className)} {...props} />
)

export const TableBody = ({ className, ...props }) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
)

export const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      'border-b border-neutral-gray-200 transition-colors hover:bg-neutral-gray-50',
      className
    )}
    {...props}
  />
)

export const TableHead = ({ className, ...props}) => (
  <th
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-neutral-gray-600 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
)

export const TableCell = ({ className, ...props }) => (
  <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
)
