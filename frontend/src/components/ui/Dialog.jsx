import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@utils/cn'

export const Dialog = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <Fragment>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-neutral-gray-200 bg-white shadow-elevated"
            >
              {children}
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}

export const DialogContent = ({ className, children, onClose }) => {
  return (
    <div className={cn('relative', className)}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-neutral-gray-600 transition-colors hover:bg-neutral-gray-100 hover:text-neutral-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {children}
    </div>
  )
}

export const DialogHeader = ({ className, children }) => {
  return (
    <div className={cn('border-b border-neutral-gray-200 p-6 pb-4', className)}>
      {children}
    </div>
  )
}

export const DialogTitle = ({ className, children }) => {
  return (
    <h2 className={cn('text-lg font-semibold text-neutral-gray-800', className)}>
      {children}
    </h2>
  )
}

export const DialogDescription = ({ className, children }) => {
  return (
    <p className={cn('mt-1 text-sm text-neutral-gray-600', className)}>
      {children}
    </p>
  )
}

export const DialogBody = ({ className, children }) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export const DialogFooter = ({ className, children }) => {
  return (
    <div className={cn('flex items-center justify-end gap-3 border-t border-neutral-gray-200 p-6 pt-4', className)}>
      {children}
    </div>
  )
}
