import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeSection: 'tasks' | 'analytics';
  onSectionChange: (section: 'tasks' | 'analytics') => void;
}

const navItems = [
  { id: 'tasks' as const, label: 'Доска задач', icon: 'LayoutDashboard' },
  { id: 'analytics' as const, label: 'Аналитика', icon: 'BarChart2' },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-60 min-h-screen flex flex-col" style={{ background: 'hsl(var(--sidebar-bg))' }}>
      <div className="px-6 py-7 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'hsl(var(--primary))' }}>
            <Icon name="Landmark" size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'hsl(var(--sidebar-text))' }}>БанкАдмин</p>
            <p className="text-xs" style={{ color: 'hsl(var(--sidebar-text))', opacity: 0.5 }}>Личный кабинет</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 mb-3 text-xs font-medium uppercase tracking-widest" style={{ color: 'hsl(var(--sidebar-text))', opacity: 0.4 }}>
          Навигация
        </p>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-150"
              style={{
                background: isActive ? 'hsl(var(--sidebar-accent))' : 'transparent',
                color: isActive ? 'hsl(var(--sidebar-text-active))' : 'hsl(var(--sidebar-text))',
              }}
            >
              <Icon name={item.icon} size={16} fallback="Circle" />
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-70" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: 'hsl(var(--primary))' }}>
            АД
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: 'hsl(var(--sidebar-text-active))' }}>Администратор</p>
            <p className="text-xs" style={{ color: 'hsl(var(--sidebar-text))', opacity: 0.5 }}>Главный</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
