import { MenuItem } from '../../shared/menu-item';

export const geladas: MenuItem[] = [
  {
    name: 'Suco de Frutas Naturais',
    photo: 'images/bebidas/bebidas/sucofrutas.jpg',
    tagline: 'Fresquinho e feito na hora',
    description:
      'Sucos naturais, sem adição de açúcar, batidos na hora e servidos bem gelados. Escolha o seu sabor favorito no seletor abaixo.',
    priceWhole: 'R$ 8,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Frutas selecionadas, conforme o sabor escolhido',
    flavors: ['Maracujá', 'Goiaba', 'Uva', 'Laranja', 'Pitaya', 'Acerola'],
  },
  {
    name: 'Milkshake',
    photo: 'images/bebidas/bebidas/milkshake.jpg',
    tagline: 'Cremoso e generoso',
    description:
      'Milkshake bem cremoso, batido na hora e finalizado com uma cobertura especial. Escolha o seu sabor favorito no seletor abaixo.',
    priceWhole: 'R$ 15,00',
    priceWholeLabel: 'Copo',
    ingredients: 'Sorvete, leite e cobertura conforme o sabor escolhido',
    flavors: ['Chocolate', 'Morango', 'Baunilha com Chocolate', 'Baunilha com Doce de Leite'],
  },
  {
    name: 'Coca Cola',
    photo: 'images/bebidas/bebidas/refrigerante.jpg',
    tagline: 'Geladinho na medida certa',
    description:
      'Refrigerante servido bem gelado para acompanhar seu lanche. Escolha o seu sabor favorito no seletor abaixo.',
    priceWhole: 'R$ 6,00',
    priceWholeLabel: 'Lata',
    ingredients: 'Coca-Cola ou Coca Zero, conforme o sabor escolhido',
    flavors: ['Coca-Cola', 'Coca Cola Zero'],
  },
  {
    name: 'Água Mineral',
    photo: 'images/bebidas/bebidas/agua.jpg',
    tagline: 'Simples e essencial',
    description: 'Água mineral gelada, com ou sem gás, para matar a sede a qualquer hora.',
    priceWhole: 'R$ 2,00',
    priceWholeLabel: 'Garrafa',
    ingredients: 'Água mineral',
  },
];
