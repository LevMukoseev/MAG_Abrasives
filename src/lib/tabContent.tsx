import React from 'react';
import Image from 'next/image';
import SpecComparisonChart from '@/components/SpecComparisonChart';

function RaTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-black/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-accent/10">
            <th className="text-left font-bold text-ink px-3 py-2">Размер зерна</th>
            <th className="text-left font-bold text-ink px-3 py-2">Ra</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([grain, ra], i) => (
            <tr key={grain} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
              <td className="px-3 py-1.5 text-ink/80">{grain}</td>
              <td className="px-3 py-1.5 text-ink/80 tabular-nums">{ra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SpecTable({
  rollTypeLabel,
  columns,
  rows,
}: {
  rollTypeLabel: string;
  columns: string[];
  rows: [string, ...string[]][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-black/10">
      <table className="w-full text-sm whitespace-nowrap">
        <thead>
          <tr className="bg-accent/10">
            <th className="text-left font-bold text-ink px-3 py-2">{rollTypeLabel}</th>
            {columns.map((c) => (
              <th key={c} className="text-left font-bold text-ink px-3 py-2">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0]} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-1.5 ${j === 0 ? 'font-bold text-ink' : 'text-ink/80 font-mono text-xs'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const EFFECT_ICON: Record<string, { symbol: string; className: string }> = {
  up: { symbol: '↑', className: 'text-accent-dark' },
  down: { symbol: '↓', className: 'text-ink/40' },
  none: { symbol: '○', className: 'text-ink/30' },
};

function EffectCell({ effect }: { effect: 'up' | 'down' | 'none' }) {
  const e = EFFECT_ICON[effect];
  return <span className={`font-bold ${e.className}`}>{e.symbol}</span>;
}

export const tabContent = [
  {
    title: 'Шлифовка прокатных валков',
    content: (
      <div>
        <h3 className="text-xl font-extrabold text-ink mb-4">Шлифовка прокатных валков</h3>

        <p className="text-ink/70 mb-6">Валки — важная часть прокатных станов: давление, создаваемое парой или комплектом валков, формирует прокатываемую сталь. Распространённые типы валков — стальные, чугунные и кованые. Из-за динамических и статических нагрузок в процессе прокатки, а также деформаций от перепадов температуры, валки часто требуют перешлифовки.</p>

        <div className="grid sm:grid-cols-2 gap-6 items-center mb-8">
          <div className="bg-paper-soft rounded-xl2 p-6 text-sm text-ink/80 space-y-1.5">
            <p><b>Станки:</b> HERKULES, POMINI, Waldrich Siegen, Jiustina, METEX и др.</p>
            <p><b>Круги:</b> диаметром от 450 до 1100 мм, наиболее типовые: 01_750x80x305, 01_900x80x305, 01_915x80x304.8, 01_915x100x304.8, 01_1066x152x508, 01_1100x100x508, 1060x75x407.3 и др.</p>
            <p><b>Тип зерна:</b> 30…70% зерна NQN и зёрна Vortex</p>
            <p><b>Размер зерна:</b> F30-60 (и мельче, если есть требования)</p>
            <p><b>Твёрдость:</b> C-D-F-G-H-I-J-K</p>
            <p><b>Связка:</b> на бакелитовой основе</p>
          </div>
          <Image
            src="/images/roll-photo-2.jpg"
            alt="Прокатный валок после шлифовки"
            width={1000}
            height={563}
            sizes="(min-width: 640px) 45vw, 100vw"
            className="w-full h-auto rounded-xl2 shadow-md"
          />
        </div>

        <h4 className="text-xl font-extrabold text-ink mb-4">Круги для рабочих валков горячей прокатки (ГП)</h4>
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <p className="text-ink/70">В качестве материалов для валков используются чугун с длительным сроком службы (ICDP), сталь с высоким содержанием хрома (High-Cr) и быстрорежущая сталь (HSS). Требования к поверхности валков ГП ниже, чем к валкам холодной прокатки.</p>
          <Image
            src="/images/valki1.png"
            alt="Материалы для валков ГП"
            width={257}
            height={101}
            sizes="192px"
            className="w-48 h-32 object-cover rounded-lg shadow-md shrink-0"
          />
        </div>
        <div className="mb-4">
          <Image
            src="/images/valki2.png"
            alt="Керамическое зерно NQN и Vortex"
            width={609}
            height={106}
            sizes="192px"
            className="float-right ml-4 mb-4 w-48 h-32 object-cover rounded-lg shadow-md"
          />
          <p className="text-ink/70">В качестве материалов для валков используются чугун с длительным сроком службы (ICDP), сталь с высоким содержанием хрома (High-Cr) и быстрорежущая сталь (HSS). Требования к поверхности валков ГП ниже, чем к валкам холодной прокатки. Для более высокой скорости съёма и стойкости круга мы также добавляем зерно <span className="text-accent font-bold">NQN</span> последнего поколения от 20 до 40% или Vortex (<span className="text-ink font-extrabold">АА</span>).</p>
        </div>

        <p className="text-ink/70 mb-4">Обычно используемый диапазон размеров абразивного зерна составляет приблизительно <b>F30-46</b> по FEPA. При горячей прокатке обычно используются круги из зелёного карбида кремния (SiC); на маломощных станках — чёрный карбид кремния (в обозначении буква «C» вместо «G»).</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <RaTable rows={[['30', '3,5-1,25'], ['36', '1,25-0,8'], ['46', '1,0-0,63']]} />
          <SpecTable
            rollTypeLabel="Тип валка ГП"
            columns={['ICDP', 'High-Cr steel', 'High-Cr cast iron', 'HSS']}
            rows={[
              ['BEST', '3NQNG46IB08', '3NQNG36JB08', '5NQNG36IB08', '5NQNG46IB08'],
              ['BETTER', '1CAAG46IB09', '1CAAG36JB09', '3CAAG36IB09', '1CAAG46IB09'],
              ['GOOD', 'GC46IB06', 'WA36JB06', '1CAAG36IB06', 'GC46IB06'],
            ]}
          />
        </div>

        <h4 className="text-xl font-extrabold text-ink mb-4">Круги для рабочих валков холодной прокатки (ХП)</h4>
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <p className="text-ink/70">С поверхности валка снимается меньше металла, но при этом требуется высокое качество поверхности. Диаметр рабочего валка составляет приблизительно от 300 до 900 мм, а длина составляет 2500-5000 мм. Размер абразивного зерна колеблется от F36 до 120 по FEPA. В качестве материалов для валков в основном используются кованая и быстрорежущая сталь (HSS).</p>
          <Image
            src="/images/valki3.png"
            alt="Рабочие валки холодной прокатки"
            width={257}
            height={147}
            sizes="192px"
            className="w-48 h-32 object-cover rounded-lg shadow-md shrink-0"
          />
        </div>
        <div className="mb-4">
          <Image
            src="/images/valki4.png"
            alt="Шлифовальные круги для холодной прокатки"
            width={545}
            height={114}
            sizes="192px"
            className="float-right ml-4 mb-4 w-48 h-32 object-cover rounded-lg shadow-md"
          />
          <p className="text-ink/70">При холодной прокатке, ввиду более высокой твердости валков, используются шлифовальные круги достаточно мягкие (градации твердости C…G) с высокой концентрацией керамического корунда <span className="text-accent font-bold">NQN</span> (20-70%), либо <span className="text-ink font-extrabold">Vortex</span>, чтобы минимизировать время перешлифовки. Если Вам важен минимальный по времени оборот валков на вальцешлифовальном участке – выбирайте спецификации BEST. Размер зерна выбирайте по таблице или из опыта. С помощью режимов обработки можно получать Ra в достаточно широком диапазоне. Но в шлифовании есть правило – выбирать максимально крупное зерно, которое может обеспечивать требуемую чистоту поверхности. Так Вы быстрее снимите нужный припуск и меньше времени потратите на правку круга, а резание будет более свободное, меньше прижогов, выше стойкость круга и ниже себестоимость операции.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <RaTable
            rows={[
              ['36', '0,8-1,25'],
              ['46', '0,63-1,0'],
              ['60', '0,5-0,8'],
              ['80', '0,32-0,63'],
              ['120', '0,16-0,32'],
            ]}
          />
          <SpecTable
            rollTypeLabel="Тип валка ХП"
            columns={['Кованая сталь (ср./низкий Cr)', 'High-Cr steel', 'HSS']}
            rows={[
              ['BEST', '5NQN60CB10', '5NQN60CB10', '7NQNG46СB10'],
              ['BETTER', 'WA60FB08', 'WA60FB08', '2CAAG46FB09'],
              ['GOOD', 'A60FB06', 'WA60FB06', 'GC46FB06'],
            ]}
          />
        </div>

        <h4 className="text-xl font-extrabold text-ink mb-4">Круги для опорных валков на горячие и холодные прокатные станы</h4>
        <p className="text-ink/70 mb-4">Опорные валки передают и поддерживают давление на рабочие валки. Они имеют больший диаметр, чем рабочие валки (до 1600 мм в диаметре). Валки бывают литыми или коваными. Опорные валки обычно изготавливаются из хромистой стали с содержанием хрома от 2 до 5 %. В некоторых случаях используется чугун с двойным литьём и быстрорежущая сталь (HSS). Опорные валки шлифуют не так часто, как рабочие, но, как правило, с них удаляется значительно больше материала (до 2 мм и более в диаметре). Зернистость обычно варьируется от 30 до 46 для достижения требуемой степени обработки поверхности.</p>

        <p className="text-ink/70 mb-4">На опорные валки обычно используются шлифовальные круги из обычного или белого оксида алюминия. Для более высокой скорости съёма и стойкости круга мы также добавляем зерно <span className="text-accent font-bold">NQN</span> последнего поколения от 20 до 40% или Vortex (<span className="text-ink font-extrabold">АА</span>).</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <RaTable rows={[['30', '1,3-3,5'], ['36', '1,0-3,0'], ['46', '0,7-2,0']]} />
          <SpecTable
            rollTypeLabel="Тип валка ГП"
            columns={['Кованая сталь (средний и низкий Cr)']}
            rows={[
              ['BEST', '4NQN36JB10'],
              ['BETTER', '2WAA36DB08'],
              ['GOOD', 'WA36KB06'],
            ]}
          />
        </div>

        <h4 className="text-xl font-extrabold text-ink mb-4">Влияние размера круга</h4>
        <ul className="text-ink/70 mb-6 space-y-2">
          <li>• Когда диаметр шлифовального круга в процессе шлифования уменьшается, а скорость вращения шпинделя остаётся прежней (об/мин), линейная скорость поверхности шлифовального круга снижается. При снижении линейной скорости поверхности на каждые 5 м/с круг начинает работать мягче на одну градацию. Снижение твёрдости круга ускоряет его износ, тем самым сокращая срок службы. При уменьшении диаметра шлифовального круга контактная поверхность уменьшается, что приводит к увеличению удельного усилия в зоне шлифования. Это делает шлифовальный круг более мягким в работе, износ круга ускоряется.</li>
          <li>• Благодаря уникальной связке B09, разработанной компанией GD-Abrasives, на одном и том же шлифовальном круге могут быть достигнуты различные уровни твердости, что позволяет компенсировать снижение скорости при постоянных оборотах на станках, которые не могут поддерживать постоянную линейную скорость шлифования.</li>
        </ul>

        <h4 className="text-xl font-extrabold text-ink mb-4">Влияние размера зерна</h4>
        <ul className="text-ink/70 space-y-2 mb-6">
          <li>• Крупная зернистость увеличивает срок службы круга и производительность.</li>
          <li>• Мелкая зернистость улучшает чистоту поверхности, а также необходима для шлифования твердых материалов, таких как HSS.</li>
          <li>• Тип абразива и связка также влияют на чистоту поверхности.</li>
        </ul>

        <h4 className="text-xl font-extrabold text-ink mb-4">Влияние параметров на процесс шлифования</h4>
        <div className="overflow-x-auto rounded-lg border border-black/10 mb-2">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-accent/10">
                <th className="text-left font-bold text-ink px-3 py-2">Параметр процесса</th>
                <th className="text-center font-bold text-ink px-3 py-2" colSpan={2}>Скорость круга</th>
                <th className="text-center font-bold text-ink px-3 py-2" colSpan={2}>Скорость валка</th>
                <th className="text-center font-bold text-ink px-3 py-2" colSpan={2}>Продольная подача</th>
                <th className="text-center font-bold text-ink px-3 py-2" colSpan={2}>Поперечная подача</th>
              </tr>
              <tr className="bg-accent/5 text-xs text-ink/50">
                <th className="px-3 py-1"></th>
                <th className="px-3 py-1">ниже</th>
                <th className="px-3 py-1">выше</th>
                <th className="px-3 py-1">ниже</th>
                <th className="px-3 py-1">выше</th>
                <th className="px-3 py-1">ниже</th>
                <th className="px-3 py-1">выше</th>
                <th className="px-3 py-1">ниже</th>
                <th className="px-3 py-1">выше</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Скорость съёма', vals: ['down', 'up', 'up', 'down', 'down', 'up', 'down', 'up'] },
                { label: 'Износ круга', vals: ['up', 'down', 'down', 'up', 'down', 'up', 'down', 'up'] },
                { label: 'Нагрузка', vals: ['down', 'up', 'up', 'down', 'down', 'up', 'down', 'up'] },
                { label: 'Дробление', vals: ['down', 'up', 'none', 'none', 'down', 'up', 'down', 'up'] },
                { label: 'Чистота Ra', vals: ['none', 'none', 'up', 'down', 'down', 'up', 'down', 'up'] },
              ].map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                  <td className="px-3 py-1.5 font-bold text-ink">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className="px-3 py-1.5 text-center">
                      <EffectCell effect={v as 'up' | 'down' | 'none'} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink/40 mb-8">↑ — рост показателя, ↓ — снижение показателя, ○ — эффекта нет.</p>

        <h4 className="text-xl font-extrabold text-ink mb-6">Сравнение с конкурентами на реальных объектах</h4>
        <div className="space-y-5 mb-8">
          <div className="rounded-xl2 border border-black/10 bg-paper-soft p-6">
            <p className="text-sm font-bold text-accent-dark mb-2">Пример 1</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink/80 mb-3">
              <p><b>Станок:</b> Waldrich Siegen 500 кВт</p>
              <p><b>Валок:</b> ICDP CE-75</p>
              <p><b>Круг GD-Abrasives:</b> 01_1060x75x407.3 EQA36RB10, 63 м/с</p>
              <p><b>Конкурент:</b> Norton 01_1060x75x407.3 QA36-RBT2, 63 м/с</p>
              <p className="sm:col-span-2"><b>Требования по Ra:</b> 0,8</p>
            </div>
            <p className="text-sm text-ink/70">Производитель валков в России, поставляет валки практически всем российским клиентам и за пределы России. Круг GD-Abrasives показал коэффициент шлифования (GR) 50 на валках ICDP — у Norton показатель GR 30. Круг Norton не обеспечивал стабильную чистовую обработку на Ra 0,8 при шлифовке на финише более 300 мм по длине валка: нагрузка на поверхность круга росла, чистота ухудшалась. Круг GD-Abrasives обеспечивает стабильность Ra 0,8 по полной длине валка 2000 мм при подаче вперёд и назад. Производитель полностью перешёл на круги GD-Abrasives.</p>
          </div>

          <div className="rounded-xl2 border border-black/10 bg-paper-soft p-6">
            <p className="text-sm font-bold text-accent-dark mb-2">Пример 2</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink/80">
              <p><b>Станок:</b> 110 кВт</p>
              <p><b>Валок:</b> Cr5 2130×470~530</p>
              <p><b>Круг GD-Abrasives:</b> 01_915x100x304.8 AA46HB08, 50 м/с</p>
              <p><b>Конкурент:</b> Atlantic EK3 46-H6 RE DP</p>
              <p className="sm:col-span-2"><b>Требования по Ra:</b> 0,8</p>
            </div>
            <SpecComparisonChart
              competitorName="Atlantic"
              metrics={[
                { label: 'GR — коэффициент шлифования', unit: '', gdValue: 4.12, competitorValue: 2.34 },
                { label: 'MRR — скорость съёма металла', unit: '', gdValue: 27.24, competitorValue: 20.63 },
              ]}
            />
          </div>

          <div className="rounded-xl2 border border-black/10 bg-paper-soft p-6">
            <p className="text-sm font-bold text-accent-dark mb-2">Пример 3</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink/80">
              <p><b>Станок:</b> 135 кВт</p>
              <p><b>Валок:</b> High-Cr 1580×650~690</p>
              <p><b>Круг GD-Abrasives:</b> 01_915x100x304.8 3NQNG46JB08, 50 м/с</p>
              <p><b>Конкурент:</b> Norton 01_915x100x304.8 39C46KB24, 50 м/с</p>
              <p className="sm:col-span-2"><b>Требования по Ra:</b> 0,8</p>
            </div>
            <SpecComparisonChart
              competitorName="Norton"
              metrics={[
                { label: 'GR — коэффициент шлифования', unit: '', gdValue: 3.75, competitorValue: 1.96 },
                { label: 'MRR — скорость съёма металла', unit: '', gdValue: 17.16, competitorValue: 8.42 },
              ]}
            />
          </div>

          <div className="rounded-xl2 border border-black/10 bg-paper-soft p-6">
            <p className="text-sm font-bold text-accent-dark mb-2">Пример 4</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink/80">
              <p><b>Станок:</b> 135 кВт</p>
              <p><b>Валок:</b> HSS 2250×650~690</p>
              <p><b>Круг GD-Abrasives:</b> 01_914x102x508 3NQNG46IB08, 50 м/с</p>
              <p><b>Конкурент:</b> Norton 01_914x102x508 3SG46JB24, 50 м/с</p>
              <p className="sm:col-span-2"><b>Требования по Ra:</b> в норме</p>
            </div>
            <SpecComparisonChart
              competitorName="Norton"
              metrics={[
                { label: 'GR — коэффициент шлифования', unit: '', gdValue: 3.36, competitorValue: 2.22 },
                { label: 'MRR — скорость съёма металла', unit: '', gdValue: 57, competitorValue: 48 },
              ]}
            />
          </div>
        </div>
        <p className="text-xs text-ink/40 mb-8">GR — коэффициент шлифования, MRR — скорость съёма металла.</p>

        <h4 className="text-xl font-extrabold text-ink mb-4">Упаковка и контроль качества</h4>
        <div className="grid sm:grid-cols-2 gap-6 items-start mb-2">
          <p className="text-ink/70">Круги GD-Abrasives надёжно упакованы в деревянные ящики с этикеткой: размеры, спецификация, дата производства, артикул, стандарт и номер партии. В каждом ящике — сертификат качества на партию и две прокладки для планшайб. Каждая партия проходит контроль геометрии перед отгрузкой.</p>
          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/certificate.jpg"
              alt="Сертификат соответствия GD-Abrasives"
              width={900}
              height={300}
              sizes="(min-width: 640px) 25vw, 45vw"
              className="w-full h-32 object-cover object-top rounded-lg shadow-md"
            />
            <Image
              src="/images/qc-1.jpg"
              alt="Контроль геометрии круга штангенциркулем"
              width={900}
              height={1600}
              sizes="(min-width: 640px) 25vw, 45vw"
              className="w-full h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Отрезные круги большого диаметра',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Отрезные круги большого диаметра D 500-2000 мм</h3>
        <div className="space-y-6 text-ink/80">
          <p>Отрезные круги диаметром от 500 до 2000 мм широко используются в металлургическом производстве. Для резки стали требуются высокопроизводительные армированные круги, обеспечивающие высокое качество, стойкость, чистоту реза, отсутствие заусенцев и высокую скорость резания.</p>
          <p>GD-Abrasives предлагает широкий ассортимент отрезных кругов, отвечающих всем требованиям, температурам резания и характеристикам материала. Подбор спецификации отрезного круга зависит от параметров технологического процесса, включая температуру обрабатываемого материала, характеристики материала (тип, форма и размеры) и отрезного станка (мощность и тип).</p>
          <p className="font-semibold text-ink">Успешно проведенные испытания на ведущих металлургических предприятиях России показали высокую стойкость кругов GD-Abrasives в диаметрах 800, 1000, 1250 и 1500 мм, превышающую показатели Tyrolit и Norton. Опытно промышленные партии подтвердили эти результаты, и мы начинаем серийные поставки.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации отрезных кругов укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Размер кругов и текущую спецификацию, потребность в месяц</li>
              <li>Материал детали, твёрдость в HRC, её линейные размеры и поперечное сечение в месте реза</li>
              <li>Температуру материала в момент резания</li>
              <li>Модель станка и кинематику процесса резания (см. схемы ниже), скорость резания</li>
              <li>Параметры, которые планируете улучшить</li>
            </ul>
          </div>

          <h4 className="text-xl font-extrabold text-ink pt-2">Типоразмеры кругов</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-ink mb-2">TYPE T41 — TAPERED</p>
              <div className="overflow-x-auto rounded-lg border border-black/10">
                <table className="w-full text-xs whitespace-nowrap">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="text-left font-bold text-ink px-2 py-1.5">D, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">Ta/Ti, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">H, мм</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink/80">
                    {[
                      ['750', '8/7', '80 100 127 152,4'],
                      ['800', '8/7', '80 100 127 152,4'],
                      ['1000', '11/10', '100 127 152,4'],
                      ['1220-1600', '12/11-16/15', '100 127 152,4 200 203,2 230 280'],
                      ['1800', '17/16', '203 230 280'],
                      ['2000', '18/17', 'по запросу'],
                    ].map(([d, t, h], i) => (
                      <tr key={d} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                        <td className="px-2 py-1">{d}</td>
                        <td className="px-2 py-1">{t}</td>
                        <td className="px-2 py-1">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-ink mb-2">TYPE T42 — со стальным центром</p>
              <div className="overflow-x-auto rounded-lg border border-black/10">
                <table className="w-full text-xs whitespace-nowrap">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="text-left font-bold text-ink px-2 py-1.5">D, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">T, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">H, мм</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink/80">
                    {[
                      ['600', '6-7,5', '40 60 76,2 80 100'],
                      ['800*', '8-9', '80 100 127 152,4'],
                    ].map(([d, t, h], i) => (
                      <tr key={d} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                        <td className="px-2 py-1">{d}</td>
                        <td className="px-2 py-1">{t}</td>
                        <td className="px-2 py-1">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-ink/40 mt-1">* Возможна поставка в конической версии.</p>
              <p className="text-sm font-bold text-ink mb-2 mt-4">Прямой профиль (без конуса)</p>
              <div className="overflow-x-auto rounded-lg border border-black/10">
                <table className="w-full text-xs whitespace-nowrap">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="text-left font-bold text-ink px-2 py-1.5">D, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">T, мм</th>
                      <th className="text-left font-bold text-ink px-2 py-1.5">H, мм</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink/80">
                    {[
                      ['800', '7/6', '80 100 127 152,4'],
                      ['1000', '9/8', '100 127 152,4'],
                      ['1220-1600', '11/10-14/13', '100 127 152,4 230 280'],
                    ].map(([d, t, h], i) => (
                      <tr key={d} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                        <td className="px-2 py-1">{d}</td>
                        <td className="px-2 py-1">{t}</td>
                        <td className="px-2 py-1">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-extrabold text-ink pt-4">Кинематика процесса резания</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: '/images/cut-pendulum.jpg', alt: 'Маятниковая отрезка', label: 'Маятниковая отрезка' },
              { src: '/images/cut-throughfeed.jpg', alt: 'Резка на проход', label: 'Резка на проход' },
              { src: '/images/cut-rotation.jpg', alt: 'Резка с вращением детали', label: 'Резка с вращением детали' },
              { src: '/images/cut-oscillation.jpg', alt: 'Резка с горизонтальной осцилляцией', label: 'Резка с горизонтальной осцилляцией' },
            ].map((d) => (
              <div key={d.label}>
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={500}
                  height={308}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="w-full h-auto rounded-lg border border-black/10 bg-white"
                />
                <p className="text-xs text-center text-ink/60 mt-1.5">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Шлифовка торцев пружин',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Шлифовка торцев пружин</h3>
        <div className="space-y-6 text-ink/80">
          <p>Шлифование торцев пружин — одна из наиболее сложных операций: не все производители кругов способны обеспечить нужное время цикла и стойкость одновременно при обработке комплекта пружин на современных станках.</p>

          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <Image
              src="/images/spring-wheel.jpg"
              alt="Круг GD-Abrasives 1000x150x200 для шлифовки торцев пружин"
              width={1100}
              height={619}
              sizes="(min-width: 640px) 45vw, 100vw"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="text-sm text-ink/80 space-y-1.5">
              <p><b>Наиболее распространённые станки:</b> OMD (Италия), Schenker (Германия), WNJ и JINKONGKEJI (Китай)</p>
              <p><b>Форма кругов:</b> 36 — для работы торцевой поверхностью, с гайками, с перфорацией</p>
              <p><b>Тип зерна:</b> 30…70% керамического зерна последнего поколения NQN</p>
              <p><b>Размер зерна:</b> F16-20-24 (и мельче, если есть требования)</p>
              <p><b>Твёрдость:</b> K-L-M-N-O-P</p>
              <p><b>Связка:</b> на бакелитовой основе</p>
            </div>
          </div>

          <h4 className="text-xl font-extrabold text-ink">Типовые размеры кругов, мм</h4>
          <div className="overflow-x-auto rounded-lg border border-black/10">
            <table className="w-full text-sm">
              <tbody className="text-ink/80">
                {[
                  '1000x150x200, 1000x150x300',
                  '915x120x200, 915x120x350, 915x100x270, 900x120x350',
                  '660x100x150, 660x100x170',
                  '600x80x305',
                  '450x80x40',
                  '400x60x40',
                ].map((row, i) => (
                  <tr key={row} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                    <td className="px-3 py-1.5">{row} мм</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink/60">Перфорация служит для лучшего охлаждения и удаления шлама из зоны шлифования — может быть сквозной или только до слоя с гайками. На диаметрах кругов &lt;450 мм круги делают без перфорации. Важно согласовать чертёж расположения гаек перед заказом.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Пример из практики</h4>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink/80 mb-3">
              <p><b>Станок:</b> OMD HA100-2/2 (Италия)</p>
              <p><b>Деталь:</b> наружная пружина вагонного комплекта d30 D200 L258, сталь 60С2ХФА, вальцованная</p>
              <p className="sm:col-span-2"><b>Спецификация круга:</b> GD-Abrasives 36_1000x150x200 3NQNJ20NB980, 45 м/с</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2 border-t border-accent/20">
              <div>
                <p className="text-lg font-extrabold text-accent">2:30</p>
                <p className="text-xs text-ink/60">время цикла</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-accent">6</p>
                <p className="text-xs text-ink/60">циклов между правками</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-accent">18 500</p>
                <p className="text-xs text-ink/60">пружин / 12 смен по 12ч</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-accent">5-7 мм</p>
                <p className="text-xs text-ink/60">съём на сторону</p>
              </div>
            </div>
          </div>

          <p>Время цикла шлифовки одной закладки кассеты даже на пружинах диаметром до 30 мм составляет от 2 до 5 минут; при большом съёме материала — до 10 минут максимум. Подбираем спецификацию под размер и геометрию пружин, материал, мощность станка и тип СОЖ — оптимизируя время цикла, стойкость круга и себестоимость шлифовки одной детали.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Модель станка и текущий размер круга</li>
              <li>Диаметр проволоки, наружный диаметр пружины, материал и твёрдость HRC</li>
              <li>Требуемую перпендикулярность торца и шероховатость поверхности</li>
              <li>Текущую стойкость круга и производительность (шт/мин или шт/смену)</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Зубошлифование',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Зубошлифование</h3>
        <div className="space-y-6 text-ink/80">
          <p><b>Профильное шлифование</b> зубчатых колёс кругами 4 формы с зерном TG или NQN и высокоэффективной связкой V80 — для лучшего сохранения профиля круга и работы на скорости круга до 80 м/с.</p>

          <div className="overflow-x-auto rounded-lg border border-black/10">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-accent/10">
                  <th className="text-left font-bold text-ink px-3 py-2">Станок</th>
                  <th className="text-left font-bold text-ink px-3 py-2">Размер круга</th>
                  <th className="text-left font-bold text-ink px-3 py-2">Спецификация</th>
                </tr>
              </thead>
              <tbody className="text-ink/80">
                {[
                  ['Hofler Helix 400', 'PSX400X50X127', '3SG60/80GH12V80P'],
                  ['Hofler Rapid 1500', 'PSX400X60X127', '3SG60/80GH12V80P'],
                  ['Hofler Rapid 1800', 'PSX500X63X160', '3SG60/80GH12V80P'],
                  ['Kapp VAS 55P', 'PSX400X40X127', '3SG60/80GH12V80P'],
                ].map(([m, s, spec], i) => (
                  <tr key={m} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                    <td className="px-3 py-1.5 font-bold text-ink">{m}</td>
                    <td className="px-3 py-1.5 font-mono text-xs">{s}</td>
                    <td className="px-3 py-1.5 font-mono text-xs">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p><b>Непрерывное (обкатное) шлифование</b> червячными кругами с зерном NQN и связкой V80 — для удержания профиля круга на скорости до 80 м/с:</p>
          <div className="overflow-x-auto rounded-lg border border-black/10">
            <table className="w-full text-xs whitespace-nowrap">
              <tbody className="text-ink/80">
                {[
                  ['220x180x90-SA80J-V80-75M/S', '220x180x90-3SG80J-V80-75M/S'],
                  ['240x230x110-SA80J-V80-63M/S', '300x125x160-3SG80J-V80-63M/S'],
                  ['275x160x160-SA80J-V80-80M/S', '300x145x160-3SG80J-V80-80M/S'],
                  ['275x125x160-SA80J-V80-80M/S', '350x104x160-3SG80J-VH-35M/S'],
                  ['280x160x115-SA80J-V80-63M/S', '400x100x203-3SG80J-V80-35M/S'],
                ].map(([a, b], i) => (
                  <tr key={a} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                    <td className="px-3 py-1.5">{a}</td>
                    <td className="px-3 py-1.5">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p><b>Шлифование конических зубчатых колёс</b> со связкой V80 и зерном TG или NQN — для удержания профиля круга, высокой производительности и скорости круга до 80 м/с:</p>
          <div className="overflow-x-auto rounded-lg border border-black/10">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-accent/10">
                  <th className="text-left font-bold text-ink px-3 py-2">Размер круга</th>
                  <th className="text-left font-bold text-ink px-3 py-2">Спецификация</th>
                </tr>
              </thead>
              <tbody className="text-ink/80">
                {[
                  ['220×95×170', '3SG80J8V80'],
                  ['260×110×200', '5SG80J8V80'],
                  ['312×98×251', '5SG80J8V80'],
                  ['330×98×193', '5SG80J8V80'],
                  ['335×110×270', '5SG80J8V80'],
                  ['386×98×312', '5SG80J8V80'],
                ].map(([s, spec], i) => (
                  <tr key={s} className={i % 2 === 1 ? 'bg-black/[0.02]' : ''}>
                    <td className="px-3 py-1.5 font-mono text-xs">{s}</td>
                    <td className="px-3 py-1.5 font-mono text-xs">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <p className="flex-1">Для крупномодульных зубчатых колёс, где обкатное шлифование неприменимо, также поставляем круги на керамической и органической связках с премиальным зерном NQN — под любые операции зубошлифования, включая CBN-инструмент для сверхточных финишных проходов.</p>
            <Image
              src="/images/cbn-wheel.jpg"
              alt="CBN-круг для прецизионного зубошлифования"
              width={1080}
              height={1920}
              sizes="180px"
              className="w-40 h-auto rounded-lg shadow-md shrink-0"
            />
          </div>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Метод шлифования (профильное / обкатное / коническое) и модель станка</li>
              <li>Модуль зубчатого колеса, число зубьев, угол наклона</li>
              <li>Материал, вид термообработки и твёрдость поверхностного слоя HRC</li>
              <li>Требуемый класс точности и шероховатость Ra</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Бесцентровое шлифование',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Бесцентровое шлифование</h3>
        <div className="space-y-6 text-ink/80">
          <p>Бесцентровое (centerless) шлифование обрабатывает цилиндрическую деталь без закрепления в центрах или патроне — она удерживается между шлифовальным и ведущим (регулирующим) кругом на опорном ноже. Это даёт высокую производительность и стабильную геометрию на серийных деталях: пальцах, роликах, втулках, кольцах подшипников, крепеже.</p>
          <p>Различают два режима: <b>сквозное шлифование</b> (through-feed) — деталь непрерывно проходит вдоль оси станка за счёт наклона ведущего круга, применяется для гладких валов и штифтов; и <b>врезное шлифование</b> (in-feed) — для деталей с буртиками, головками или переменным профилем, где сквозная подача невозможна.</p>
          <p>Шлифовальный круг здесь обычно крупного диаметра (до 500–750 мм) и работает на высокой производительности съёма, а ведущий (регулирующий) круг — на резинобакелитовой связке, задаёт скорость вращения и осевую подачу детали.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Что мы рекомендуем по спецификации</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Крупное зерно (F24-F46) для высокой производительности съёма на сквозном шлифовании</li>
              <li>Керамическое зерно <span className="text-accent font-bold">NQN</span> или <span className="text-ink font-extrabold">Vortex</span> — стабильная стойкость при непрерывной работе в потоке</li>
              <li>Твёрдость и структуру круга подбираем отдельно под сквозной/врезной режим</li>
            </ul>
          </div>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Режим шлифования (сквозной / врезной) и модель станка</li>
              <li>Диаметр и длину детали, материал и твёрдость</li>
              <li>Требуемую производительность (шт/мин) и допуск по диаметру</li>
              <li>Текущую спецификацию круга и её стойкость</li>
            </ul>
          </div>
          <p className="text-sm text-ink/50 italic pt-4">Дополнительная техническая информация, включая схемы и таблицы, доступна по запросу.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Круглое шлифование',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Круглое шлифование</h3>
        <div className="space-y-6 text-ink/80">
          <p>Круглое (центровое) шлифование — обработка наружных и внутренних цилиндрических и конических поверхностей деталей, закреплённых в центрах или патроне: валов, шпинделей, штоков, роликов, втулок. В отличие от бесцентрового, деталь имеет фиксированную ось вращения, что даёт более высокую точность формы на сложном профиле и переменном диаметре.</p>
          <p>Различают <b>врезное шлифование</b> (plunge — круг подаётся радиально, обрабатывает участок по ширине круга за один проход, эффективно на коротких точных поверхностях и буртиках) и <b>продольное шлифование</b> (traverse — стол с деталью перемещается вдоль оси круга, применяется на длинных валах).</p>
          <p>Отдельно стоит внутришлифование (ID grinding) — обработка отверстий втулок, гильз, посадочных мест под подшипник, где круг работает на малом диаметре и высоких оборотах шпинделя.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Что мы рекомендуем по спецификации</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Зерно и твёрдость подбираются отдельно под сталь после ТВЧ/цементации и под быстрорежущую сталь (HSS)</li>
              <li>Керамическое зерно <span className="text-accent font-bold">TGX</span>/<span className="text-accent font-bold">NQN</span> для закалённых валов — свободное резание без прижога</li>
              <li>Для внутришлифования — мелкозернистая спецификация на прочной связке под высокие обороты малого круга</li>
            </ul>
          </div>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Тип операции (наружное / внутреннее, врезное / продольное) и модель станка</li>
              <li>Диаметр и длину обрабатываемого участка, материал и твёрдость HRC</li>
              <li>Требуемую шероховатость и допуск по диаметру</li>
              <li>Текущую спецификацию круга и её стойкость</li>
            </ul>
          </div>
          <p className="text-sm text-ink/50 italic pt-4">Дополнительная техническая информация, включая схемы и таблицы, доступна по запросу.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Плоское шлифование',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Плоское шлифование</h3>
        <div className="space-y-6 text-ink/80">
          <p>Плоское шлифование обрабатывает плоские и профильные поверхности деталей: штампов и пресс-форм, направляющих станин, плит, полос — там, где нужна плоскостность, параллельность сторон и заданная шероховатость. Станки бывают с прямоугольным (возвратно-поступательным) столом и с круглым (поворотным) столом — выбор зависит от формы и серийности деталей.</p>
          <p>Отдельно выделяется шлифование торцом круга (горизонтальный или вертикальный шпиндель) сегментными или чашечными кругами — применяется на крупных плоскостях, где важна высокая производительность съёма, например на станинах и плитах большой площади.</p>
          <p>Материалы — от конструкционных и инструментальных сталей до закалённого инструмента (штампы, пресс-формы) с твёрдостью до HRC 60+, где особенно важно избежать прижога и шлифовочных трещин на поверхности.</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Что мы рекомендуем по спецификации</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Зерно и твёрдость — по материалу и требуемой шероховатости, от чернового съёма до финишной доводки</li>
              <li>Керамическое зерно <span className="text-accent font-bold">NQN</span> — стабильное резание без прижога на закалённом инструменте</li>
              <li>Сегментные круги — для высокопроизводительного съёма на крупных плоскостях станин и плит</li>
            </ul>
          </div>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Тип станка (прямоугольный / круглый стол, периферия / торец круга) и размер круга</li>
              <li>Материал и твёрдость детали, размер обрабатываемой плоскости</li>
              <li>Требуемую плоскостность, параллельность и шероховатость</li>
              <li>Текущую спецификацию круга и её стойкость</li>
            </ul>
          </div>
          <p className="text-sm text-ink/50 italic pt-4">Дополнительная техническая информация, включая схемы и таблицы, доступна по запросу.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Зачистные круги',
    content: (
      <div>
        <h3 className="text-2xl font-extrabold text-ink mb-4">Зачистные круги</h3>
        <div className="space-y-6 text-ink/80">
          <p>Зачистные круги — это отдельный класс инструмента, не связанный с точным шлифованием: обдирка литья и поковок, зачистка сварных швов, снятие заусенцев и окалины на ручном и стационарном оборудовании (угловые шлифмашины, обдирочно-шлифовальные станки). Задача — максимальная скорость съёма металла при приемлемой стойкости, а не точность или чистота поверхности.</p>
          <p>Конструктивно зачистные круги — на упрочнённой смоляной (резиноидной) связке, армированные стекловолоконной сеткой для безопасной работы на высоких оборотах ручного инструмента. Абразив — обычно электрокорунд, циркониевый электрокорунд (для лучшей стойкости на нержавеющей и легированной стали) или керамическое зерно для самых тяжёлых условий (литейные цеха, зачистка сварных швов на металлоконструкциях).</p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Что мы рекомендуем по спецификации</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Циркониевый электрокорунд — универсальный выбор для стали и нержавейки при интенсивной обдирке</li>
              <li>Керамическое зерно — для литья, поковок и тяжёлых условий, где важна максимальная стойкость круга</li>
              <li>Армирование стекловолоконной сеткой — обязательное требование безопасности на ручном инструменте</li>
            </ul>
          </div>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg mt-6">
            <h4 className="font-bold text-lg mb-3 text-accent-dark">Для подбора спецификации укажите в запросе:</h4>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>Диаметр круга и тип оборудования (УШМ, стационарный обдирочный станок)</li>
              <li>Обрабатываемый материал (сталь, нержавейка, чугунное литьё)</li>
              <li>Характер работы (обдирка литья, зачистка сварного шва, снятие заусенцев)</li>
              <li>Текущий расход кругов и требуемую производительность</li>
            </ul>
          </div>
          <p className="text-sm text-ink/50 italic pt-4">Дополнительная техническая информация, включая схемы и таблицы, доступна по запросу.</p>
        </div>
      </div>
    ),
  },
];
