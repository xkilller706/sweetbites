import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@utils/cn'

const BackButton = ({ to, label = 'Volver', className }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg',
        'text-accent-chocolate hover:text-primary',
        'hover:bg-secondary/50 transition-colors',
        'font-medium',
        className
      )}
    >
      <ChevronLeft size={20} />
      <span>{label}</span>
    </button>
  )
}

export default BackButton
