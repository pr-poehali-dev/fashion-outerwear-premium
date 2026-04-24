import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/3be4525b-5cdf-43fd-a6bd-d6a988b50056.jpg";
const TEXTURE_IMG = "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9261bfed-ae48-45c4-a22e-55f56ef7173a.jpg";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ProductItem {
  name: string;
  price: number;
  img: string;
}

interface AccordionGroup {
  id: string;
  category: string;
  label: string;
  icon: string;
  letter?: string;
  items: ProductItem[];
}

const CATALOG: AccordionGroup[] = [
  {
    id: "leather-w",
    category: "Кожа",
    label: "Кожаные куртки",
    icon: "Zap",
    items: [
      { name: "Куртка Moto Classic", price: 18900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
      { name: "Куртка Biker Edge", price: 22500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
      { name: "Куртка Racer Slim", price: 16700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
      { name: "Куртка Park Street", price: 14900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
      { name: "Куртка Vintage Soft", price: 19800, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
      { name: "Куртка Urban Matte", price: 21300, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/9572a07d-c85f-4276-b5d8-ad4ac22d389f.jpg" },
    ],
  },
  {
    id: "shearling-w",
    category: "Мех",
    label: "Дублёнки",
    icon: "Wind",
    items: [
      { name: "Дублёнка Boho Beige", price: 24900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
      { name: "Дублёнка Toscana Long", price: 31500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
      { name: "Дублёнка Prairie Short", price: 19900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
      { name: "Дублёнка Sherpa Oversize", price: 27800, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
      { name: "Дублёнка Classic Sand", price: 22400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
      { name: "Дублёнка Winter Wrap", price: 26100, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/d3ad7a8e-a153-4b77-afb8-be21acae1781.jpg" },
    ],
  },
  {
    id: "fur-w",
    category: "Мех",
    label: "Шубы",
    icon: "Snowflake",
    items: [
      { name: "Шуба Mink Prestige", price: 89000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
      { name: "Шуба Arctic Luxury", price: 112000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
      { name: "Шуба Fox Glam", price: 74500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
      { name: "Шуба Silver Dream", price: 98000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
      { name: "Шуба Karakul Elite", price: 135000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
      { name: "Шуба Sable Classic", price: 156000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/27015eea-040f-433d-ae31-dc33704bf51c.jpg" },
    ],
  },
  {
    id: "coat-w",
    category: "Текстиль",
    label: "Пальто",
    icon: "Layers",
    items: [
      { name: "Пальто Camel Classic", price: 15900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
      { name: "Пальто Check Luxe", price: 18400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
      { name: "Пальто Wool Midi", price: 13700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
      { name: "Пальто Oversized Dark", price: 17200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
      { name: "Пальто Belted Maxi", price: 21000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
      { name: "Пальто City Slim", price: 14500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/0508d875-ef80-4c19-a60b-07d6b4ce6695.jpg" },
    ],
  },
  {
    id: "raincoat-w",
    category: "Текстиль",
    label: "Плащи",
    icon: "Droplets",
    items: [
      { name: "Плащ Rain Shield", price: 8900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
      { name: "Плащ Khaki Storm", price: 11200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
      { name: "Плащ Olive Wrap", price: 9700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
      { name: "Плащ Midi Belted", price: 12400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
      { name: "Плащ Street Minimal", price: 7800, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
      { name: "Плащ Double Breasted", price: 13100, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/ef3d24f1-60e3-40f4-8943-604f7c42dec7.jpg" },
    ],
  },
  {
    id: "denim-w",
    category: "Текстиль",
    label: "Джинсовые куртки",
    icon: "Grid3x3",
    items: [
      { name: "Джинсовка Indigo Raw", price: 7200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
      { name: "Джинсовка Dark Wash", price: 8500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
      { name: "Джинсовка Acid Vintage", price: 6900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
      { name: "Джинсовка Sherpa Lined", price: 10400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
      { name: "Джинсовка Crop Fit", price: 5900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
      { name: "Джинсовка Boyfriend XL", price: 7700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/44713c8a-3db8-493d-9075-bffb3d0d7b31.jpg" },
    ],
  },
  {
    id: "trench-w",
    category: "Текстиль",
    label: "Тренчи",
    icon: "Minus",
    items: [
      { name: "Тренч London Classic", price: 11900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
      { name: "Тренч Paris Slim", price: 14300, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
      { name: "Тренч Sand Belted", price: 12700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
      { name: "Тренч Dark Minimal", price: 16500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
      { name: "Тренч Rain Proof", price: 10200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
      { name: "Тренч Oversized Wrap", price: 18900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/c74a1f4a-3bbd-4688-8561-c9d11ce29641.jpg" },
    ],
  },
  {
    id: "puffer-w",
    category: "Тепло",
    label: "Зимние пуховики",
    icon: "Flame",
    items: [
      { name: "Пуховик Arctic Pro", price: 19900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
      { name: "Пуховик Ice Shield", price: 23500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
      { name: "Пуховик Snow Queen", price: 17800, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
      { name: "Пуховик Oversize Warm", price: 21400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
      { name: "Пуховик Quilted Long", price: 16200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
      { name: "Пуховик Down Ultra", price: 28900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/bfe85a1b-f2f6-4953-a13f-72678d4afc66.jpg" },
    ],
  },
  {
    id: "light-w",
    category: "Текстиль",
    label: "Лёгкие модели",
    icon: "Feather",
    items: [
      { name: "Ветровка Spring Air", price: 5900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
      { name: "Куртка Light Shell", price: 7200, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
      { name: "Бомбер Soft Touch", price: 8800, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
      { name: "Куртка Pastel Breeze", price: 6400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
      { name: "Ветровка Minimal Zip", price: 5400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
      { name: "Куртка Fresh Layer", price: 7900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/84438ab4-1589-42c5-b380-fbe548ae16fa.jpg" },
    ],
  },
  {
    id: "leather-m",
    category: "Кожа",
    label: "Кожаные куртки мужские",
    icon: "Zap",
    letter: "М",
    items: [
      { name: "Куртка Men's Biker", price: 21900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
      { name: "Куртка Racer Dark", price: 18700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
      { name: "Куртка Aviator Brown", price: 24500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
      { name: "Куртка Slim Rider", price: 16900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
      { name: "Куртка Classic Moto", price: 19300, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
      { name: "Куртка Street Black", price: 22100, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4e4fed25-3ebb-4247-b6aa-daffd0d65153.jpg" },
    ],
  },
  {
    id: "shearling-m",
    category: "Мех",
    label: "Дублёнки мужские",
    icon: "Wind",
    letter: "М",
    items: [
      { name: "Дублёнка Men's Ranch", price: 29900, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
      { name: "Дублёнка Sheriff Dark", price: 34500, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
      { name: "Дублёнка Toscana Men", price: 38000, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
      { name: "Дублёнка Classic Brown", price: 27400, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
      { name: "Дублёнка Mountain Pro", price: 32100, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
      { name: "Дублёнка Winter Boss", price: 36700, img: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/05a3d77b-6e38-4f70-93de-be3fb575cdd0.jpg" },
    ],
  },
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
    q: "Где вы находитесь?",
    a: "Наши магазины находятся по адресу - г. Владивосток, Борисенко 17 и г. Владивосток, пр-кт 100-летия 42А ( ТЦ Искра) 42 павильон.",
  },
  {
    q: "Какой режим работы у магазина?",
    a: "Наши магазины работают ежедневно с 10:00 до 19:00.",
  },
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

const REVIEWS = [
  {
    name: "Марина",
    age: "34 года",
    text: "Купила здесь пальто и очень довольна. Село хорошо, материал приятный, выглядит дорого. Буду смотреть ещё на следующий сезон.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/2cf456e9-1d0f-4547-a595-656f709fd29a.jpg",
  },
  {
    name: "Игорь",
    age: "41 год",
    text: "Брал кожаную куртку. Качество отличное, пошив аккуратный, размер подошёл сразу. Ношу почти каждый день, пока всё нравится.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/4378b413-d545-4a11-ab05-00bff55e89f2.jpg",
  },
  {
    name: "Ольга",
    age: "29 лет",
    text: "Долго искала тёплый и красивый пуховик. Здесь нашла именно то, что хотела. Тепло, удобно и стиль не потерялся.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/221097a0-ab1c-4473-a0de-027cff1e763c.jpg",
  },
  {
    name: "Елена",
    age: "46 лет",
    text: "Покупала дублёнку. Очень довольна покупкой: мягкая, тёплая, выглядит аккуратно. Спасибо за хороший сервис и помощь с размером.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/fda12b00-c1ca-49cd-8331-8d8489fdf6e4.jpg",
  },
  {
    name: "Анна",
    age: "32 года",
    text: "Я влюбилась в свою дублёнку с первого примерки. Она такая мягкая, уютная и при этом выглядит очень красиво. Наконец-то нашла вещь, которую хочется носить снова и снова.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/04af052b-0e79-480c-a167-970aecef7d8e.jpg",
  },
  {
    name: "Дмитрий",
    age: "39 лет",
    text: "Честно, не ожидал такого качества. Куртка села отлично, кожа приятная, швы аккуратные. Когда надел — сразу почувствовал, что это хорошая покупка, не на один сезон.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/8c500bd0-dd05-411d-a78e-bfdff9a98c12.jpg",
  },
  {
    name: "Светлана",
    age: "27 лет",
    text: "Пуховик просто спас этой зимой. Очень тёплый, удобный и не выглядит громоздко, что для меня было важно, всё прошло легко и без нервов.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/11b5e8fe-bf6e-44d9-bbf4-3c453a0d582c.jpg",
  },
  {
    name: "Наталья",
    age: "45 лет",
    text: "Долго сомневалась, брать или нет, но в итоге осталась очень довольна. Пальто смотрится элегантно, сидит красиво и подчёркивает фигуру. Получила кучу комплиментов уже в первый день.",
    photo: "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/files/e8997b19-4f6b-4e19-98c7-f310141da74b.jpg",
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
  const [openCatalog, setOpenCatalog] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

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
  const reviewsReveal = useReveal();
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, fontSize: "2rem", color: "#d7b56d", letterSpacing: "0.04em", lineHeight: 1 }}>
              Леон
            </div>
            <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1rem", color: "#b8906a", letterSpacing: "0.03em", lineHeight: 1, marginTop: "2px" }}>
              Владивосток
            </div>
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
            style={{ opacity: 0.3 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #0f0f10 30%, rgba(15,15,16,0.5) 70%, rgba(15,15,16,0.2) 100%)",
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
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 w-full pt-24 md:pt-28 pb-16 md:pb-20"
        >
          <div
            className={`max-w-xl transition-all duration-1000 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="section-eyebrow">Кожа • Мех • Текстиль</span>

            <h1
              className="font-oswald mb-5 md:mb-6"
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "0.01em",
                color: "#f5f5f7",
              }}
            >
              Верхняя одежда во Владивостоке —{" "}
              <br />
              <span style={{ color: "#d7b56d" }}>магазин Леон</span>
            </h1>

            <p
              className="mb-8 md:mb-10 font-ibm"
              style={{
                color: "#b8b8c2",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "440px",
              }}
            >
              Кожаные куртки, дублёнки, шубы, пальто, тренчи и пуховики — коллекция для тех,
              кто выбирает уверенный образ, комфорт и качество на весь сезон.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
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
            className={`mt-12 md:mt-20 flex border transition-all duration-1000 delay-300 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ borderColor: "#2a2a31", background: "rgba(23,23,26,0.8)", display: "inline-flex" }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="px-5 md:px-8 py-4 md:py-5 text-center"
                style={{ borderRight: i < STATS.length - 1 ? "1px solid #2a2a31" : "none" }}
              >
                <div
                  className="font-oswald text-2xl md:text-3xl mb-1"
                  style={{ color: "#d7b56d", fontWeight: 600, letterSpacing: "0.05em" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-ibm text-xs"
                  style={{ color: "#b8b8c2", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section id="benefits" className="py-16 md:py-28 px-5 md:px-6" style={{ borderTop: "1px solid #2a2a31" }}>
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
      <section id="catalog" className="py-16 md:py-28 px-5 md:px-6" style={{ background: "#13131600", borderTop: "1px solid #2a2a31" }}>
        <div ref={catalogReveal.ref} className="max-w-7xl mx-auto">
          <div className={`mb-12 reveal ${catalogReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow">Ассортимент</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Пальто, пуховики, дублёнки, шубы и кожаные куртки
            </h2>
            <p className="font-ibm mt-4" style={{ color: "#b8b8c2", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "480px", fontWeight: 300 }}>
              Ассортимент охватывает ключевые категории верхней одежды для холодной, прохладной и межсезонной погоды.
            </p>
            <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
              Магазин кожаных курток Владивосток
            </h2>
            <h2 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
              Купить верхнюю одежду в Приморском крае
            </h2>
          </div>

          <div className="catalog-accordion">
            {CATALOG.map((group, gi) => {
              const isOpen = openCatalog === group.id;
              return (
                <div key={group.id} className={`catalog-acc-row reveal delay-${gi + 1} ${catalogReveal.visible ? "visible" : ""}`}>
                  <button
                    className={`catalog-acc-btn${group.letter === "М" ? " catalog-card--m" : ""}${isOpen ? " catalog-acc-btn--open" : ""}`}
                    onClick={() => setOpenCatalog(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="cat-tag" style={{ position: "static", margin: 0 }}>{group.category}</span>
                      <span className="font-oswald" style={{ fontSize: "1.05rem", fontWeight: 400, letterSpacing: "0.04em", color: "#f5f5f7" }}>
                        {group.label}
                      </span>
                    </div>
                    <Icon
                      name="ChevronDown"
                      size={18}
                      style={{
                        color: "#d7b56d",
                        transition: "transform 0.3s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <div className={`catalog-acc-panel${isOpen ? " catalog-acc-panel--open" : ""}`}>
                    <div className="catalog-items-grid">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="product-card">
                          <div className="product-card__img-wrap">
                            <img src={item.img} alt={item.name} className="product-card__img" loading="lazy" />
                          </div>
                          <div className="product-card__body">
                            <h4 className="product-card__name font-oswald">{item.name}</h4>
                            <div className="product-card__sizes">
                              {SIZES.map((s) => (
                                <span key={s} className="product-card__size">{s}</span>
                              ))}
                            </div>
                            <div className="product-card__footer">
                              <span className="product-card__price">от {item.price.toLocaleString("ru-RU")} ₽</span>
                              <button className="product-card__btn">Купить</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────── */}
      <section id="trust" className="py-16 md:py-28 px-5 md:px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div ref={trustReveal.ref} className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
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
                  style={{ height: "280px", filter: "brightness(0.75) saturate(0.8)" }}
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
        className="py-16 md:py-24 px-5 md:px-6"
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
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button onClick={() => setPhoneModalOpen(true)} className="btn-primary text-sm">
                Позвонить
                <Icon name="Phone" size={14} />
              </button>
              <a href="#catalog" className="btn-secondary text-sm">
                В каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-28 px-5 md:px-6" style={{ borderTop: "1px solid #2a2a31" }}>
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
                    className="font-oswald text-base md:text-lg pr-4 md:pr-8"
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

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section id="reviews" className="py-16 md:py-28 px-5 md:px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div ref={reviewsReveal.ref} className="max-w-3xl mx-auto">
          <div className={`mb-14 reveal ${reviewsReveal.visible ? "visible" : ""}`}>
            <span className="section-eyebrow">Отзывы</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Что говорят покупатели
            </h2>
          </div>

          {/* Карусель */}
          <div className={`reveal ${reviewsReveal.visible ? "visible" : ""}`}>
            <div
              style={{
                background: "#17171a",
                border: "1px solid #2a2a31",
                padding: "28px 20px",
                minHeight: "240px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    inset: 0,
                    padding: "28px 20px",
                    opacity: reviewIndex === i ? 1 : 0,
                    transform: reviewIndex === i ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                    pointerEvents: reviewIndex === i ? "auto" : "none",
                  }}
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Icon key={s} name="Star" size={13} style={{ color: "#d7b56d" }} />
                    ))}
                  </div>
                  <p className="font-ibm text-sm leading-7 mb-6" style={{ color: "#b8b8c2", fontWeight: 300 }}>
                    «{r.text}»
                  </p>
                  <div className="flex items-center gap-4" style={{ borderTop: "1px solid #2a2a31", paddingTop: "16px" }}>
                    <img
                      src={r.photo}
                      alt={r.name}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #d7b56d",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <span className="font-oswald text-sm block" style={{ color: "#f5f5f7", letterSpacing: "0.1em" }}>
                        {r.name}
                      </span>
                      <span className="font-ibm text-xs" style={{ color: "#5a5a6a" }}>
                        {r.age}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Точки-индикаторы */}
            <div className="flex justify-center gap-2 mt-6">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  style={{
                    width: reviewIndex === i ? "24px" : "8px",
                    height: "8px",
                    background: reviewIndex === i ? "#d7b56d" : "#2a2a31",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO REVIEWS ────────────────────────────────── */}
      <section id="video-reviews" className="py-16 md:py-28 px-5 md:px-6" style={{ borderTop: "1px solid #2a2a31" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <span className="section-eyebrow">Видео-отзывы</span>
            <div className="accent-bar" />
            <h2
              className="font-oswald"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 600, letterSpacing: "0.02em" }}
            >
              Живые отзывы наших клиентов
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/bucket/0cdf4226-94b6-437a-98d3-a4e6f470b8bb.mp4",
              "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/bucket/9c8c8c4f-7708-4524-8bd9-0168677ac610.mp4",
              "https://cdn.poehali.dev/projects/3b9d10d9-6e20-4245-b7a2-a08729a85351/bucket/75c4a518-3419-455b-9f8f-c5f81f3d66a6.mp4",
            ].map((src, i) => (
              <div
                key={i}
                style={{
                  background: "#17171a",
                  border: "1px solid #2a2a31",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <video
                  controls
                  muted
                  style={{ width: "100%", display: "block", background: "#000" }}
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO nav */}
      <nav aria-label="Навигация по сайту" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <a href="#catalog">Каталог</a>
        <a href="#benefits">Преимущества</a>
        <a href="#trust">Доверие</a>
        <a href="#faq">FAQ</a>
      </nav>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer
        className="py-10 px-6"
        style={{
          borderTop: "1px solid #2a2a31",
          background: "#0f0f10",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, fontSize: "1.8rem", color: "#d7b56d", letterSpacing: "0.04em", lineHeight: 1 }}>
            Леон
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Каталог", "Преимущества", "Доверие", "FAQ"].map((item, i) => (
              <a key={item} href={["#catalog", "#benefits", "#trust", "#faq"][i]} className="nav-item text-xs">
                {item}
              </a>
            ))}
          </div>
          <p className="font-ibm text-xs text-center md:text-right" style={{ color: "#2a2a31", letterSpacing: "0.08em" }}>
            © 2026 Леон. Верхняя одежда из кожи, меха и текстиля.
          </p>
        </div>
      </footer>

      {phoneModalOpen && (
        <div
          onClick={() => setPhoneModalOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#17171a", border: "1px solid #2a2a31",
              borderRadius: "8px", padding: "40px 48px",
              textAlign: "center", minWidth: "280px",
            }}
          >
            <Icon name="Phone" size={32} style={{ color: "#d7b56d", marginBottom: "16px" }} />
            <p className="font-ibm" style={{ color: "#b8b8c2", fontSize: "0.8rem", marginBottom: "8px", letterSpacing: "0.08em" }}>
              ПОЗВОНИТЕ НАМ
            </p>
            <a
              href="tel:+74232634509"
              className="font-oswald"
              style={{ fontSize: "1.6rem", color: "#d7b56d", fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none" }}
            >
              +7 (423) 263-45-09
            </a>
            <button
              onClick={() => setPhoneModalOpen(false)}
              style={{
                display: "block", margin: "24px auto 0",
                background: "transparent", border: "1px solid #2a2a31",
                borderRadius: "4px", padding: "8px 24px",
                color: "#b8b8c2", fontSize: "0.8rem", cursor: "pointer",
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}