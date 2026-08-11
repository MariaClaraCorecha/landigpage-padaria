import { MenuItem } from '../../shared/menu-item';

export const drinks: MenuItem[] = [
  {
    name: 'Soda Italiana',
    photo: 'images/bebidas/bebidas/drink4.jpg',
    tagline: 'Colorida e borbulhante',
    description:
      'Água com gás e xarope aromático, servida bem gelada com folhas de hortelã — escolha o seu sabor favorito no seletor abaixo.',
    priceWhole: 'R$ 14,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Água com gás, xarope aromático e hortelã',
    flavors: ['Blue Curaçao', 'Maçã Verde', 'Frutas Vermelhas'],
  },
  {
    name: 'Spritz de Frutas',
    photo: 'images/bebidas/bebidas/drink3.jpg',
    tagline: 'Refrescante e aromático',
    description:
      'Drink sem álcool com toque cítrico, alecrim e um garnish de abacaxi — leve, borbulhante e cheio de sabor.',
    priceWhole: 'R$ 16,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Suco cítrico, água tônica, alecrim e abacaxi',
  },
  {
    name: 'Chá Gelado Especial',
    photo: 'images/bebidas/bebidas/drink2.jpg',
    tagline: 'Encorpado e aromático',
    description:
      'Chá preto gelado com toque de frutas e finalizado com folhas de hortelã fresca — encorpado, equilibrado e refrescante.',
    priceWhole: 'R$ 13,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Chá preto, frutas e hortelã',
  },
  {
    name: 'Refresco de Morango',
    photo: 'images/bebidas/bebidas/drinkmorango.jpg',
    tagline: 'Doce e cheio de fruta',
    description:
      'Morangos frescos triturados com água gelada e um toque de açúcar — a cara do verão em um copo.',
    priceWhole: 'R$ 15,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Morango fresco e açúcar',
  },
];
