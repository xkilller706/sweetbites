'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Category } from '@/lib/types'

interface CategoryCardProps {
  category: Category
  size?: 'sm' | 'md' | 'lg'
}

export function CategoryCard({ category, size = 'md' }: CategoryCardProps) {
  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-40 w-40',
    lg: 'h-56 w-56',
  }

  const iconSizes = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <Link href={`/recetas?categoria=${category.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl p-4 shadow-lg transition-shadow hover:shadow-xl',
          sizeClasses[size]
        )}
        style={{
          background: `linear-gradient(135deg, ${category.color}ee 0%, ${category.color}99 100%)`,
        }}
      >
        <span className={cn('mb-2', iconSizes[size])}>{category.icon}</span>
        <span className={cn('font-semibold text-white text-center', textSizes[size])}>
          {category.name}
        </span>
      </motion.div>
    </Link>
  )
}
