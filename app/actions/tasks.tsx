'use server'

import { connection } from 'next/server'
import { prisma } from '@/lib/prisma' // Ajusta o caminho para a tua instância do Prisma se necessário
import { revalidatePath } from 'next/cache'

// 1. Ler todas as tarefas
export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return tasks
  } catch (error) {
    console.error('Erro ao procurar tarefas:', error)
    return []
  }
}

// 2. Criar uma nova tarefa
export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title || title.trim() === '') {
    return
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description: description || null,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
  }
}

// 3. Alternar estado de conclusão (Completada / Pendente)
export async function toggleTask(id: string, currentStatus: boolean) {
  try {
    await prisma.task.update({
      where: { id },
      data: { completed: !currentStatus },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao alterar estado da tarefa:', error)
  }
}

// 4. Eliminar uma tarefa
export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao eliminar tarefa:', error)
  }
}