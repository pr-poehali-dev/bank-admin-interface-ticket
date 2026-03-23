import Icon from '@/components/ui/icon';

const STATS = [
  { label: 'Тикетов создано', value: '48', change: '+12%', icon: 'Ticket', positive: true },
  { label: 'Выполнено в срок', value: '39', change: '+5%', icon: 'CheckCircle2', positive: true },
  { label: 'В работе', value: '7', change: '-2', icon: 'Clock', positive: false },
  { label: 'Просрочено', value: '2', change: '-1', icon: 'AlertCircle', positive: true },
];

const EMPLOYEES_DATA = [
  { name: 'Иванова М.С.', dept: 'Операции', done: 14, total: 16, rate: 88 },
  { name: 'Петров А.К.', dept: 'Кредитование', done: 11, total: 13, rate: 85 },
  { name: 'Морозова И.А.', dept: 'Аналитика', done: 9, total: 10, rate: 90 },
  { name: 'Сидорова Е.В.', dept: 'Депозиты', done: 7, total: 9, rate: 78 },
  { name: 'Козлов Д.Н.', dept: 'Валютный отдел', done: 5, total: 8, rate: 63 },
  { name: 'Новиков В.П.', dept: 'ИТ', done: 3, total: 5, rate: 60 },
];

const CATEGORY_STATS = [
  { label: 'Выставление задач', count: 11, pct: 85 },
  { label: 'Администрирование', count: 9, pct: 70 },
  { label: 'Статистика', count: 8, pct: 62 },
  { label: 'Регистрация сотрудников', count: 7, pct: 54 },
  { label: 'Фидбек', count: 6, pct: 46 },
  { label: 'Разработка продуктов', count: 5, pct: 38 },
  { label: 'Курс валют', count: 2, pct: 15 },
];

export default function Analytics() {
  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <header className="bg-white border-b px-8 py-5">
        <h1 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Аналитика</h1>
        <p className="text-sm text-gray-400 mt-0.5">Март 2026 · Все сотрудники</p>
      </header>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border p-5 animate-fade-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--accent))' }}>
                  <Icon name={stat.icon} size={17} fallback="Circle" style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: stat.positive ? '#dcfce7' : '#fee2e2',
                    color: stat.positive ? '#16a34a' : '#dc2626',
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 bg-white rounded-lg border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Эффективность сотрудников</h2>
              <span className="text-xs text-gray-400">выполнено / всего</span>
            </div>
            <div className="p-5 space-y-4">
              {EMPLOYEES_DATA.map((emp, i) => (
                <div key={emp.name} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: 'hsl(var(--primary))' }}>
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{emp.done}/{emp.total}</span>
                      <p className="text-xs text-gray-400">{emp.rate}%</p>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${emp.rate}%`,
                        background: emp.rate >= 80 ? 'hsl(var(--primary))' : emp.rate >= 65 ? '#d97706' : '#dc2626',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-white rounded-lg border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Тикеты по категориям</h2>
            </div>
            <div className="p-5 space-y-3.5">
              {CATEGORY_STATS.map((cat, i) => (
                <div key={cat.label} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{cat.label}</span>
                    <span className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>{cat.count}</span>
                  </div>
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${cat.pct}%`, background: 'hsl(var(--primary))' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
