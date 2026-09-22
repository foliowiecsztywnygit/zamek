// Dane strony - Zamek Bukowiec (Pokoje, Atuty, Opinie, FAQ, Atrakcje)

export const advantages = [
  {
    id: 'location',
    title: 'Bieszczadzka lokalizacja',
    description: 'Bieszczadzki Park Narodowy zaledwie 8 km, Jezioro Solińskie tuż obok',
    icon: 'Mountain',
  },
  {
    id: 'garden',
    title: 'Ogród i taras',
    description: 'Piękny ogród, taras z widokiem na rzekę i miejsce na piknik',
    icon: 'Leaf',
  },
  {
    id: 'peace',
    title: 'Cisza i spokój',
    description: 'Otoczenie natury, rzeka i zalesione wzgórza',
    icon: 'Key',
  },
  {
    id: 'comfort',
    title: 'Komfort i wygoda',
    description: 'Prywatne łazienki, Wi-Fi, w pełni wyposażona kuchnia',
    icon: 'Flame',
  },
];

export const rooms = [
  {
    id: 'deluxe-bardzo-duze',
    name: 'Pokój Dwuosobowy typu Deluxe',
    description: 'Przestronny pokój dwuosobowy z bardzo dużym łóżkiem podwójnym. W pokoju znajduje się szafa, pościel oraz patio z widokiem na rzekę. Prywatna łazienka z prysznicem i suszarką do włosów. Z pokoju roztacza się widok na góry.',
    capacity: '2 osoby',
    amenities: ['Bardzo duże łóżko podwójne', 'Prywatna łazienka', 'Patio z widokiem', 'Szafa', 'Wi-Fi'],
    image: '/images/rooms/pokoj-chesterfield-lozko.jpeg',
    images: [
      '/images/rooms/pokoj-chesterfield-lozko.jpeg',
      '/images/rooms/pokoj-chesterfield-widok1.jpeg',
      '/images/rooms/pokoj-chesterfield-widok2.jpeg',
    ],
    details: {
      bedrooms: [
        '1 bardzo duże łóżko podwójne',
      ],
      livingRoom: 'Patio z widokiem na rzekę i góry',
      kitchen: 'Wspólna kuchnia: zmywarka, lodówka, piekarnik, płyta kuchenna, stół jadalny',
      bathrooms: 'Prywatna łazienka z prysznicem, suszarką do włosów, ręcznikami',
      outdoor: 'Patio z widokiem na rzekę, ogród, miejsce na piknik, grill'
    }
  },
  {
    id: 'deluxe-duze',
    name: 'Pokój Dwuosobowy typu Deluxe',
    description: 'Komfortowy pokój dwuosobowy z dużym łóżkiem podwójnym. Wyposażony w szafę i pościel. Prywatna łazienka z prysznicem i suszarką do włosów. Patio z widokiem na rzekę.',
    capacity: '2 osoby',
    amenities: ['Duże łóżko podwójne', 'Prywatna łazienka', 'Patio z widokiem', 'Szafa', 'Wi-Fi'],
    image: '/images/rooms/pokoj-granatowy-lozko.jpeg',
    images: [
      '/images/rooms/pokoj-granatowy-lozko.jpeg',
      '/images/rooms/jadalnia-stol-okna-lukowe1.jpeg',
      '/images/rooms/kuchnia-zabudowa1.jpeg',
    ],
    details: {
      bedrooms: [
        '1 duże łóżko podwójne',
      ],
      livingRoom: 'Patio z widokiem na rzekę',
      kitchen: 'Wspólna kuchnia: zmywarka, lodówka, piekarnik, płyta kuchenna, stół jadalny',
      bathrooms: 'Prywatna łazienka z prysznicem, suszarką do włosów, ręcznikami',
      outdoor: 'Patio z widokiem na rzekę, ogród, miejsce na piknik, grill'
    }
  },
  {
    id: 'jednoosobowy',
    name: 'Mały pokój jednoosobowy',
    description: 'Przytulny pokój jednoosobowy z łóżkiem pojedynczym. Wyposażony w szafę i pościel. Prywatna łazienka z prysznicem. Idealny dla osób podróżujących solo, ceniących ciszę i kontakt z naturą.',
    capacity: '1 osoba',
    amenities: ['Łóżko pojedyncze', 'Prywatna łazienka', 'Szafa', 'Wi-Fi'],
    image: '/images/rooms/salon-kanapa-kominek-widok.jpeg',
    images: [
      '/images/rooms/salon-kanapa-kominek-widok.jpeg',
      '/images/rooms/salon-kanapa-widok1.jpeg',
      '/images/rooms/salon-kanapa-kominek-panorama.jpeg',
    ],
    details: {
      bedrooms: [
        '1 łóżko pojedyncze',
      ],
      livingRoom: 'Widok na ogród i dziedziniec',
      kitchen: 'Wspólna kuchnia: zmywarka, lodówka, piekarnik, płyta kuchenna, stół jadalny',
      bathrooms: 'Prywatna łazienka z prysznicem, suszarką do włosów, ręcznikami',
      outdoor: 'Ogród, miejsce na piknik, grill'
    }
  },
  {
    id: 'willa',
    name: 'Willa z 1 sypialnią',
    description: 'Przestronna willa z jedną sypialnią, dużym salonem i pięknym ogrodem. Idealna dla par lub rodzin szukających prywatności i przestrzeni. Bezpośredni dostęp do ogrodu z widokiem na rzekę i góry.',
    capacity: '2-4 osoby',
    amenities: ['Sypialnia', 'Salon', 'Prywatna łazienka', 'Ogród', 'Wi-Fi'],
    image: '/images/rooms/jadalnia-stol-okna-lukowe2.jpeg',
    images: [
      '/images/rooms/jadalnia-stol-okna-lukowe2.jpeg',
      '/images/rooms/jadalnia-kuchnia-panorama.jpeg',
      '/images/rooms/kuchnia-piekarnik-lodowka.jpeg',
    ],
    details: {
      bedrooms: [
        '1 sypialnia (łóżko podwójne)',
      ],
      livingRoom: 'Duży przestronny salon',
      kitchen: 'Wspólna kuchnia: zmywarka, lodówka, piekarnik, płyta kuchenna, stół jadalny',
      bathrooms: 'Prywatna łazienka z prysznicem, suszarką do włosów, ręcznikami',
      outdoor: 'Piękny ogród, widok na rzekę i góry, taras'
    }
  },
];

export const opinions = [
  {
    id: 1,
    author: 'Janusz',
    roomType: 'Mały pokój jednoosobowy',
    date: 'Sierpień 2026',
    quote: 'Położenie, rozmiar pomieszczeń, wyposażenie kuchni, duuży salon, taras. Brak minusów',
    rating: 9.0,
  },
  {
    id: 2,
    author: 'Miśkowiec',
    roomType: 'Mały pokój jednoosobowy',
    date: 'Sierpień 2026',
    quote: 'Super okolica. Cisza i spokój. Domek nad rzeką przed zalesionym wzgórzem. W pełni wyposażona kuchnia',
    rating: 9.0,
  },
  {
    id: 3,
    author: 'Jacek',
    roomType: 'Mały pokój jednoosobowy',
    date: 'Sierpień 2026',
    quote: 'Cisza i spokój, rzeka obok. Czysto i dużo miejsca.',
    rating: 10,
  },
  {
    id: 4,
    author: 'Kamil',
    roomType: 'Pokój Dwuosobowy typu Deluxe',
    date: 'Czerwiec 2026',
    quote: 'Urokliwe miejsce nad strumykiem, przemili właściciele, pokoje zadbane i komfortowe...',
    rating: 10,
  },
  {
    id: 5,
    author: 'Maciek',
    roomType: 'Mały pokój jednoosobowy',
    date: 'Maj 2026',
    quote: 'Cisza i spokój dostęp do rzeki, parking',
    rating: 10,
  },
  {
    id: 6,
    author: 'Teresa',
    roomType: 'Willa z 1 sypialnią',
    date: 'Sierpień 2025',
    quote: 'Miejsce bardzo urokliwe, duży przestronny dom z pięknym ogrodem. Lokalizacja i metraż',
    rating: 10,
  },
  {
    id: 7,
    author: 'Monika',
    roomType: 'Willa z 1 sypialnią',
    date: 'Czerwiec 2025',
    quote: 'Fantastyczna lokalizacja, przestronny dom i ogród...',
    rating: 9.0,
  },
  {
    id: 8,
    author: 'Krzysiek',
    roomType: 'Pokój Dwuosobowy typu Deluxe',
    date: 'Wrzesień 2026',
    quote: 'Fajna lokalizacja nad samą rzeką, miejsce do grillowania. Zbyt miękkie łóżka. nie załączone ogrzewanie.',
    rating: 7.0,
  },
];

export const attractions = [
  {
    id: 'bieszczadzki-park-narodowy',
    title: 'Bieszczadzki Park Narodowy',
    description: 'Najpiękniejsze szlaki górskie i połoniny, zaledwie 8 km od obiektu Zamek.',
    link: '/blog/bieszczadzki-park-narodowy',
    image: '/images/about/ogrod-widok-gory-jesien.jpeg',
  },
  {
    id: 'zapora-solina',
    title: 'Zapora Wodna w Solinie',
    description: 'Największa zapora wodna w Polsce, oddalona o 15 km od obiektu.',
    link: '/blog/zapora-solina',
    image: '/images/about/ogrod-drzewo-hustawka-jesien.jpeg',
  },
  {
    id: 'kolej-lesna',
    title: 'Bieszczadzka Kolej Leśna',
    description: 'Unikalna atrakcja turystyczna, historyczna kolej leśna w odległości 22 km.',
    link: '/blog/kolej-lesna',
    image: '/images/about/okolica-droga-gory-jesien.jpeg',
  },
];

export const faqData = [
  {
    question: 'Jakie są godziny zameldowania i wymeldowania?',
    answer: 'Zameldowanie: od 15:00 do 18:00. Wymeldowanie: od 08:00 do 11:00.',
  },
  {
    question: 'Czy akceptujecie zwierzęta?',
    answer: 'Tak, zwierzęta są akceptowane. Mogą obowiązywać dodatkowe opłaty — prosimy o informację podczas rezerwacji.',
  },
  {
    question: 'Czy w obiekcie jest parking?',
    answer: 'Tak, zapewniamy bezpłatny prywatny parking na terenie obiektu dla wszystkich naszych gości.',
  },
  {
    question: 'Czy w obiekcie jest kuchnia?',
    answer: 'Tak, do dyspozycji gości jest wspólna kuchnia wyposażona w zmywarkę, lodówkę, piekarnik, płytę kuchenną oraz stół jadalny.',
  },
  {
    question: 'Czy można palić w obiekcie?',
    answer: 'Nie, w całym obiekcie obowiązuje całkowity zakaz palenia.',
  },
  {
    question: 'Czy akceptujecie płatność gotówką?',
    answer: 'Nie, gotówka nie jest akceptowana. Prosimy o płatność przelewem lub kartą.',
  },
  {
    question: 'Czy w obiekcie jest cisza nocna?',
    answer: 'Tak, cisza nocna obowiązuje od 22:00 do 06:00.',
  },
  {
    question: 'Czy dzieci są akceptowane?',
    answer: 'Tak, dzieci są akceptowane w każdym wieku. Nie ma ograniczeń wiekowych przy zameldowaniu. Uwaga: brak łóżeczek dziecięcych i dodatkowych łóżek.',
  },
];
