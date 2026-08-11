import { MenuItem } from '../../shared/menu-item';

export const lanches: MenuItem[] = [
  {
    name: 'Coxinha de Frango',
    photo: 'images/salgados/coxinha.jpg',
    tagline: 'Crocante por fora, cremosa por dentro',
    description:
      'Massa lisinha empanada e frita até ficar bem crocante, recheada com frango desfiado cremoso com catupiry — o salgadinho queridinho de qualquer padaria.',
    priceWhole: 'R$ 8,00',
    priceWholeLabel: 'Unidade',
    priceSlice: 'R$ 84,00',
    priceSliceLabel: 'Dúzia',
    ingredients: 'Frango desfiado e catupiry',
  },
  {
    name: 'Cuscuz Paulista',
    photo: 'images/salgados/cuscuz.jpg',
    tagline: 'Completo e cheio de sabor',
    description:
      'Cuscuz de milho temperado, prensado e servido com um ovo frito por cima — uma opção completa e caseira para o café da manhã ou lanche da tarde.',
    priceWhole: 'R$ 15,00',
    priceWholeLabel: 'Porção',
    ingredients: 'Milho e ovo frito',
  },
  {
    name: 'Misto Especial',
    photo: 'images/salgados/misto.jpg',
    tagline: 'Quentinho e derretido',
    description:
      'Pão de forma grelhado na chapa até ficar crocante, recheado com queijo derretido, pimentões e milho — simples, quente e reconfortante.',
    priceWhole: 'R$ 12,00',
    priceWholeLabel: 'Unidade',
    ingredients: 'Queijo, pimentão e milho',
  },
  {
    name: 'Sanduíche de Frango Grelhado',
    photo: 'images/salgados/sanduiche.jpg',
    tagline: 'Suculento e bem recheado',
    description:
      'Pão francês crocante recheado com frango grelhado suculento, queijo derretido, alface e molho especial — um lanche completo para matar a fome.',
    priceWhole: 'R$ 18,00',
    priceWholeLabel: 'Unidade',
    ingredients: 'Frango grelhado, queijo e molho especial',
  },
];
