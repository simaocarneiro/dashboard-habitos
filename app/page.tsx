import { Suspense } from 'react'
import { getHabits, createHabit } from '@/app/actions/habits'
import { getTasks, createTask } from '@/app/actions/tasks'
import { HabitCard } from '@/components/HabitCard'
import { TaskCard } from '@/components/TaskCard'
import { Sidebar } from '@/components/Sidebar'
import { DashboardStats } from '@/components/DashboardStats'

// Componente interno com assincronismo para carregar os dados
async function DashboardContent() {
  const habits = await getHabits()
  const tasks = await getTasks()

  return (
    <>
      {/* PAINEL DE ESTATÍSTICAS */}
      <DashboardStats habits={habits} tasks={tasks} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* COLUNA DE HÁBITOS */}
        <section id="habits" className="space-y-6">
          <div className="border rounded-xl p-6 shadow-sm bg-white dark:bg-zinc-900 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2"><span>🔥</span> Novo Hábito</h2>
            <form action={createHabit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="habit-title" className="text-xs font-semibold uppercase text-muted-foreground">Título do Hábito</label>
                <input
                  type="text"
                  id="habit-title"
                  name="title"
                  required
                  placeholder="Ex: Beber 2L de água"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="habit-desc" className="text-xs font-semibold uppercase text-muted-foreground">Descrição (Opcional)</label>
                <input
                  type="text"
                  id="habit-desc"
                  name="description"
                  placeholder="Ex: Espalhar copos pela casa"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium text-sm hover:opacity-95 transition shadow-sm"
              >
                Adicionar Hábito
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold tracking-tight text-muted-foreground">Hábitos de Hoje</h3>
            {habits.length === 0 ? (
              <div className="p-8 border rounded-xl text-center text-sm text-muted-foreground bg-white dark:bg-zinc-900 border-dashed">
                Ainda não tens hábitos criados. Adiciona o primeiro acima!
              </div>
            ) : (
              <div className="space-y-3">
                {habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* COLUNA DE TAREFAS */}
        <section id="tasks" className="space-y-6">
          <div className="border rounded-xl p-6 shadow-sm bg-white dark:bg-zinc-900 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2"><span>✅</span> Nova Tarefa</h2>
            <form action={createTask} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="task-title" className="text-xs font-semibold uppercase text-muted-foreground">Título da Tarefa</label>
                <input
                  type="text"
                  id="task-title"
                  name="title"
                  required
                  placeholder="Ex: Enviar relatório trimestral"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="task-desc" className="text-xs font-semibold uppercase text-muted-foreground">Descrição (Opcional)</label>
                <input
                  type="text"
                  id="task-desc"
                  name="description"
                  placeholder="Ex: Rever dados financeiros no Excel"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium text-sm hover:opacity-95 transition shadow-sm"
              >
                Adicionar Tarefa
              </button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold tracking-tight text-muted-foreground">Tarefas Pendentes</h3>
            {tasks.length === 0 ? (
              <div className="p-8 border rounded-xl text-center text-sm text-muted-foreground bg-white dark:bg-zinc-900 border-dashed">
                Sem tarefas pendentes registadas.
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Lateral */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho do Dashboard */}
        <header className="border-b px-8 py-5 bg-white dark:bg-zinc-900">
          <h1 className="text-2xl font-bold tracking-tight">Painel de Controlo</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo de volta ao teu centro de produtividade diária.</p>
        </header>

        {/* Grelha de Conteúdo Principal envolta em Suspense */}
        <main className="flex-1 p-8 overflow-y-auto max-w-6xl w-full mx-auto">
          <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">A carregar o teu painel...</div>}>
            <DashboardContent />
          </Suspense>
        </main>
      </div>
    </div>
  )
}