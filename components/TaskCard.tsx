'use client'

import { toggleTask, deleteTask } from '@/app/actions/tasks'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'

type TaskProps = {
  task: {
    id: string
    title: string
    description: string | null
    completed: boolean
    createdAt: Date
  }
}

export function TaskCard({ task }: TaskProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTask(task.id, task.completed)
    })
  }

  const handleDelete = () => {
    if (confirm('Tens a certeza de que queres eliminar esta tarefa?')) {
      startTransition(async () => {
        await deleteTask(task.id)
      })
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900 flex justify-between items-center gap-4">
      <div>
        <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleToggle}
          disabled={isPending}
          variant={task.completed ? "outline" : "default"}
          className={task.completed ? "border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30" : ""}
        >
          {isPending ? 'A atualizar...' : task.completed ? '✓ Concluída' : 'Concluir'}
        </Button>

        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-700">
          🗑️
        </Button>
      </div>
    </div>
  )
}