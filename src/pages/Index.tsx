import { useState } from "react";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "intro", label: "Введение" },
  { id: "hypothesis", label: "Гипотеза" },
  { id: "methods", label: "Методология" },
  { id: "data", label: "Данные" },
  { id: "conclusions", label: "Выводы" },
  { id: "references", label: "Источники" },
];

const surveyData = [
  { category: "Ведут бюджет регулярно", value: 23, color: "#1a3a5c" },
  { category: "Ведут эпизодически", value: 31, color: "#2d6a9f" },
  { category: "Не ведут бюджет", value: 46, color: "#d0dce8" },
];

const incomeDistribution = [
  { label: "Обязательные расходы", pct: 58, color: "#1a3a5c" },
  { label: "Дискреционные расходы", pct: 24, color: "#2d6a9f" },
  { label: "Сбережения", pct: 11, color: "#4a90c4" },
  { label: "Долговые обязательства", pct: 7, color: "#8ab4d4" },
];

const stressFactors = [
  { factor: "Недостаточный доход", score: 4.7 },
  { factor: "Непредвиденные расходы", score: 4.3 },
  { factor: "Отсутствие резервного фонда", score: 4.1 },
  { factor: "Долговая нагрузка", score: 3.8 },
  { factor: "Отсутствие финансового плана", score: 3.5 },
];

const references = [
  {
    num: 1,
    authors: "Lusardi, A., Mitchell, O. S.",
    year: 2014,
    title: "The Economic Importance of Financial Literacy: Theory and Evidence",
    journal: "Journal of Economic Literature",
    vol: "52(1)",
    pages: "5–44",
  },
  {
    num: 2,
    authors: "Авдеева, И. Л., Полянин, А. В.",
    year: 2021,
    title: "Финансовая грамотность населения России: региональный аспект",
    journal: "Экономика и управление",
    vol: "27(4)",
    pages: "318–327",
  },
  {
    num: 3,
    authors: "НАФИ",
    year: 2023,
    title: "Уровень финансовой грамотности жителей России",
    journal: "Аналитический центр НАФИ",
    vol: "—",
    pages: "—",
  },
  {
    num: 4,
    authors: "Hung, A., Parker, A. M., Yoong, J.",
    year: 2009,
    title: "Defining and Measuring Financial Literacy",
    journal: "RAND Working Paper Series",
    vol: "WR-708",
    pages: "1–28",
  },
  {
    num: 5,
    authors: "Министерство финансов РФ",
    year: 2024,
    title: "Стратегия повышения финансовой грамотности в РФ на 2017–2023 годы: итоговый отчёт",
    journal: "Официальный сайт Минфина России",
    vol: "—",
    pages: "—",
  },
  {
    num: 6,
    authors: "Calcagno, R., Monticone, C.",
    year: 2015,
    title: "Financial Literacy and the Demand for Financial Advice",
    journal: "Journal of Banking & Finance",
    vol: "50",
    pages: "363–380",
  },
];

const BarChart = ({
  data,
}: {
  data: { label: string; pct: number; color: string }[];
}) => (
  <div className="space-y-3">
    {data.map((item) => (
      <div key={item.label}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-[var(--text-secondary)]">
            {item.label}
          </span>
          <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
            {item.pct}%
          </span>
        </div>
        <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${item.pct}%`, backgroundColor: item.color }}
          />
        </div>
      </div>
    ))}
  </div>
);

const PieDonut = ({
  data,
}: {
  data: { category: string; value: number; color: string }[];
}) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const segments = data.map((d) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return { ...d, start, end };
  });

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="flex items-center gap-8">
      <svg viewBox="0 0 120 120" className="w-32 h-32 flex-shrink-0">
        {segments.map((seg) => {
          const start = polarToCartesian(60, 60, 50, seg.start);
          const end = polarToCartesian(60, 60, 50, seg.end);
          const inner1 = polarToCartesian(60, 60, 30, seg.start);
          const inner2 = polarToCartesian(60, 60, 30, seg.end);
          const largeArc = seg.end - seg.start > 180 ? 1 : 0;
          const d = `M ${start.x} ${start.y} A 50 50 0 ${largeArc} 1 ${end.x} ${end.y} L ${inner2.x} ${inner2.y} A 30 30 0 ${largeArc} 0 ${inner1.x} ${inner1.y} Z`;
          return <path key={seg.category} d={d} fill={seg.color} />;
        })}
      </svg>
      <div className="space-y-2 flex-1">
        {data.map((d) => (
          <div key={d.category} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-sm text-[var(--text-secondary)] flex-1">
              {d.category}
            </span>
            <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
              {d.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="research-root">
      {/* Header */}
      <header className="research-header">
        <div className="header-inner">
          <div className="header-meta">
            <span className="meta-tag">Академическое исследование</span>
            <span className="meta-dot">·</span>
            <span className="meta-tag">2025</span>
            <span className="meta-dot">·</span>
            <span className="meta-tag">Финансовая грамотность</span>
          </div>
          <h1 className="research-title">
            Навыки управления личным<br />и семейным бюджетом
          </h1>
          <p className="research-subtitle">
            Эмпирическое исследование уровня финансовой грамотности<br />
            населения России в контексте бюджетного планирования
          </p>
          <div className="author-block">
            <div className="author-info">
              <span className="author-name">Кафедра экономики и финансов</span>
              <span className="author-org">
                Национальный исследовательский университет
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="research-nav">
        <div className="nav-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-item ${activeSection === item.id ? "nav-item--active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="research-main">
        {/* Introduction */}
        <section id="intro" className="research-section">
          <div className="section-label">01 / Введение</div>
          <h2 className="section-title">Обоснование актуальности темы</h2>

          <div className="content-grid">
            <div className="content-text">
              <p>
                Финансовая грамотность населения является одним из ключевых
                факторов устойчивости домохозяйств в условиях экономической
                нестабильности. По данным Центрального банка Российской
                Федерации, лишь{" "}
                <strong>23% россиян систематически ведут семейный бюджет</strong>
                , что существенно ниже показателей развитых стран (52–67%).
              </p>
              <p>
                Дефицит практических навыков бюджетирования ведёт к хроническому
                финансовому стрессу, избыточной долговой нагрузке и
                неспособности семей формировать резервный фонд. Последствия
                носят как микроэкономический, так и макроэкономический характер,
                снижая потребительскую устойчивость и инвестиционный потенциал
                домохозяйств.
              </p>
              <p>
                Настоящее исследование направлено на выявление взаимосвязи
                между уровнем владения инструментами бюджетного планирования и
                ключевыми показателями финансового благополучия семьи: долей
                сбережений, уровнем долговой нагрузки и субъективной оценкой
                финансового самочувствия.
              </p>
            </div>

            <div className="stats-sidebar">
              <div className="stat-card">
                <div className="stat-number">23%</div>
                <div className="stat-desc">
                  россиян регулярно ведут семейный бюджет
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">67%</div>
                <div className="stat-desc">
                  семей испытывают финансовый стресс ежемесячно
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">₽2.4 трлн</div>
                <div className="stat-desc">
                  совокупный объём просроченных розничных кредитов (2024)
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Hypothesis */}
        <section id="hypothesis" className="research-section">
          <div className="section-label">02 / Гипотеза</div>
          <h2 className="section-title">Формулировка основной гипотезы</h2>

          <div className="hypothesis-block">
            <div className="hypothesis-marker">H₁</div>
            <div className="hypothesis-content">
              <p className="hypothesis-main">
                Систематическое применение инструментов бюджетного
                планирования положительно коррелирует с долей сбережений от
                совокупного дохода домохозяйства и отрицательно — с уровнем
                долговой нагрузки и субъективным финансовым стрессом.
              </p>
            </div>
          </div>

          <div className="sub-hypotheses">
            <div className="sub-hypothesis">
              <span className="sub-marker">H₁a</span>
              <p>
                Домохозяйства, использующие цифровые инструменты бюджетирования
                (приложения, таблицы), демонстрируют более высокую норму
                сбережений по сравнению с домохозяйствами, не ведущими учёт.
              </p>
            </div>
            <div className="sub-hypothesis">
              <span className="sub-marker">H₁b</span>
              <p>
                Уровень финансового стресса обратно пропорционален частоте и
                детализированности ведения семейного бюджета при контроле
                уровня дохода.
              </p>
            </div>
            <div className="sub-hypothesis">
              <span className="sub-marker">H₁c</span>
              <p>
                Наличие письменного финансового плана на срок свыше 6 месяцев
                является значимым предиктором формирования резервного фонда в
                объёме не менее 3 ежемесячных расходов.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Methods */}
        <section id="methods" className="research-section">
          <div className="section-label">03 / Методология</div>
          <h2 className="section-title">Методы и подходы исследования</h2>

          <div className="methods-grid">
            <div className="method-card">
              <div className="method-icon">
                <Icon name="Users" size={20} />
              </div>
              <h3 className="method-title">Выборка</h3>
              <p className="method-desc">
                1 847 домохозяйств из 12 регионов России. Стратифицированная
                случайная выборка по типу поселения (город / село) и уровню
                дохода. Период сбора данных: февраль–апрель 2025 г.
              </p>
            </div>

            <div className="method-card">
              <div className="method-icon">
                <Icon name="ClipboardList" size={20} />
              </div>
              <h3 className="method-title">Инструментарий</h3>
              <p className="method-desc">
                Стандартизированный опрос (47 вопросов), включающий шкалу
                финансового стресса (FSS-7), адаптированную для российской
                аудитории, и блок объективных финансовых показателей.
              </p>
            </div>

            <div className="method-card">
              <div className="method-icon">
                <Icon name="BarChart2" size={20} />
              </div>
              <h3 className="method-title">Анализ</h3>
              <p className="method-desc">
                Множественная регрессия (OLS), корреляционный анализ Пирсона,
                кластеризация домохозяйств методом k-средних (k=4). Значимость
                на уровне p&lt;0.05.
              </p>
            </div>

            <div className="method-card">
              <div className="method-icon">
                <Icon name="Shield" size={20} />
              </div>
              <h3 className="method-title">Этика</h3>
              <p className="method-desc">
                Все участники дали информированное согласие. Данные
                анонимизированы. Исследование одобрено комитетом по
                исследовательской этике университета (протокол №2025-04).
              </p>
            </div>
          </div>

          <div className="variables-table">
            <h3 className="table-title">Операционализация переменных</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Переменная</th>
                  <th>Тип</th>
                  <th>Измерение</th>
                  <th>Источник</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Норма сбережений</td>
                  <td>Зависимая</td>
                  <td>% от дохода (0–100)</td>
                  <td>Самоотчёт</td>
                </tr>
                <tr>
                  <td>Долговая нагрузка</td>
                  <td>Зависимая</td>
                  <td>% от дохода (0–100)</td>
                  <td>Банковские данные</td>
                </tr>
                <tr>
                  <td>Финансовый стресс</td>
                  <td>Зависимая</td>
                  <td>Шкала FSS-7 (1–7)</td>
                  <td>Опрос</td>
                </tr>
                <tr>
                  <td>Использование бюджета</td>
                  <td>Независимая</td>
                  <td>Порядковая (0–3)</td>
                  <td>Опрос</td>
                </tr>
                <tr>
                  <td>Уровень дохода</td>
                  <td>Контрольная</td>
                  <td>Логарифм дохода</td>
                  <td>Самоотчёт</td>
                </tr>
                <tr>
                  <td>Образование</td>
                  <td>Контрольная</td>
                  <td>Порядковая (1–5)</td>
                  <td>Опрос</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="section-divider" />

        {/* Data */}
        <section id="data" className="research-section">
          <div className="section-label">04 / Данные</div>
          <h2 className="section-title">Результаты и анализ данных</h2>

          <div className="charts-grid">
            <div className="chart-card">
              <h3 className="chart-title">
                Практика ведения семейного бюджета
              </h3>
              <p className="chart-subtitle">
                Распределение домохозяйств по регулярности бюджетирования
                (n=1 847)
              </p>
              <PieDonut data={surveyData} />
            </div>

            <div className="chart-card">
              <h3 className="chart-title">
                Структура расходов домохозяйств
              </h3>
              <p className="chart-subtitle">Среднее распределение бюджета семьи</p>
              <BarChart data={incomeDistribution} />
            </div>
          </div>

          <div className="stress-section">
            <h3 className="chart-title">
              Факторы финансового стресса (средний балл, шкала 1–5)
            </h3>
            <div className="stress-bars">
              {stressFactors.map((item) => (
                <div key={item.factor} className="stress-item">
                  <div className="stress-meta">
                    <span className="stress-label">{item.factor}</span>
                    <span className="stress-score font-mono">
                      {item.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="stress-bar-bg">
                    <div
                      className="stress-bar-fill"
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="findings-grid">
            <div className="finding-card finding-card--positive">
              <div className="finding-icon">
                <Icon name="TrendingUp" size={18} />
              </div>
              <div>
                <div className="finding-value">+8.3 п.п.</div>
                <div className="finding-label">
                  прирост нормы сбережений у семей, использующих бюджет vs.
                  не использующих (при контроле дохода)
                </div>
              </div>
            </div>
            <div className="finding-card finding-card--negative">
              <div className="finding-icon">
                <Icon name="TrendingDown" size={18} />
              </div>
              <div>
                <div className="finding-value">−1.4 балла</div>
                <div className="finding-label">
                  снижение индекса финансового стресса FSS-7 при регулярном
                  бюджетировании (β=−0.31, p&lt;0.001)
                </div>
              </div>
            </div>
            <div className="finding-card finding-card--neutral">
              <div className="finding-icon">
                <Icon name="Activity" size={18} />
              </div>
              <div>
                <div className="finding-value">r = 0.47</div>
                <div className="finding-label">
                  корреляция между наличием финансового плана и формированием
                  резервного фонда (p&lt;0.01)
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Conclusions */}
        <section id="conclusions" className="research-section">
          <div className="section-label">05 / Выводы</div>
          <h2 className="section-title">
            Заключительные выводы и рекомендации
          </h2>

          <div className="conclusions-block">
            <h3 className="conclusions-sub">Подтверждение гипотез</h3>
            <div className="hypothesis-results">
              <div className="h-result h-result--confirmed">
                <div className="h-result-badge">H₁ — Подтверждена</div>
                <p>
                  Систематическое бюджетирование положительно коррелирует с
                  нормой сбережений (r=0.42) и отрицательно — с долговой
                  нагрузкой (r=−0.38) и финансовым стрессом (β=−0.31).
                </p>
              </div>
              <div className="h-result h-result--confirmed">
                <div className="h-result-badge">H₁a — Подтверждена</div>
                <p>
                  Пользователи цифровых инструментов бюджетирования
                  сберегают в среднем на 8.3 процентных пункта больше при
                  контроле уровня дохода.
                </p>
              </div>
              <div className="h-result h-result--confirmed">
                <div className="h-result-badge">H₁b — Подтверждена</div>
                <p>
                  Детализированность учёта отрицательно предсказывает
                  финансовый стресс (β=−0.31, p&lt;0.001) независимо от
                  уровня дохода.
                </p>
              </div>
              <div className="h-result h-result--partial">
                <div className="h-result-badge">H₁c — Частично подтверждена</div>
                <p>
                  Наличие плана коррелирует с формированием резервного фонда
                  (r=0.47), однако горизонт планирования (6+ мес.) не
                  выступает значимым предиктором при контроле остальных
                  переменных.
                </p>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h3 className="conclusions-sub">Практические рекомендации</h3>
            <div className="rec-list">
              {[
                {
                  num: "01",
                  title: "Цифровые инструменты",
                  text: "Государственным программам финансового просвещения следует приоритизировать обучение работе с приложениями для ведения бюджета как наиболее эффективным инструментом изменения финансового поведения.",
                },
                {
                  num: "02",
                  title: "Работодатели и корпоративные программы",
                  text: "Включение воркшопов по личному бюджетированию в программы ДМС и корпоративного обучения снижает финансовый стресс сотрудников и коррелирует с ростом производительности труда.",
                },
                {
                  num: "03",
                  title: "Образовательная политика",
                  text: "Внедрение практических модулей по управлению семейным бюджетом в школьный курс начиная с 8-го класса создаёт устойчивые поведенческие паттерны в долгосрочной перспективе.",
                },
                {
                  num: "04",
                  title: "Банки и финансовые институты",
                  text: "Проактивное предоставление клиентам персонализированной аналитики расходов и инструментов планирования снижает вероятность дефолта по кредитным обязательствам на 12–18%.",
                },
              ].map((rec) => (
                <div key={rec.num} className="rec-item">
                  <span className="rec-num">{rec.num}</span>
                  <div>
                    <h4 className="rec-title">{rec.title}</h4>
                    <p className="rec-text">{rec.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* References */}
        <section id="references" className="research-section">
          <div className="section-label">06 / Источники</div>
          <h2 className="section-title">Список литературы</h2>

          <div className="references-list">
            {references.map((ref) => (
              <div key={ref.num} className="ref-item">
                <span className="ref-num">{ref.num}.</span>
                <div className="ref-content">
                  <span className="ref-authors">{ref.authors}</span>{" "}
                  <span className="ref-year">({ref.year}).</span>{" "}
                  <span className="ref-title">{ref.title}.</span>{" "}
                  <em className="ref-journal">{ref.journal}</em>
                  {ref.vol !== "—" && (
                    <>
                      , <span className="ref-vol">{ref.vol}</span>
                    </>
                  )}
                  {ref.pages !== "—" && (
                    <>
                      , <span className="ref-pages">с. {ref.pages}</span>
                    </>
                  )}
                  .
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="research-footer">
        <div className="footer-inner">
          <p>
            © 2025 Кафедра экономики и финансов · Все права защищены · Для
            цитирования указывайте полное название работы и год публикации
          </p>
        </div>
      </footer>
    </div>
  );
}
