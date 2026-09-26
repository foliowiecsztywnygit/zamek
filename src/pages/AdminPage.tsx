import { useState, useEffect, useCallback } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
  eachDayOfInterval,
  isWithinInterval,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Lock, LogOut, Calendar, Inbox, Trash2, Plus, X, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

const API = 'http://localhost:3001';

interface Cabin {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
}

interface AvailabilityBlock {
  id: number;
  cabinId: string;
  startDate: string;
  endDate: string;
}

interface Inquiry {
  id: number;
  cabinId: string;
  cabinName: string;
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  message: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

// ─── Login Screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API}/api/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin(password);
      } else {
        setError('Nieprawidłowe hasło');
      }
    } catch {
      setError('Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-brand-green" />
          </div>
          <h1 className="text-3xl font-heading text-brand-green uppercase tracking-wide">Panel Administracyjny</h1>
          <p className="text-sm text-foreground-body/60 mt-2 font-ui uppercase tracking-widest">Zamek Bukowiec</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background-card border border-brand-green/10 p-8 shadow-card">
          <label className="block text-xs font-ui tracking-[0.22em] uppercase text-foreground-body/70 mb-2">
            Hasło dostępu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-4 bg-background border border-brand-green/10 focus:outline-none focus:border-brand-green text-sm transition-colors mb-4"
            autoFocus
          />
          {error && (
            <p className="text-red-600 text-sm mb-4 font-ui">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full h-12 bg-brand-green text-white font-ui uppercase tracking-widest text-sm hover:bg-brand-green-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Calendar for single cabin ───────────────────────────
function AdminCalendar({
  cabinId,
  blocks,
  onAddBlock,
  onDeleteBlock,
}: {
  cabinId: string;
  blocks: AvailabilityBlock[];
  onAddBlock: (cabinId: string, startDate: string, endDate: string) => void;
  onDeleteBlock: (blockId: number) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectStart, setSelectStart] = useState<Date | null>(null);
  const [selectEnd, setSelectEnd] = useState<Date | null>(null);

  const cabinBlocks = blocks.filter(b => b.cabinId === cabinId);

  // Expand blocks into individual blocked days
  const blockedDays: { date: Date; blockId: number }[] = [];
  cabinBlocks.forEach(block => {
    const start = parseISO(block.startDate);
    const end = parseISO(block.endDate);
    const days = eachDayOfInterval({ start, end });
    days.forEach(d => blockedDays.push({ date: d, blockId: block.id }));
  });

  const isBlocked = (day: Date) => blockedDays.some(b => isSameDay(b.date, day));
  const getBlockId = (day: Date) => blockedDays.find(b => isSameDay(b.date, day))?.blockId;

  const isInSelection = (day: Date) => {
    if (!selectStart) return false;
    if (!selectEnd) return isSameDay(day, selectStart);
    return isWithinInterval(day, { start: selectStart, end: selectEnd });
  };

  const handleDayClick = (day: Date) => {
    // If clicking a blocked day, offer to delete
    if (isBlocked(day)) {
      const blockId = getBlockId(day);
      if (blockId && confirm('Usunąć tę blokadę dostępności?')) {
        onDeleteBlock(blockId);
      }
      return;
    }

    if (!selectStart || selectEnd) {
      // Start new selection
      setSelectStart(day);
      setSelectEnd(null);
    } else {
      // Complete selection
      if (day < selectStart) {
        setSelectEnd(selectStart);
        setSelectStart(day);
      } else {
        setSelectEnd(day);
      }
    }
  };

  const handleAddBlock = () => {
    if (!selectStart || !selectEnd) return;
    onAddBlock(cabinId, format(selectStart, 'yyyy-MM-dd'), format(selectEnd, 'yyyy-MM-dd'));
    setSelectStart(null);
    setSelectEnd(null);
  };

  const clearSelection = () => {
    setSelectStart(null);
    setSelectEnd(null);
  };

  // Render calendar grid
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { locale: pl });
  const calEnd = endOfWeek(monthEnd, { locale: pl });

  const dayHeaders = [];
  const dayStart = startOfWeek(currentMonth, { locale: pl });
  for (let i = 0; i < 7; i++) {
    dayHeaders.push(
      <div key={i} className="text-center font-ui text-[10px] uppercase tracking-widest text-foreground-body/50 py-2">
        {format(addDays(dayStart, i), 'EEEEEE', { locale: pl })}
      </div>
    );
  }

  const rows = [];
  let days = [];
  let day = calStart;

  while (day <= calEnd) {
    for (let i = 0; i < 7; i++) {
      const d = day;
      const blocked = isBlocked(d);
      const inSel = isInSelection(d);
      const isStart = selectStart && isSameDay(d, selectStart);
      const isEnd = selectEnd && isSameDay(d, selectEnd);
      const inMonth = isSameMonth(d, monthStart);

      days.push(
        <div
          key={d.toString()}
          className={cn(
            "p-0.5 flex justify-center items-center h-9",
            inSel && !blocked ? "bg-brand-green/10" : "",
          )}
        >
          <button
            type="button"
            onClick={() => handleDayClick(d)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all relative",
              !inMonth ? "text-foreground-body/20" : "text-foreground-heading",
              blocked ? "bg-red-500/80 text-white hover:bg-red-600 cursor-pointer" : "hover:bg-brand-green/15",
              (isStart || isEnd) && !blocked ? "bg-brand-green text-white ring-2 ring-brand-green/30" : "",
            )}
            title={blocked ? "Kliknij, aby usunąć blokadę" : "Kliknij, aby wybrać datę"}
          >
            {format(d, 'd')}
          </button>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
    days = [];
  }

  return (
    <div className="bg-background-card border border-brand-green/10 p-5 shadow-card">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-3">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1.5 hover:bg-brand-green/10 rounded-full transition-colors text-brand-green"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-heading uppercase tracking-widest text-brand-green text-sm">
          {format(currentMonth, 'LLLL yyyy', { locale: pl })}
        </div>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1.5 hover:bg-brand-green/10 rounded-full transition-colors text-brand-green"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">{dayHeaders}</div>

      {/* Calendar cells */}
      {rows}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-brand-green/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/60">Zablokowane</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-brand-green" />
          <span className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/60">Zaznaczone</span>
        </div>
      </div>

      {/* Selection action bar */}
      {selectStart && (
        <div className="mt-3 pt-3 border-t border-brand-green/10 flex items-center justify-between gap-3">
          <div className="text-xs text-foreground-body font-ui">
            {selectEnd
              ? `${format(selectStart, 'dd.MM')} → ${format(selectEnd, 'dd.MM.yyyy')}`
              : `Od: ${format(selectStart, 'dd.MM.yyyy')} — wybierz koniec`}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearSelection}
              className="h-8 px-3 text-xs font-ui uppercase tracking-widest border border-brand-green/20 hover:bg-brand-green/5 transition-colors text-foreground-body rounded-sm"
            >
              <X className="w-3 h-3" />
            </button>
            {selectEnd && (
              <button
                type="button"
                onClick={handleAddBlock}
                className="h-8 px-4 text-xs font-ui uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1.5 rounded-sm"
              >
                <Plus className="w-3 h-3" />
                Zablokuj
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(() => localStorage.getItem('admin_password'));
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeCabin, setActiveCabin] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'calendar' | 'inquiries'>('calendar');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const [cabinsRes, availRes, inqRes] = await Promise.all([
        fetch(`${API}/api/cabins`),
        fetch(`${API}/api/availability`),
        fetch(`${API}/api/admin/inquiries`, { headers: { Authorization: pw } }),
      ]);

      const cabinsData = await cabinsRes.json();
      const availData = await availRes.json();
      const inqData = inqRes.ok ? await inqRes.json() : [];

      setCabins(cabinsData);
      setBlocks(availData);
      setInquiries(inqData);

      if (!activeCabin && cabinsData.length > 0) {
        setActiveCabin(cabinsData[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  }, [activeCabin]);

  useEffect(() => {
    if (password) fetchData(password);
  }, [password, fetchData]);

  const handleLogin = (pw: string) => {
    localStorage.setItem('admin_password', pw);
    setPassword(pw);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_password');
    setPassword(null);
  };

  const handleAddBlock = async (cabinId: string, startDate: string, endDate: string) => {
    if (!password) return;
    try {
      const res = await fetch(`${API}/api/admin/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: password },
        body: JSON.stringify({ cabinId, startDate, endDate }),
      });
      if (res.ok) {
        fetchData(password);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlock = async (blockId: number) => {
    if (!password) return;
    try {
      const res = await fetch(`${API}/api/admin/availability/${blockId}`, {
        method: 'DELETE',
        headers: { Authorization: password },
      });
      if (res.ok) {
        fetchData(password);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (inquiryId: number) => {
    if (!password) return;
    if (!confirm('Czy na pewno chcesz usunąć to zapytanie?')) return;
    
    try {
      const res = await fetch(`${API}/api/admin/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: { Authorization: password },
      });
      if (res.ok) {
        fetchData(password);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!password) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-heading text-brand-green uppercase tracking-wide">Panel Admina</h1>
            <p className="text-xs font-ui tracking-widest uppercase text-foreground-body/50 mt-1">Zamek Bukowiec · Zarządzanie</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 h-10 px-5 border border-brand-green/20 hover:bg-brand-green/5 transition-colors font-ui text-xs uppercase tracking-widest text-foreground-body"
          >
            <LogOut className="w-4 h-4" />
            Wyloguj
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-brand-green/10 mb-8 gap-0">
          <button
            onClick={() => setActiveTab('calendar')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 font-ui text-xs uppercase tracking-widest transition-colors border-b-2 -mb-px",
              activeTab === 'calendar'
                ? "border-brand-green text-brand-green"
                : "border-transparent text-foreground-body/50 hover:text-foreground-body"
            )}
          >
            <Calendar className="w-4 h-4" />
            Kalendarz dostępności
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 font-ui text-xs uppercase tracking-widest transition-colors border-b-2 -mb-px",
              activeTab === 'inquiries'
                ? "border-brand-green text-brand-green"
                : "border-transparent text-foreground-body/50 hover:text-foreground-body"
            )}
          >
            <Inbox className="w-4 h-4" />
            Zapytania
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-foreground-body/50 font-ui uppercase tracking-widest text-sm">
            Ładowanie...
          </div>
        ) : activeTab === 'calendar' ? (
          <div>
            {/* Cabin selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cabins.map(cabin => (
                <button
                  key={cabin.id}
                  onClick={() => setActiveCabin(cabin.id)}
                  className={cn(
                    "px-4 py-2 text-xs font-ui uppercase tracking-widest transition-all border",
                    activeCabin === cabin.id
                      ? "bg-brand-green text-white border-brand-green"
                      : "bg-background-card text-foreground-body/70 border-brand-green/15 hover:border-brand-green/40"
                  )}
                >
                  {cabin.name}
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="bg-brand-green/5 border border-brand-green/10 p-4 mb-6">
              <p className="text-xs text-foreground-body/80 font-ui leading-relaxed">
                <strong className="text-brand-green">Instrukcja:</strong> Kliknij datę początkową, potem końcową, aby zaznaczyć zakres → kliknij{' '}
                <span className="text-red-500 font-semibold">Zablokuj</span> aby oznaczyć terminy jako niedostępne.
                Kliknij <span className="text-red-500 font-semibold">czerwoną datę</span>, aby usunąć blokadę.
              </p>
            </div>

            {/* Calendar grid - 2 months side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AdminCalendar
                cabinId={activeCabin}
                blocks={blocks}
                onAddBlock={handleAddBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            </div>

            {/* Active blocks list for this cabin */}
            {(() => {
              const cabinBlocks = blocks.filter(b => b.cabinId === activeCabin);
              if (cabinBlocks.length === 0) return null;
              return (
                <div className="mt-8">
                  <h3 className="text-sm font-heading text-brand-green uppercase tracking-wide mb-4 border-b border-brand-green/10 pb-2">
                    Aktywne blokady ({cabinBlocks.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cabinBlocks.map(block => (
                      <div
                        key={block.id}
                        className="flex items-center justify-between bg-background-card border border-red-200 p-3 group hover:border-red-300 transition-colors"
                      >
                        <div>
                          <div className="text-sm font-ui text-foreground-heading">
                            {format(parseISO(block.startDate), 'dd.MM.yyyy')} → {format(parseISO(block.endDate), 'dd.MM.yyyy')}
                          </div>
                          <div className="text-[10px] font-ui uppercase tracking-widest text-red-500 mt-0.5">
                            Niedostępne
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm('Usunąć tę blokadę?')) handleDeleteBlock(block.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center text-foreground-body/30 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-heading text-brand-green uppercase tracking-wide mb-6 border-b border-brand-green/10 pb-4">
              Ostatnie zapytania
            </h2>
            {inquiries.length === 0 ? (
              <p className="text-foreground-body/60 text-sm font-ui">Brak nowych zapytań.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-background-card border border-brand-green/10 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm">
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-heading text-lg text-brand-green">{inq.name}</h3>
                          <span className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 bg-background px-2 py-1 border border-brand-green/10">
                            {format(parseISO(inq.createdAt), 'dd.MM.yyyy HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-body/80 font-ui">
                          {inq.email} • {inq.phone}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm font-ui bg-background p-4 border border-brand-green/5">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-foreground-body/50 mb-1">Wybrany pokój</p>
                          <p className="font-medium text-foreground-heading">{inq.cabinName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-foreground-body/50 mb-1">Termin</p>
                          <p className="font-medium text-foreground-heading">
                            {format(parseISO(inq.startDate), 'dd.MM')} - {format(parseISO(inq.endDate), 'dd.MM.yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-foreground-body/50 mb-1">Goście</p>
                          <p className="font-medium text-foreground-heading">Dorośli: {inq.adults} {inq.children > 0 && `• Dzieci: ${inq.children}`}</p>
                        </div>
                      </div>

                      {inq.message && (
                        <div>
                          <p className="text-[10px] font-ui uppercase tracking-widest text-foreground-body/50 mb-1">Wiadomość od gościa</p>
                          <p className="text-sm text-foreground-body/80 italic border-l-2 border-brand-green/30 pl-3 py-1">
                            {inq.message}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-brand-green/10 pt-4 md:pt-0 md:pl-4">
                      <button 
                        onClick={() => handleAddBlock(inq.cabinId, inq.startDate, inq.endDate)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-4 text-xs font-ui uppercase tracking-widest bg-brand-green text-white hover:bg-brand-green-light transition-colors"
                      >
                        <Lock className="w-3 h-3" />
                        Zablokuj Termin
                      </button>
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-4 text-xs font-ui uppercase tracking-widest border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Usuń Zapytanie
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
