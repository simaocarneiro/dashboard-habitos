type DashboardStatsProps = {
  habits: {
    id: string
    logs: { completedAt: Date }[]
  }[]
  tasks: {
    id: string
    completed: boolean
  }[]
}

export function DashboardStats({ habits, tasks }: DashboardStatsProps) {
  // 1. Estatísticas de Hábitos (concluídos hoje)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const habitsCompletedToday = habits.filter((habit) => {
    return habit.logs.some((log) => {
      const logDate = new Date(log.completedAt)
      logDate.setHours(0, 0, 0, 0)
      return logDate.getTime() === today.getTime()
    })
  }).length

  const totalHabits = habits.length
  const habitPercentage = totalHabits > 0 ? Math.round((habitsCompletedToday / totalHabits) * 100) : 0

  // 2. Estatísticas de Tarefas
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const taskPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Cartão 1: Progresso de Hábitos */}
      <div className="p-5 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Hábitos de Hoje</span>
          <span className="text-xl">🔥</span>
        </div>
        <div className="my-3">
          <div className="text-2xl font-bold">
            {habitsCompletedToday} <span className="text-sm font-normal text-muted-foreground">/ {totalHabits}</span>
          </div>
          {/* Barra de Progresso */}
          <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-500"
              style={{ width: `${habitPercentage}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{habitPercentage}% dos hábitos concluídos hoje</p>
      </div>

      {/* Cartão 2: Progresso de Tarefas */}
      <div className="p-5 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Tarefas Concluídas</span>
          <span className="text-xl">✅</span>
        </div>
        <div className="my-3">
          <div className="text-2xl font-bold">
            {completedTasks} <span className="text-sm font-normal text-muted-foreground">/ {totalTasks}</span>
          </div>
          {/* Barra de Progresso */}
          <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-green-600 h-full transition-all duration-500"
              style={{ width: `${taskPercentage}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{taskPercentage}% das tarefas finalizadas</p>
      </div>

      {/* Cartão 3: Produtividade Geral */}
      <div className="p-5 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Estado do Sistema</span>
          <span className="text-xl">⚡</span>
        </div>
        <div className="my-3">
          <div className="text-2xl font-bold text-primary">Ativo</div>
          <p className="text-xs text-muted-foreground mt-1">Base de dados Neon sincronizada</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Tudo a funcionar em tempo real
        </div>
      </div>
    </div>
  )
}