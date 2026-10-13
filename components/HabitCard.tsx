'use client'

import { toggleHabitLog, deleteHabit, updateHabit } from '@/app/actions/habits'
import { Button } from '@/components/ui/button'
import { useTransition, useState } from 'react'

type HabitProps = {
  habit: {
    id: string
    title: string
    description: string | null
    createdAt: Date
    logs: { id: string; completedAt: Date }[]
  }
}

export function HabitCard({ habit }: HabitProps) {
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(habit.title)
  const [editDesc, setEditDesc] = useState(habit.description || '')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Verifica se foi concluído hoje
  const isCompletedToday = habit.logs.some((log) => {
    const logDate = new Date(log.completedAt)
    logDate.setHours(0, 0, 0, 0)
    return logDate.getTime() === today.getTime()
  })

  // Cálculo da sequência (Streak)
  const calculateStreak = () => {
    if (!habit.logs || habit.logs.length === 0) return 0

    const sortedLogs = [...habit.logs]
      .map((log) => {
        const d = new Date(log.completedAt)
        d.setHours(0, 0, 0, 0)
        return d.getTime()
      })
      .filter((time, index, self) => self.indexOf(time) === index)
      .sort((a, b) => b - a)

    let streak = 0
    let checkDate = new Date(today)

    if (!isCompletedToday) {
      checkDate.setDate(checkDate.getDate() - 1)
    }

    for (const logTime of sortedLogs) {
      if (logTime === checkDate.getTime()) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else if (logTime < checkDate.getTime()) {
        break
      }
    }

    return streak
  }

  const streak = calculateStreak()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleHabitLog(habit.id)
    })
  }

  const handleDelete = () => {
    if (confirm('Tens a certeza de que queres eliminar este hábito?')) {
      startTransition(async () => {
        await deleteHabit(habit.id)
      })
    }
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await updateHabit(habit.id, editTitle, editDesc)
      setIsEditing(false)
    })
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900 flex flex-col gap-3">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-transparent"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-sm bg-transparent"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              Guardar
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-lg ${isCompletedToday ? 'line-through text-gray-400' : ''}`}>
                {habit.title}
              </h3>
              {streak > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium dark:bg-orange-950/40 dark:text-orange-400">
                  🔥 {streak} {streak === 1 ? 'dia' : 'dias'}
                </span>
              )}
            </div>
            {habit.description && (
              <p className="text-sm text-gray-500 mt-1">{habit.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleToggle}
              disabled={isPending}
              variant={isCompletedToday ? "outline" : "default"}
              className={isCompletedToday ? "border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30" : ""}
            >
              {isPending ? 'A atualizar...' : isCompletedToday ? '✓ Concluído' : 'Marcar Hoje'}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              ✏️
            </Button>

            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-700">
              🗑️
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}