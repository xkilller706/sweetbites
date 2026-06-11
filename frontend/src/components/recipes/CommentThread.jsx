import { useState } from 'react'
import { Reply, Trash2 } from 'lucide-react'
import { useAuth } from '@context/AuthContext'
import Button from '@components/common/Button'
import CommentReactions from './CommentReactions'
import commentService from '@services/commentService'
import toast from 'react-hot-toast'
import { formatRelativeDate } from '@utils/helpers'
import { cn } from '@utils/cn'

/**
 * Componente para mostrar un comentario con sus respuestas (estructura de árbol)
 * @param {object} comment - Objeto del comentario
 * @param {number} recipeId - ID de la receta
 * @param {function} onCommentDeleted - Callback cuando se elimina un comentario
 * @param {function} onReplyAdded - Callback cuando se agrega una respuesta
 * @param {number} depth - Profundidad del anidamiento (para styling)
 */
const CommentThread = ({
  comment,
  recipeId,
  onCommentDeleted,
  onReplyAdded,
  depth = 0,
}) => {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [submittingReply, setSubmittingReply] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const isAuthor = user?.id === comment.usuario_id
  const canDelete = isAdmin() || isAuthor
  const maxDepth = 3 // Máximo de niveles de anidamiento

  const handleReply = async () => {
    if (!replyText.trim()) {
      toast.error('La respuesta no puede estar vacía')
      return
    }

    setSubmittingReply(true)

    try {
      const response = await commentService.replyComment(
        recipeId,
        comment.id,
        replyText
      )

      if (response.success) {
        toast.success('Respuesta agregada')
        setReplyText('')
        setShowReplyForm(false)
        if (onReplyAdded) {
          onReplyAdded(response.comment)
        }
      }
    } catch (error) {
      toast.error('Error al agregar respuesta')
    } finally {
      setSubmittingReply(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este comentario?')) return

    setDeleting(true)

    try {
      const response = await commentService.deleteComment(comment.id)

      if (response.success) {
        toast.success('Comentario eliminado')
        if (onCommentDeleted) {
          onCommentDeleted(comment.id)
        }
      }
    } catch (error) {
      toast.error('Error al eliminar comentario')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      className={cn(
        'group',
        depth > 0 && 'ml-8 mt-4 pl-4 border-l-2 border-neutral-gray-200'
      )}
    >
      {/* Comentario Principal */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
            {comment.usuario?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-neutral-gray-800 text-sm">
              {comment.usuario}
            </span>
            <span className="text-xs text-neutral-gray-500">
              {formatRelativeDate(comment.fecha)}
            </span>
          </div>

          {/* Texto del comentario */}
          <p className="text-neutral-gray-700 text-sm leading-relaxed mb-2">
            {comment.comentario}
          </p>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {/* Reacciones */}
            <CommentReactions
              commentId={comment.id}
              initialLikes={comment.likes || 0}
              initialDislikes={comment.dislikes || 0}
            />

            {/* Botón Responder */}
            {isAuthenticated() && depth < maxDepth && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 text-xs text-neutral-gray-600 hover:text-primary transition-colors"
              >
                <Reply className="h-3.5 w-3.5" />
                Responder
              </button>
            )}

            {/* Botón Eliminar */}
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1 text-xs text-error hover:text-red-700 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            )}
          </div>

          {/* Formulario de respuesta */}
          {showReplyForm && (
            <div className="mt-3 bg-neutral-gray-50 rounded-lg p-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="w-full px-3 py-2 text-sm border border-neutral-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReply}
                  loading={submittingReply}
                  disabled={!replyText.trim()}
                >
                  Responder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false)
                    setReplyText('')
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* Respuestas anidadas */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentThread
                  key={reply.id}
                  comment={reply}
                  recipeId={recipeId}
                  onCommentDeleted={onCommentDeleted}
                  onReplyAdded={onReplyAdded}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentThread
