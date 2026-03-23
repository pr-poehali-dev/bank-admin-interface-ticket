import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import CreateTicketModal, { TicketData } from './CreateTicketModal';
import { Badge } from '@/components/ui/badge';

interface Ticket extends TicketData {
  id: string;
  status: 'new' | 'in_progress' | 'done';
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  auth: 'Регистрация и авторизация',
  'staff-admin': 'Администрирование сотрудников',
  'staff-access': 'Доступ к информации',
  stats: 'Статистика сотрудников',
  tasks: 'Выставление задач',
  feedback: 'Фидбек',
  currency: 'Бронь курса валют',
  individual: 'Индивидуальные условия',
  products: 'Разработка продуктов',
};

const PRIORITY_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  low: { label: 'Низкий', color: '#6b7280', bg: '#f3f4f6' },
  medium: { label: 'Средний', color: '#d97706', bg: '#fef3c7' },
  high: { label: 'Высокий', color: '#dc2626', bg: '#fee2e2' },
};

const STATUS_COLUMNS: { key: Ticket['status']; label: string; icon: string }[] = [
  { key: 'new', label: 'Новые', icon: 'Inbox' },
  { key: 'in_progress', label: 'В работе', icon: 'Clock' },
  { key: 'done', label: 'Выполнено', icon: 'CheckCircle2' },
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Создать учётные записи для 3 новых операционистов',
    category: 'auth',
    employee: 'Иванова М.С.',
    priority: 'high',
    description: 'Оформить доступ в систему для новых сотрудников отдела операций',
    deadline: '2026-03-28',
    status: 'new',
    createdAt: '22.03.2026',
  },
  {
    id: '2',
    title: 'Обновить персональные данные Петрова А.К.',
    category: 'staff-admin',
    employee: 'Петров А.К.',
    priority: 'medium',
    description: 'Смена должности и отдела в профиле сотрудника',
    deadline: '2026-03-25',
    status: 'in_progress',
    createdAt: '21.03.2026',
  },
  {
    id: '3',
    title: 'Подготовить ежеквартальный отчёт по продуктивности',
    category: 'stats',
    employee: 'Морозова И.А.',
    priority: 'medium',
    description: '',
    deadline: '2026-03-31',
    status: 'done',
    createdAt: '20.03.2026',
  },
];

export default function TaskBoard() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const handleCreateTicket = (data: TicketData) => {
    const newTicket: Ticket = {
      ...data,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date().toLocaleDateString('ru-RU'),
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleStatusChange = (id: string, status: Ticket['status']) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const getColumnTickets = (status: Ticket['status']) =>
    tickets.filter((t) => t.status === status && (filter === 'all' || t.category === filter));

  const totalNew = tickets.filter((t) => t.status === 'new').length;

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <header className="bg-white border-b px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Доска задач</h1>
          <p className="text-sm text-gray-400 mt-0.5">Управление тикетами сотрудников</p>
        </div>
        <div className="flex items-center gap-3">
          {totalNew > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              {totalNew} новых
            </span>
          )}
          <Button
            onClick={() => setModalOpen(true)}
            className="h-9 px-4 text-sm font-medium text-white flex items-center gap-2"
            style={{ background: 'hsl(var(--primary))' }}
          >
            <Icon name="Plus" size={15} />
            Создать тикет
          </Button>
        </div>
      </header>

      <div className="px-8 py-4 bg-white border-b flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${filter === 'all' ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
          style={filter === 'all' ? { background: 'hsl(var(--primary))' } : {}}
        >
          Все категории
        </button>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${filter === key ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
            style={filter === key ? { background: 'hsl(var(--primary))' } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-8 grid grid-cols-3 gap-6 overflow-auto">
        {STATUS_COLUMNS.map((col) => {
          const colTickets = getColumnTickets(col.key);
          return (
            <div key={col.key} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={col.icon} size={15} className="text-gray-400" fallback="Circle" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{col.label}</span>
                <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{colTickets.length}</span>
              </div>

              {colTickets.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-xs text-gray-400">Нет тикетов</p>
                </div>
              )}

              {colTickets.map((ticket, i) => {
                const priority = PRIORITY_STYLE[ticket.priority];
                return (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: priority.bg, color: priority.color }}
                      >
                        {priority.label}
                      </span>
                      <span className="text-xs text-gray-400">{ticket.createdAt}</span>
                    </div>

                    <p className="text-sm font-medium leading-snug mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                      {ticket.title}
                    </p>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
                        {CATEGORY_LABELS[ticket.category] || ticket.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: 'hsl(var(--primary))' }}>
                          {ticket.employee.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-500">{ticket.employee}</span>
                      </div>
                      {ticket.deadline && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Icon name="Calendar" size={11} />
                          {new Date(ticket.deadline).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {STATUS_COLUMNS.filter((s) => s.key !== col.key).map((s) => (
                        <button
                          key={s.key}
                          onClick={() => handleStatusChange(ticket.id, s.key)}
                          className="text-xs px-2 py-1 rounded text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          → {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <CreateTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}
