import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import commentService from '@services/commentService'
import toast from 'react-hot-toast'
import { cn } from '@utils/cn'

/**
 * Componente de reacciones (like/dislike) para comentarios
 * @param {number} commentId - ID del comentario
 * @param {number} initialLikes - Cantidad inicial de likes
 * @param {number} initialDislikes - Cantidad inicial de dislikes
 */
const CommentReactions = ({ commentId, initialLikes = 0, initialDislikes = 0 }) => {
  const { isAuthenticated } = useAuth()
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [myReaction, setMyReaction] = useState(null) // 'like', 'dislike', o null
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      loadMyReaction()
    }
  }, [commentId])

  const loadMyReaction = async () => {
    try {
      const response = await commentService.getMyReaction(commentId)
      if (response.success) {
        setMyReaction(response.reaction)
      }
    } catch (error) {
      console.error('Error al cargar reacción:', error)
    }
  }

  const handleReact = async (tipo) => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para reaccionar')
      return
    }

    if (loading) return

    setLoading(true)

    try {
      const response = await commentService.reactToComment(commentId, tipo)

      if (response.success) {
        // Actualizar contadores según la acción
        if (response.action === 'added') {
          if (tipo === 'like') {
            setLikes(likes + 1)
            setMyReaction('like')
          } else {
            setDislikes(dislikes + 1)
            setMyReaction('dislike')
          }
        } else if (response.action === 'removed') {
          if (tipo === 'like') {
            setLikes(likes - 1)
          } else {
            setDislikes(dislikes - 1)
          }
          setMyReaction(null)
        } else if (response.action === 'updated') {
          // Cambió de like a dislike o viceversa
          if (myReaction === 'like') {
            setLikes(likes - 1)
            setDislikes(dislikes + 1)
          } else {
            setDislikes(dislikes - 1)
            setLikes(likes + 1)
          }
          setMyReaction(tipo)
        }
      }
    } catch (error) {
      toast.error('Error al reaccionar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Like Button */}
      <button
        onClick={() => handleReact('like')}
        disabled={loading}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium transition-all duration-200',
          myReaction === 'like'
            ? 'bg-blue-50 text-blue-600'
            : 'text-neutral-gray-600 hover:bg-neutral-gray-100',
          loading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <ThumbsUp
          className={cn(
            'h-4 w-4 transition-transform',
            myReaction === 'like' && 'fill-current'
          )}
        />
        <span>{likes}</span>
      </button>

      {/* Dislike Button */}
      <button
        onClick={() => handleReact('dislike')}
        disabled={loading}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium transition-all duration-200',
          myReaction === 'dislike'
            ? 'bg-red-50 text-red-600'
            : 'text-neutral-gray-600 hover:bg-neutral-gray-100',
          loading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <ThumbsDown
          className={cn(
            'h-4 w-4 transition-transform',
            myReaction === 'dislike' && 'fill-current'
          )}
        />
        <span>{dislikes}</span>
      </button>
    </div>
  )
}

export default CommentReactions
