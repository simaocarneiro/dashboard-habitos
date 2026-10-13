'use server'

import { connection } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Função para listar todos os hábitos
export async function getHabits() {
  try {
    const habits = await prisma.habit.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        logs: true, // Inclui o histórico de conclusões se necessário
      },
    })
    return habits
  } catch (error) {
    console.error('Erro ao buscar hábitos:', error)
    return []
  }
}

// Função para criar um novo hábito
export async function createHabit(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title) {
    throw new Error('O título do hábito é obrigatório.')
  }

  try {
    await prisma.habit.create({
      data: {
        title,
        description,
      },
    })

    // Atualiza a página para refletir o novo hábito criado
    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao criar hábito:', error)
    throw new Error('Não foi possível criar o hábito.')
  }
}

export async function toggleHabitLog(habitId: string) {
  // Define a data de hoje no formato YYYY-MM-DD (apenas a data, sem horas)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try {
    // Verifica se já existe um registo do hábito para o dia de hoje
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId,
        completedAt: {
          gte: today,
        },
      },
    })

    if (existingLog) {
      // Se já foi concluído hoje, remove o registo (desmarcar)
      await prisma.habitLog.delete({
        where: { id: existingLog.id },
      })
    } else {
      // Se ainda não foi concluído hoje, cria o registo
      await prisma.habitLog.create({
        data: {
          habitId,
          completedAt: new Date(),
        },
      })
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao registar conclusão:', error)
    throw new Error('Não foi possível atualizar o estado do hábito.')
  }
}

export async function updateHabit(id: string, title: string, description?: string) {
  try {
    await prisma.habit.update({
      where: { id },
      data: {
        title,
        description: description || null,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao atualizar hábito:', error)
    throw new Error('Não foi possível atualizar o hábito.')
  }
}

export async function deleteHabit(id: string) {
  try {
    // Como temos uma relação com HabitLog, o Prisma pode apagar em cascata se configurado,
    // ou apagamos primeiro os logs associados para evitar erros de restrição da base de dados.
    await prisma.habitLog.deleteMany({
      where: { habitId: id },
    })

    await prisma.habit.delete({
      where: { id },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Erro ao eliminar hábito:', error)
    throw new Error('Não foi possível eliminar o hábito.')
  }
}