import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind CSS de manera inteligente
 * Evita duplicados y conflictos entre clases
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
