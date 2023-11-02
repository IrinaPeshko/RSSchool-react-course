export interface SpellsRequest {
  data: SpellsRequestData[];
  links: SpellsRequestLinks;
  meta: SpellsRequestMeta;
}

export interface SpellsRequestData {
  attributes: AttributesSpells;
  id: string;
  links: { self: string };
  type: string;
}

export interface SpellsRequestLinks {
  current: string;
  last: string;
  next: string;
  self: string;
}

export interface SpellsRequestMeta {
  copyright: string;
  generated_at: string;
  pagination: {
    current: number;
    last?: number;
    next?: number;
    records: number;
  };
}

export interface AttributesSpells {
  category: string; // Категория этого заклинания.
  creator: string; // Создатель этого заклинания.
  effect: string; // Эффект этого заклинания.
  hand: string; // Движение руки этого заклинания.
  image: string; // Ссылка на изображение этого заклинания.
  incantation: string; // Заклинание этого заклинания.
  light: string; // Свет этого заклинания.
  name: string; // Название этого заклинания.
  slug: string; // id
  wiki: string; // Ссылка на вики-страницу
}
