import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/3be4525b-5cdf-43fd-a6bd-d6a988b50056.jpg";
const TEXTURE_IMG = "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9261bfed-ae48-45c4-a22e-55f56ef7173a.jpg";

const PRODUCTS = [
  { category: "Кожа", name: "Кожаные куртки", icon: "Zap" },
  { category: "Мех", name: "Дублёнки", icon: "Wind" },
  { category: "Мех", name: "Шубы", icon: "Snowflake" },
  { category: "Текстиль", name: "Пальто", icon: "Layers" },
  { category: "Текстиль", name: "Плащи", icon: "Droplets" },
  { category: "Текстиль", name: "Джинсовые куртки", icon: "Grid3x3" },
  { category: "Текстиль", name: "Тренчи", icon: "Minus" },
  { category: "Тепло", name: "Зимние пуховики", icon: "Flame" },
];

const BENEFITS = [
  {
    title: "Натуральные материалы",
    text: "Кожа и мех с выразительной фактурой, а также текстильные модели для практичного городского ритма.",
    icon: "Leaf",
  },
  {
    title: "Посадка и комфорт",
    text: "Модели, которые не сковывают движения, хорошо сидят и подходят для ежедневной носки.",
    icon: "Move",
  },
  {
    title: "Стиль на сезон",
    text: "Базовые и акцентные решения, которые помогают выглядеть дорого, современно и уместно.",
    icon: "Star",
  },
];

const TRUST_ITEMS = [
  "Подробные фото и честное описание моделей.",
  "Помощь в подборе размера и фасона.",
  "Удобная доставка и понятные условия покупки.",
  "Актуальные модели, которые не теряют вид через месяц.",
];

const FAQ_ITEMS = [
  {
    q: "Как подобрать размер?",
    a: "Мы поможем сопоставить параметры с размерной сеткой и подобрать удобную посадку.",
  },
  {
    q: "Есть ли модели на каждый день?",
    a: "Да, в коллекции есть универсальные варианты для города, работы и выходных.",
  },
  {
    q: "Можно ли выбрать премиальный вариант?",
    a: "Да, представлены модели из кожи и меха с акцентом на статусность и долговечность.",
  },
];

const STATS = [
  { value: "10+", label: "категорий" },
  { value: "3", label: "типа материалов" },
  { value: "1", label: "премиальный стиль" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroReveal = useReveal();
  const benefitsReveal = useReveal();
  const catalogReveal = useReveal();
  const trustReveal = useReveal();
  const ctaReveal = useReveal();
  const faqReveal = useReveal();

  const NAV = ["Каталог", "Преимущества", "Доверие", "FAQ"];
  const navHrefs = ["#catalog", "#benefits", "#trust", "#faq"];

  return (
    <div style={{ background: "#0f0f10", color: "#f5f5f7", minHeight: "100vh" }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15,15,16,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid #2a2a31" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-oswald font-semibold tracking-widest text-lg" style={{ color: "#f5f5f7", letterSpacing: "0.2em" }}>
            FASHION OUTERWEAR
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item, i) => (
              <a key={item} href={navHrefs[i]} className="nav-item">{item}</a>
            ))}
          </nav>
          <a href="#cta" className="hidden md:inline-flex btn-primary py-2.5 px-6 text-xs">
            Позвонить
          </a>
          <button
            className="md:hidden"
            style={{ color: "#d7b56d" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: "rgba(15,15,16,0.98)" }}
        >
          {NAV.map((item, i) => (
            <a
              key={item}
              href={navHrefs[i]}
              className="font-oswald text-3xl tracking-widest"
              style={{ color: "#f5f5f7" }}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#cta" className="btn-primary mt-4" onClick={() => setMobileOpen(false)}>
            Позвонить
          </a>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-grid">
        {/* Right image panel */}
        <div
          className="absolute top-0 right-0 w-full md:w-1/2 h-full"
          style={{ zIndex: 0 }}
        >
          <img
            src={HERO_IMG}
            alt="Fashion Outerwear"
            className="w-full h-full object-cover"
            style={{ opacity: 0.45 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #0f0f10 20%, rgba(15,15,16,0.4) 60%, rgba(15,15,16,0.15) 100%)",
            }}
          />
        </div>

        {/* Gold vertical line */}
        <div
          className="absolute top-0 bottom-0 hidden md:block"
          style={{
            left: "50%",
            width: "1px",
            background: "linear-gradient(to bottom, transparent 5%, rgba(215,181,109,0.25) 30%, rgba(215,181,109,0.25) 70%, transparent 95%)",
            zIndex: 1,
          }}
        />

        <div
          ref={heroReveal.ref}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-20"
        >
          <div
            className={`max-w-xl transition-all duration-1000 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="section-eyebrow">Кожа • Мех • Текстиль</span>

            <h1
              className="font-oswald mb-6"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "0.01em",
                color: "#f5f5f7",
              }}
            >
              Верхняя одежда,{" "}
              <br />
              <span style={{ color: "#d7b56d" }}>в которой тепло,</span>
              <br />
              стильно и надолго
            </h1>

            <p
              className="mb-10 font-ibm"
              style={{
                color: "#b8b8c2",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "440px",
              }}
            >
              Кожаные куртки, дублёнки, шубы, пальто, тренчи и пуховики — коллекция для тех,
              кто выбирает уверенный образ, комфорт и качество на весь сезон.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#catalog" className="btn-primary">
                Смотреть каталог
                <Icon name="ArrowRight" size={14} />
              </a>
              <a href="#benefits" className="btn-secondary">
                Почему нас выбирают
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className={`mt-20 inline-flex border transition-all duration-1000 delay-300 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ borderColor: "#2a2a31", background: "rgba(23,23,26,0.8)" }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="px-8 py-5 text-center"
                style={{ borderRight: i < STATS.length - 1 ? "1px solid #2a2a31" : "none" }}
              >
                <div
                  className="font-oswald text-3xl mb-1"
                  style={{ color: "#d7b56d", fontWeight: 600, letterSpacing: "0.05em" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-ibm text-xs"
                  style={{ color: "#b8b8c2", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section id="benefits" className="py-28 px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div
          ref={benefitsReveal.ref}
          className="max-w-7xl mx-auto"
        >
          <div className={`mb-16 reveal ${benefitsReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow">Преимущества</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, letterSpacing: "0.02em", maxWidth: "560px" }}
            >
              Почему выбирают нас
            </h2>
            <p className="font-ibm mt-4" style={{ color: "#b8b8c2", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "500px", fontWeight: 300 }}>
              Мы собрали ассортимент, который работает и на внешний вид, и на повседневный комфорт.
              Вещи легко вписываются в базовый гардероб и сохраняют актуальность несколько сезонов подряд.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`benefit-card reveal delay-${i + 1} ${benefitsReveal.visible ? "visible" : ""}`}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ background: "rgba(215,181,109,0.1)", border: "1px solid rgba(215,181,109,0.2)" }}
                >
                  <Icon name={b.icon} fallback="Star" size={18} className="text-accent" />
                </div>
                <h3
                  className="font-oswald text-xl mb-3"
                  style={{ color: "#f5f5f7", fontWeight: 500, letterSpacing: "0.04em" }}
                >
                  {b.title}
                </h3>
                <p className="font-ibm text-sm leading-7" style={{ color: "#b8b8c2", fontWeight: 300 }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ──────────────────────────────────────── */}
      <section id="catalog" className="py-28 px-6" style={{ background: "#13131600", borderTop: "1px solid #2a2a31" }}>
        <div ref={catalogReveal.ref} className="max-w-7xl mx-auto">
          <div className={`mb-16 reveal ${catalogReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow">Ассортимент</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Что есть в коллекции
            </h2>
            <p className="font-ibm mt-4" style={{ color: "#b8b8c2", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "480px", fontWeight: 300 }}>
              Ассортимент охватывает ключевые категории верхней одежды для холодной, прохладной и межсезонной погоды.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                className={`catalog-card reveal delay-${i + 1} ${catalogReveal.visible ? "visible" : ""}`}
              >
                <div className="cat-tag">{p.category}</div>
                <div className="flex items-start justify-between">
                  <h3
                    className="font-oswald text-lg leading-tight"
                    style={{ color: "#f5f5f7", fontWeight: 400, letterSpacing: "0.03em" }}
                  >
                    {p.name}
                  </h3>
                  <Icon name={p.icon} fallback="Package" size={16} style={{ color: "#2a2a31", marginLeft: "8px", marginTop: "4px", flexShrink: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────── */}
      <section id="trust" className="py-28 px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div ref={trustReveal.ref} className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`reveal ${trustReveal.visible ? "visible" : ""}`}>
                <span className="section-eyebrow">Доверие</span>
                <div className="accent-bar" />
                <h2
                  className="font-oswald mb-8"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  Почему нам доверяют
                </h2>
              </div>

              <div>
                {TRUST_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`trust-row reveal delay-${i + 1} ${trustReveal.visible ? "visible" : ""}`}
                  >
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(215,181,109,0.12)", border: "1px solid rgba(215,181,109,0.25)" }}
                    >
                      <Icon name="Check" size={13} className="text-accent" />
                    </div>
                    <p className="font-ibm text-sm leading-7" style={{ color: "#b8b8c2", fontWeight: 300 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`reveal delay-3 ${trustReveal.visible ? "visible" : ""}`}>
              <div className="relative">
                <img
                  src={TEXTURE_IMG}
                  alt="Качество материалов"
                  className="w-full object-cover"
                  style={{ height: "420px", filter: "brightness(0.75) saturate(0.8)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, transparent 50%, rgba(15,15,16,0.7) 100%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ borderTop: "1px solid rgba(215,181,109,0.2)" }}
                >
                  <p
                    className="font-ibm text-sm italic leading-7"
                    style={{ color: "rgba(245,245,247,0.7)", fontWeight: 300 }}
                  >
                    Лучшие размеры и самые востребованные модели разбирают первыми.
                    Если вы давно искали вещь, которая будет и красивой, и практичной, —
                    сейчас самое время выбрать её без спешки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        id="cta"
        className="py-24 px-6"
        style={{
          borderTop: "1px solid #2a2a31",
          background: "linear-gradient(135deg, #17171a 0%, #0f0f10 100%)",
        }}
      >
        <div ref={ctaReveal.ref} className="max-w-3xl mx-auto text-center">
          <div className={`reveal ${ctaReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow" style={{ justifyContent: "center", display: "block" }}>Сделайте выбор</span>
            <div className="accent-bar mx-auto" />
            <h2
              className="font-oswald mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: 1.15,
              }}
            >
              Пора выбрать верхнюю одежду,
              <br />
              <span style={{ color: "#d7b56d" }}>которая работает на ваш образ</span>
            </h2>
            <p className="font-ibm mb-10" style={{ color: "#b8b8c2", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>
              Оставьте заявку или перейдите в каталог — и подберите модель под свой стиль,
              сезон и привычный ритм жизни.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="btn-primary text-sm">
                Оставить заявку
                <Icon name="ArrowRight" size={14} />
              </a>
              <a href="#catalog" className="btn-secondary text-sm">
                В каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-28 px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div ref={faqReveal.ref} className="max-w-3xl mx-auto">
          <div className={`mb-14 reveal ${faqReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow">FAQ</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Частые вопросы
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-row reveal delay-${i + 1} ${faqReveal.visible ? "visible" : ""}`}>
                <button
                  className="w-full flex items-center justify-between py-6 text-left bg-transparent border-none cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="font-oswald text-lg pr-8"
                    style={{
                      color: openFaq === i ? "#d7b56d" : "#f5f5f7",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      transition: "color 0.25s",
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                    style={{
                      border: "1px solid",
                      borderColor: openFaq === i ? "#d7b56d" : "#2a2a31",
                      transition: "border-color 0.25s",
                    }}
                  >
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={14}
                      className={openFaq === i ? "text-accent" : ""}
                      style={{ color: openFaq === i ? "#d7b56d" : "#b8b8c2" }}
                    />
                  </div>
                </button>
                {openFaq === i && (
                  <div
                    className="pb-6 font-ibm text-sm leading-7"
                    style={{ color: "#b8b8c2", fontWeight: 300 }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer
        className="py-10 px-6"
        style={{
          borderTop: "1px solid #2a2a31",
          background: "#0f0f10",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-oswald tracking-widest font-semibold" style={{ color: "#f5f5f7", letterSpacing: "0.18em" }}>
            FASHION OUTERWEAR
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Каталог", "Преимущества", "Доверие", "FAQ"].map((item, i) => (
              <a key={item} href={["#catalog", "#benefits", "#trust", "#faq"][i]} className="nav-item text-xs">
                {item}
              </a>
            ))}
          </div>
          <p className="font-ibm text-xs text-center md:text-right" style={{ color: "#2a2a31", letterSpacing: "0.08em" }}>
            © 2026 Fashion Outerwear. Верхняя одежда из кожи, меха и текстиля.
          </p>
        </div>
      </footer>
    </div>
  );
}