export const CONTACT = {
  phone: '(503) 2515-0030',
  phoneHref: 'tel:+50325150030',
  whatsapp: '50325150030',
  email: 'ventas@promaica.com',
};

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/GrupoPromaica/',
  instagram: 'https://www.instagram.com/promaica_sv/?hl=es',
  youtube: 'https://www.youtube.com/channel/UCqrOOs-_Vd9tnJFsipSEj0A',
  linkedin: 'https://sv.linkedin.com/company/promaica-el-salvador',
};

export interface DayHours {
  open: number;
  close: number;
}

// Claves: dom, lun, mar, mie, jue, vie, sab — un día ausente = cerrado
export type WeekSchedule = Partial<Record<'dom' | 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab', DayHours>>;

export interface Location {
  name: string;
  address: string;
  hours: string[];
  schedule: WeekSchedule;
  lat: number;
  lng: number;
  mapEmbedUrl: string;
  mapsUrl: string;
}

const weekdaySchedule: WeekSchedule = {
  lun: { open: 8, close: 17 },
  mar: { open: 8, close: 17 },
  mie: { open: 8, close: 17 },
  jue: { open: 8, close: 17 },
  vie: { open: 8, close: 17 },
};

export const LOCATIONS: Location[] = [
  {
    name: 'San Salvador',
    address: 'Calle Lorena y Calle Roma #170, San Salvador',
    hours: ['Lunes a Viernes: 8:00 a.m. - 5:00 p.m.', 'Sábado: 8:00 a.m. - 4:00 p.m.'],
    schedule: { ...weekdaySchedule, sab: { open: 8, close: 16 } },
    lat: 13.694118,
    lng: -89.2269268,
    mapEmbedUrl: 'https://www.google.com/maps?q=13.694118,-89.2269268&z=16&output=embed',
    mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJoTIaiUgwY48R7eLX2qeJCtA',
  },
  {
    name: 'San Miguel',
    address: 'Carretera Panamericana, 500 metros de metrocentro. Ex local Zócalo, San Miguel',
    hours: ['Lunes a Viernes: 8:00 a.m. - 5:00 p.m.', 'Sábado: 8:00 a.m. - 12:00 p.m.'],
    schedule: { ...weekdaySchedule, sab: { open: 8, close: 12 } },
    lat: 13.4645698,
    lng: -88.1693709,
    mapEmbedUrl: 'https://www.google.com/maps?q=13.4645698,-88.1693709&z=16&output=embed',
    mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ9_n0_c4re48RgDB7TnzgjSI',
  },
];

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}