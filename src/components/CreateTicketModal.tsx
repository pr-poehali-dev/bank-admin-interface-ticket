import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CATEGORIES = [
  { value: 'auth', label: 'Регистрация и авторизация новых сотрудников', icon: 'UserPlus' },
  { value: 'staff-admin', label: 'Администрирование информации по сотрудникам', icon: 'Users' },
  { value: 'staff-access', label: 'Доступ к просмотру информации по сотрудникам', icon: 'Eye' },
  { value: 'stats', label: 'Статистика по работе сотрудников', icon: 'BarChart2' },
  { value: 'tasks', label: 'Выставление задач для сотрудников', icon: 'ClipboardList' },
  { value: 'feedback', label: 'Фидбек по сотрудникам', icon: 'MessageSquare' },
  { value: 'currency', label: 'Бронь условий по курсу валют', icon: 'DollarSign' },
  { value: 'individual', label: 'Индивидуальные условия для клиента по продуктам', icon: 'Star' },
  { value: 'products', label: 'Разработка продуктов (кредитные, депозитные и т.д.)', icon: 'Briefcase' },
];

const PRIORITIES = [
  { value: 'low', label: 'Низкий', color: '#6b7280' },
  { value: 'medium', label: 'Средний', color: '#d97706' },
  { value: 'high', label: 'Высокий', color: '#dc2626' },
];

const EMPLOYEES = [
  'Иванова М.С.',
  'Петров А.К.',
  'Сидорова Е.В.',
  'Козлов Д.Н.',
  'Морозова И.А.',
  'Новиков В.П.',
];

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: TicketData) => void;
}

export interface TicketData {
  title: string;
  category: string;
  employee: string;
  priority: string;
  description: string;
  deadline: string;
}

export default function CreateTicketModal({ open, onClose, onSubmit }: CreateTicketModalProps) {
  const [form, setForm] = useState<TicketData>({
    title: '',
    category: '',
    employee: '',
    priority: 'medium',
    description: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.employee) return;
    onSubmit(form);
    setForm({ title: '', category: '', employee: '', priority: 'medium', description: '', deadline: '' });
    onClose();
  };

  const isValid = form.title && form.category && form.employee;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <DialogHeader className="px-6 py-5 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'hsl(var(--accent))' }}>
              <Icon name="Plus" size={16} style={{ color: 'hsl(var(--accent-foreground))' }} />
            </div>
            <DialogTitle className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Создать тикет
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="bg-white">
          <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Заголовок тикета *</Label>
              <Input
                placeholder="Краткое описание задачи"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Категория *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="text-sm h-9">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <Icon name={cat.icon} size={14} fallback="Circle" className="text-gray-400" />
                        <span className="text-sm">{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Сотрудник *</Label>
                <Select value={form.employee} onValueChange={(v) => setForm({ ...form, employee: v })}>
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="Выбрать" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEES.map((emp) => (
                      <SelectItem key={emp} value={emp}>
                        <span className="text-sm">{emp}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Приоритет</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          <span className="text-sm">{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Срок выполнения</Label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Описание</Label>
              <Textarea
                placeholder="Подробное описание задачи, требования, контекст..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="text-sm resize-none min-h-[80px]"
                rows={3}
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Отмена
            </button>
            <Button
              type="submit"
              disabled={!isValid}
              className="text-sm h-9 px-5 text-white"
              style={{ background: isValid ? 'hsl(var(--primary))' : undefined }}
            >
              <Icon name="Send" size={14} className="mr-2" />
              Создать тикет
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
