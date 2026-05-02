"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "ru" | "tj";

const translations = {
  ru: {
    // Nav
    home: "Главная",
    map: "Карта",
    postAd: "Подать",
    messages: "Сообщения",
    profile: "Профиль",
    chat: "Чат",

    // Search
    searchFilters: "Поиск и фильтры",
    popularCities: "Популярные города",
    allCities: "Все города",

    // Chips
    forRent: "Аренда",
    forSale: "Продажа",
    daily: "Посуточно",
    longTerm: "Длительно",

    // Listings
    listingsFound: "объявлений найдено",
    listingFound: "объявление найдено",
    noListings: "Объявления не найдены",
    noListingsHint: "Попробуйте изменить город или параметры фильтра.",
    activeToday: "Активно сегодня",
    postedAgo: "Опубликовано",

    // Listing detail
    rooms: "Комнаты",
    area: "Площадь",
    floor: "Этаж",
    district: "Район",
    description: "Описание",
    seller: "Продавец",
    online: "В сети",
    lastSeen: "Был(а) недавно",
    writeMessage: "Написать",
    call: "Позвонить",

    // Filters modal
    filters: "Фильтры",
    dealType: "Тип сделки",
    propertyType: "Тип недвижимости",
    apartment: "Квартира",
    house: "Дом",
    commercial: "Коммерция",
    priceRange: "Диапазон цен",
    min: "Мин",
    max: "Макс",
    apply: "Применить",
    reset: "Сбросить",

    // Post listing
    postListing: "Подать объявление",
    fillDetails: "Заполните данные для публикации",
    photos: "Фотографии",
    addPhoto: "Добавить фото",
    details: "Детали",
    totalArea: "Общая площадь (м²)",
    price: "Цена",
    monthlyPrice: "Ежемесячная цена ($)",
    salePrice: "Цена ($)",
    location: "Местоположение",
    city: "Город",
    address: "Адрес",
    descriptionLabel: "Описание",
    descriptionPlaceholder: "Опишите вашу недвижимость: состояние, мебель, рядом...",
    contactInfo: "Контактная информация",
    yourName: "Ваше имя",
    phone: "Телефон",
    publishListing: "Опубликовать",
    listingPublished: "Объявление опубликовано!",
    listingPublishedHint: "Ваше объявление доступно всем пользователям. Вы получите уведомление, когда кто-то заинтересуется.",
    postAnother: "Подать ещё",

    // Profile
    memberSince: "Участник с",
    activeAds: "Объявления",
    favorites: "Избранное",
    chats: "Чаты",
    myListings: "Мои объявления",
    notifications: "Уведомления",
    privacySecurity: "Конфиденциальность",
    appSettings: "Настройки",
    helpSupport: "Помощь",
    logOut: "Выйти",

    // Messages
    conversations: "диалогов",
    noMessages: "Пока нет сообщений",
    noMessagesHint: "Начните диалог, написав продавцу на странице объявления.",

    // Map
    mapView: "Карта",
    propertiesNearby: "объектов рядом",
    listView: "Список",

    // Auth
    login: "Войти",
    register: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    fullName: "Полное имя",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта?",
    haveAccount: "Есть аккаунт?",
    orContinueWith: "или продолжить с",
    welcomeBack: "С возвращением!",
    createAccount: "Создать аккаунт",
    loginHint: "Войдите, чтобы управлять объявлениями и общаться с продавцами",
    registerHint: "Присоединяйтесь к arzon.pro для поиска недвижимости",

    // Theme
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема",
  },
  tj: {
    // Nav
    home: "Асосӣ",
    map: "Харита",
    postAd: "Эълон",
    messages: "Паёмҳо",
    profile: "Профил",
    chat: "Чат",

    // Search
    searchFilters: "Ҷустуҷӯ ва филтрҳо",
    popularCities: "Шаҳрҳои маъмул",
    allCities: "Ҳамаи шаҳрҳо",

    // Chips
    forRent: "Иҷора",
    forSale: "Фурӯш",
    daily: "Рӯзона",
    longTerm: "Дарозмуддат",

    // Listings
    listingsFound: "эълон ёфт шуд",
    listingFound: "эълон ёфт шуд",
    noListings: "Эълон ёфт нашуд",
    noListingsHint: "Шаҳр ё филтрҳоро иваз кунед.",
    activeToday: "Имрӯз фаъол",
    postedAgo: "Нашр шуд",

    // Listing detail
    rooms: "Хонаҳо",
    area: "Масоҳат",
    floor: "Ошёна",
    district: "Ноҳия",
    description: "Тавсиф",
    seller: "Фурӯшанда",
    online: "Дар шабака",
    lastSeen: "Охирин бор дида шуд",
    writeMessage: "Навиштан",
    call: "Занг задан",

    // Filters modal
    filters: "Филтрҳо",
    dealType: "Навъи муомила",
    propertyType: "Навъи амвол",
    apartment: "Квартира",
    house: "Хона",
    commercial: "Тиҷоратӣ",
    priceRange: "Доираи нарх",
    min: "Ҳадди ақал",
    max: "Ҳадди аксар",
    apply: "Татбиқ кардан",
    reset: "Бозгардонидан",

    // Post listing
    postListing: "Эълон додан",
    fillDetails: "Маълумотро барои нашр пур кунед",
    photos: "Суратҳо",
    addPhoto: "Сурат илова кунед",
    details: "Тафсилот",
    totalArea: "Масоҳати умумӣ (м²)",
    price: "Нарх",
    monthlyPrice: "Нархи моҳона ($)",
    salePrice: "Нарх ($)",
    location: "Ҷойгиршавӣ",
    city: "Шаҳр",
    address: "Суроға",
    descriptionLabel: "Тавсиф",
    descriptionPlaceholder: "Амволи худро тавсиф кунед: ҳолат, мебел, наздикӣ...",
    contactInfo: "Маълумоти тамос",
    yourName: "Номи шумо",
    phone: "Телефон",
    publishListing: "Нашр кардан",
    listingPublished: "Эълон нашр шуд!",
    listingPublishedHint: "Эълони шумо барои ҳамаи корбарон дастрас аст. Шумо ҳангоми таваҷҷуҳи касе огоҳӣ мегиред.",
    postAnother: "Боз эълон додан",

    // Profile
    memberSince: "Аъзо аз",
    activeAds: "Эълонҳо",
    favorites: "Дӯстдоштаҳо",
    chats: "Чатҳо",
    myListings: "Эълонҳои ман",
    notifications: "Огоҳиҳо",
    privacySecurity: "Махфият",
    appSettings: "Танзимот",
    helpSupport: "Кӯмак",
    logOut: "Баромадан",

    // Messages
    conversations: "муколамаҳо",
    noMessages: "Ҳоло паём нест",
    noMessagesHint: "Муколамаро бо навиштан ба фурӯшанда оғоз кунед.",

    // Map
    mapView: "Харита",
    propertiesNearby: "объектҳо дар наздикӣ",
    listView: "Рӯйхат",

    // Auth
    login: "Даромадан",
    register: "Бақайдгирӣ",
    email: "Почтаи электронӣ",
    password: "Рамз",
    confirmPassword: "Рамзро тасдиқ кунед",
    fullName: "Номи пурра",
    forgotPassword: "Рамзро фаромӯш кардед?",
    noAccount: "Аккаунт надоред?",
    haveAccount: "Аккаунт доред?",
    orContinueWith: "ё идома диҳед бо",
    welcomeBack: "Хуш омадед!",
    createAccount: "Эҷоди аккаунт",
    loginHint: "Ворид шавед барои идоракунии эълонҳо ва муоширати бо фурӯшандагон",
    registerHint: "Ба arzon.pro ҳамроҳ шавед барои ҷустуҷӯи амвол",

    // Theme
    darkMode: "Мавзӯи торик",
    lightMode: "Мавзӯи равшан",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ru"];

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] ?? key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
