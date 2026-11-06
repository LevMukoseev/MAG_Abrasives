interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * Renders the final value immediately to keep server and hydrated output stable.
 */
export default function StatCounter({ value, prefix = '', suffix = '' }: StatCounterProps) {
  return (
    <span className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
