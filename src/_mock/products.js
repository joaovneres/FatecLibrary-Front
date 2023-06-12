import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Vade Mecum Saraiva - Tradicional - 34ª edição 2022',
  'VADE MECUM COMPACTO - 25A EDIÇÃO 2022',
  'Mindset A nova psicologia do sucesso',
  'Mais esperto que o Diabo O mistério revelado da liberdade e do sucesso',
  'Mulheres que correm com os lobos Mitos e histórias do arquétipo da Mulher Selvagem',
  'A hipótese do amor (Sucesso do TikTok)',
  'Box Jane Austen - 3 Volumes - Emma, Mansfield Park e Abadia De Northanger - Capa Brochura',
  'Do mil ao milhão',
  'Especialista em pessoas Soluções bíblicas e inteligentes para lidar com todo tipo de gente',
  'Quem pensa enriquece - O Legado',
  'Eu e esse meu coração',
  'O Ladrão de Raios - Capa Nova (Série Percy Jackson e os Olimpianos)',
  'Tudo é rio',
  'Harry Potter e o Prisioneiro de Azkaban',
  'Sapiens (Nova edição) Uma breve história da humanidade',
  'O príncipe cruel (Vol. 1 O Povo do Ar)',
];
const PRODUCT_PRICE = [
  '168.75',
  '39.90',
  '112.49',
  '25.90',
  '51.90',
  '39.90',
  '39.90',
  '39.90',
  '63.90',
  '42.31',
  '43.90',
  '89.90',
  '39.90',
  '134.90',
  '31.90',
  '47.90',
  '41.50',
  '41.90',
  '47.90',
  '47.90',
  '44.90',
  '60.50',
  '47.90',
  '55.90',
];
const PRODUCT_PRICESALE = [
  '252.00',
  null,
  '168.00',
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  '59.90',
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  '64.90',
  null,
  null,
  null,
];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: PRODUCT_PRICE[index],
    priceSale: PRODUCT_PRICESALE[index] == null ? null : PRODUCT_PRICESALE[index],
    status: sample(['oferta', 'lançamento', '', '']),
  };
});

export default products;
