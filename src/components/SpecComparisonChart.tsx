import React from 'react';

interface Metric {
  label: string;
  unit: string;
  gdValue: number;
  competitorValue: number;
}

interface SpecComparisonChartProps {
  competitorName: string;
  metrics: Metric[];
}

/**
 * Компактное сравнение GD-Abrasives с конкурентом по 1-2 метрикам
 * (коэффициент шлифования GR, скорость съёма металла MRR и т.п.).
 * Цвет закреплён за сущностью (GD = accent, конкурент = нейтральный),
 * а не за рангом — конкурент всегда серый, вне зависимости от того,
 * кто в итоге оказался выше.
 */
export default function SpecComparisonChart({ competitorName, metrics }: SpecComparisonChartProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-3 text-xs font-semibold text-ink/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
          GD-Abrasives
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-ink/30" aria-hidden="true" />
          {competitorName}
        </span>
      </div>

      <div className="space-y-4">
        {metrics.map((m) => {
          const max = Math.max(m.gdValue, m.competitorValue) || 1;
          const gdPct = Math.max((m.gdValue / max) * 100, 4);
          const compPct = Math.max((m.competitorValue / max) * 100, 4);
          return (
            <div key={m.label}>
              <p className="text-xs font-bold text-ink/70 uppercase tracking-wide mb-1.5">{m.label}</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 rounded-full bg-black/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${gdPct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-bold text-ink tabular-nums">
                    {m.gdValue}
                    {m.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 rounded-full bg-black/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-ink/30"
                      style={{ width: `${compPct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-semibold text-ink/50 tabular-nums">
                    {m.competitorValue}
                    {m.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
