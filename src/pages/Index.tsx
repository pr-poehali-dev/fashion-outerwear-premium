import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const GALLERY_IMAGES = [
  {
    src: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/fc03b1c2-4793-4663-b513-b7c296468324.jpg",
    label: "Коллекция I",
  },
  {
    src: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/820e2524-04bb-4f83-9ca8-a7170bc6ea7b.jpg",
    label: "Коллекция II",
  },
  {
    src: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9526ae12-7e2c-4e8d-b8bd-161c8dc8a60b.jpg",
    label: "Коллекция III",
  },
];

const ADVANTAGES = [
  {
    icon: "Gem",
    title: "Безупречное качество",
    desc: "Каждая деталь создаётся вручную с использованием материалов высшего класса, отобранных со всего мира.",
  },
  {
    icon: "Crown",
    title: "Эксклюзивность",
    desc: "Ограниченные серии для тех, кто ценит подлинную редкость. Не более 100 экземпляров каждой позиции.",
  },
  {
    icon: "Shield",
    title: "Гарантия подлинности",
    desc: "Каждое изделие сопровождается сертификатом и уникальным номером, подтверждающим его происхождение.",
  },
  {
    icon: "Star",
    title: "Персональный сервис",
    desc: "Ваш личный консультант доступен круглосуточно для ответа на любые вопросы и помощи в выборе.",
  },
];

const REVIEWS = [
  {
    name: "Александра В.",
    role: "Арт-директор",
    text: "Невозможно передать словами то чувство, когда держишь в руках это изделие. Это не просто вещь — это произведение искусства.",
    rating: 5,
  },
  {
    name: "Михаил К.",
    role: "Предприниматель",
    text: "Обращался трижды. Каждый раз уровень сервиса и качество изделий превосходят ожидания. Рекомендую без оговорок.",
    rating: 5,
  },
  {
    name: "Наталья Р.",
    role: "Коллекционер",
    text: "В моей коллекции немало предметов роскоши, но именно эти изделия занимают особое место. Вне конкуренции.",
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: "Как проходит процесс заказа?",
    a: "Вы оставляете заявку, наш консультант связывается с вами в течение 2 часов, обсуждает детали и предпочтения. После согласования — производство и доставка.",
  },
  {
    q: "Какие сроки изготовления?",
    a: "Стандартные позиции — от 14 дней. Персонализированные изделия по индивидуальному заказу — от 30 до 60 дней в зависимости от сложности.",
  },
  {
    q: "Возможна ли доставка за рубеж?",
    a: "Да, мы осуществляем доставку в более чем 40 стран мира. Каждое изделие упаковывается в фирменный кейс и застраховано на время транспортировки.",
  },
  {
    q: "Есть ли программа для постоянных клиентов?",
    a: "Для наших постоянных клиентов действует закрытая программа с приоритетным доступом к новым коллекциям, персональными скидками и приглашениями на закрытые мероприятия.",
  },
  {
    q: "Как подтвердить подлинность изделия?",
    a: "Каждое изделие имеет уникальный серийный номер и сертификат подлинности. Проверка возможна через наш официальный реестр онлайн.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-6">
      <div className="section-divider" />
      <span
        className="font-montserrat text-xs tracking-[0.3em] uppercase text-gold"
        style={{ fontWeight: 400 }}
      >
        {children}
      </span>
      <div className="section-divider" />
    </div>
  );
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroSection = useInView(0.1);
  const aboutSection = useInView(0.15);
  const advantagesSection = useInView(0.1);
  const gallerySection = useInView(0.1);
  const reviewsSection = useInView(0.1);
  const faqSection = useInView(0.1);
  const contactSection = useInView(0.1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  const navLinks = [
    { href: "#about", label: "О продукте" },
    { href: "#advantages", label: "Преимущества" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen font-montserrat" style={{ backgroundColor: "var(--obsidian)", color: "#E8DCC8" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.95), transparent)" }}
      >
        <a href="#" className="font-cormorant text-2xl tracking-widest gold-text-gradient font-light">
          MAISON
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:inline-block shimmer-btn px-6 py-2 text-xs tracking-widest"
          style={{ borderRadius: "1px" }}
        >
          Заявка
        </a>
        <button
          className="md:hidden text-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(13,13,13,0.98)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-cormorant text-3xl gold-text-gradient"
              onClick={() => setMobileMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, rgba(139,105,20,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 50%), var(--obsidian)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div
          ref={heroSection.ref}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <div
            className={`transition-all duration-1000 ${heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-8 opacity-80">
              Коллекция 2026
            </p>
            <h1
              className="font-cormorant text-6xl md:text-8xl lg:text-9xl mb-8"
              style={{ fontWeight: 300, lineHeight: "0.95" }}
            >
              <span className="block italic gold-text-gradient">Искусство</span>
              <span className="block" style={{ color: "#E8DCC8" }}>совершенства</span>
            </h1>
            <p
              className="font-montserrat text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto"
              style={{ color: "rgba(232, 220, 200, 0.55)", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Предметы роскоши для тех, кто ценит безупречность в каждой детали.
              Ограниченные серии. Ручная работа. Вечное качество.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="shimmer-btn px-10 py-4 text-xs tracking-widest inline-block transition-all duration-300"
                style={{ borderRadius: "1px" }}
              >
                Оставить заявку
              </a>
              <a
                href="#about"
                className="px-10 py-4 text-xs tracking-widest inline-block transition-all duration-300 border font-montserrat"
                style={{
                  borderColor: "rgba(201,168,76,0.3)",
                  color: "rgba(232, 220, 200, 0.7)",
                  borderRadius: "1px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.8)";
                  e.currentTarget.style.color = "#E8C97A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                  e.currentTarget.style.color = "rgba(232, 220, 200, 0.7)";
                }}
              >
                Узнать больше
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(201,168,76,0.4)" }}
        >
          <span className="font-montserrat uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}>SCROLL</span>
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)" }}
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 relative overflow-hidden">
        <div
          className="absolute left-0 top-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)", transform: "translate(-50%, -50%)" }}
        />
        <div
          ref={aboutSection.ref}
          className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div>
            <SectionLabel>О продукте</SectionLabel>
            <h2
              className="font-cormorant text-5xl md:text-6xl mb-8 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Создано для <em className="gold-text-gradient not-italic">избранных</em>
            </h2>
            <p
              className="font-montserrat text-sm leading-8 mb-6"
              style={{ color: "rgba(232, 220, 200, 0.6)", fontWeight: 300 }}
            >
              Наша история начинается с одержимости совершенством. Каждое изделие проходит через руки
              более двадцати мастеров, прежде чем попасть к своему владельцу. Мы не производим —
              мы создаём наследие.
            </p>
            <p
              className="font-montserrat text-sm leading-8"
              style={{ color: "rgba(232, 220, 200, 0.6)", fontWeight: 300 }}
            >
              Материалы отбираются лично нашими экспертами в экспедициях по трём континентам.
              Только лучшее достойно нашего имени.
            </p>
            <div className="mt-10 flex gap-12">
              {[["20+", "лет традиций"], ["100", "мастеров"], ["40+", "стран доставки"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-cormorant text-4xl gold-text-gradient" style={{ fontWeight: 300 }}>{num}</div>
                  <div className="font-montserrat text-xs mt-1" style={{ color: "rgba(232,220,200,0.4)", letterSpacing: "0.1em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-sm"
              style={{ border: "1px solid rgba(201,168,76,0.1)" }}
            />
            <img
              src={GALLERY_IMAGES[0].src}
              alt="О продукте"
              className="w-full object-cover gallery-img"
              style={{ height: "420px", borderRadius: "1px" }}
            />
            <div
              className="absolute bottom-6 left-6 px-4 py-2"
              style={{ background: "rgba(13,13,13,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(10px)" }}
            >
              <span className="font-cormorant text-sm italic text-gold-light">Maison, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-32 px-6 relative" style={{ background: "var(--charcoal)" }}>
        <div
          ref={advantagesSection.ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${advantagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-20">
            <SectionLabel>Преимущества</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl" style={{ fontWeight: 300 }}>
              Почему выбирают <em className="gold-text-gradient not-italic">нас</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((item, i) => (
              <div
                key={i}
                className="luxury-card p-8 group transition-all duration-500"
                style={{ borderRadius: "1px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(201,168,76,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.2)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "1px" }}
                >
                  <Icon name={item.icon} fallback="Star" size={20} className="text-gold" />
                </div>
                <h3 className="font-cormorant text-2xl mb-4 text-gold-light" style={{ fontWeight: 400 }}>
                  {item.title}
                </h3>
                <p className="font-montserrat text-xs leading-7" style={{ color: "rgba(232,220,200,0.5)", fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-6">
        <div
          ref={gallerySection.ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${gallerySection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-20">
            <SectionLabel>Галерея</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl" style={{ fontWeight: 300 }}>
              Наши <em className="gold-text-gradient not-italic">коллекции</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="relative overflow-hidden group" style={{ borderRadius: "1px" }}>
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full object-cover gallery-img"
                  style={{ height: i === 1 ? "480px" : "360px" }}
                />
                <div
                  className="absolute inset-0 flex items-end p-6 transition-all duration-500"
                  style={{ background: "linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 60%)" }}
                >
                  <span className="font-cormorant text-xl italic text-gold-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {img.label}
                  </span>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{ border: "1px solid rgba(201,168,76,0.4)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        className="py-32 px-6"
        style={{ background: `linear-gradient(135deg, var(--charcoal) 0%, var(--obsidian) 100%)` }}
      >
        <div
          ref={reviewsSection.ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-20">
            <SectionLabel>Отзывы</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl" style={{ fontWeight: 300 }}>
              Слова наших <em className="gold-text-gradient not-italic">клиентов</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="luxury-card p-8 relative"
                style={{ borderRadius: "1px" }}
              >
                <div className="mb-4">
                  <span className="font-cormorant text-6xl gold-text-gradient" style={{ fontWeight: 300, lineHeight: 1 }}>"</span>
                </div>
                <p
                  className="font-cormorant text-lg leading-relaxed mb-8 italic"
                  style={{ color: "rgba(232,220,200,0.8)", fontWeight: 300, lineHeight: "1.8" }}
                >
                  {r.text}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-gold" />
                  ))}
                </div>
                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <div className="font-montserrat text-sm" style={{ color: "#E8C97A", fontWeight: 500 }}>{r.name}</div>
                  <div className="font-montserrat text-xs mt-1" style={{ color: "rgba(232,220,200,0.35)", letterSpacing: "0.1em" }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div
          ref={faqSection.ref}
          className={`max-w-3xl mx-auto transition-all duration-1000 ${faqSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-20">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl" style={{ fontWeight: 300 }}>
              Частые <em className="gold-text-gradient not-italic">вопросы</em>
            </h2>
          </div>
          <div className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="w-full flex items-center justify-between py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="font-cormorant text-xl pr-6 transition-colors duration-300"
                    style={{ color: openFaq === i ? "var(--gold)" : "#E8DCC8", fontWeight: 400 }}
                  >
                    {item.q}
                  </span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className="flex-shrink-0 text-gold"
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="pb-6 font-montserrat text-sm leading-8"
                    style={{ color: "rgba(232,220,200,0.55)", fontWeight: 300 }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-32 px-6 relative overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)" }}
        />
        <div
          ref={contactSection.ref}
          className={`max-w-xl mx-auto relative z-10 transition-all duration-1000 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <SectionLabel>Контакты</SectionLabel>
            <h2 className="font-cormorant text-5xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
              Оставьте <em className="gold-text-gradient not-italic">заявку</em>
            </h2>
            <p
              className="font-montserrat text-sm"
              style={{ color: "rgba(232,220,200,0.45)", fontWeight: 300, lineHeight: "1.8" }}
            >
              Наш консультант свяжется с вами в течение двух часов
              и ответит на все вопросы.
            </p>
          </div>

          {formSent ? (
            <div
              className="text-center py-16 luxury-card"
              style={{ borderRadius: "1px" }}
            >
              <Icon name="CheckCircle" size={40} className="text-gold mx-auto mb-6" />
              <h3 className="font-cormorant text-3xl mb-4 text-gold-light" style={{ fontWeight: 300 }}>
                Заявка принята
              </h3>
              <p className="font-montserrat text-sm" style={{ color: "rgba(232,220,200,0.5)", fontWeight: 300 }}>
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block font-montserrat text-xs mb-2"
                    style={{ color: "rgba(201,168,76,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    Имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3"
                    style={{ borderRadius: "1px" }}
                  />
                </div>
                <div>
                  <label
                    className="block font-montserrat text-xs mb-2"
                    style={{ color: "rgba(201,168,76,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3"
                    style={{ borderRadius: "1px" }}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block font-montserrat text-xs mb-2"
                  style={{ color: "rgba(201,168,76,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3"
                  style={{ borderRadius: "1px" }}
                />
              </div>
              <div>
                <label
                  className="block font-montserrat text-xs mb-2"
                  style={{ color: "rgba(201,168,76,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем запросе..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 resize-none"
                  style={{ borderRadius: "1px" }}
                />
              </div>
              <button
                type="submit"
                className="w-full shimmer-btn py-4 text-xs tracking-widest mt-2 transition-all duration-300"
                style={{ borderRadius: "1px" }}
              >
                Отправить заявку
              </button>
              <p
                className="text-center font-montserrat text-xs"
                style={{ color: "rgba(232,220,200,0.25)", letterSpacing: "0.05em" }}
              >
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6 text-center"
        style={{ background: "var(--obsidian)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div className="font-cormorant text-2xl tracking-widest gold-text-gradient mb-4" style={{ fontWeight: 300 }}>
          MAISON
        </div>
        <div className="hidden md:flex justify-center gap-8 mb-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-xs">
              {l.label}
            </a>
          ))}
        </div>
        <p
          className="font-montserrat text-xs"
          style={{ color: "rgba(232,220,200,0.2)", letterSpacing: "0.1em" }}
        >
          © 2026 Maison. Все права защищены.
        </p>
      </footer>
    </div>
  );
}