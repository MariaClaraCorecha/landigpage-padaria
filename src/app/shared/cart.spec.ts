import { TestBed } from '@angular/core/testing';
import { Cart, parseBrlPrice } from './cart';
import { MenuItem } from './menu-item';

const bolo: MenuItem = {
  name: 'Bolo de Chocolate',
  photo: 'images/bolo.webp',
  tagline: '',
  description: '',
  priceWhole: 'R$ 250,00',
  priceSlice: 'R$ 12,00',
  ingredients: '',
};

const cafe: MenuItem = {
  name: 'Café Preto',
  photo: 'images/cafe.webp',
  tagline: '',
  description: '',
  priceWhole: 'R$ 6,00',
  priceWholeLabel: 'Xícara',
  ingredients: '',
};

describe('parseBrlPrice', () => {
  it('converte valores em reais para número', () => {
    expect(parseBrlPrice('R$ 12,00')).toBe(12);
    expect(parseBrlPrice('R$ 0,80')).toBe(0.8);
    expect(parseBrlPrice('R$ 1.200,50')).toBe(1200.5);
  });

  it('retorna 0 para texto sem número', () => {
    expect(parseBrlPrice('sob consulta')).toBe(0);
  });
});

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    localStorage.clear();
    cart = TestBed.inject(Cart);
  });

  it('começa vazio', () => {
    expect(cart.items()).toEqual([]);
    expect(cart.itemCount()).toBe(0);
    expect(cart.total()).toBe(0);
  });

  it('agrupa o mesmo item, tipo de preço e sabor em uma linha', () => {
    cart.add(bolo, 'slice');
    cart.add(bolo, 'slice');

    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0].quantity).toBe(2);
  });

  it('separa linhas por tipo de preço e por sabor', () => {
    cart.add(bolo, 'whole');
    cart.add(bolo, 'slice');
    cart.add(cafe, 'whole', 'Sem açúcar');
    cart.add(cafe, 'whole', 'Com açúcar');

    expect(cart.items()).toHaveLength(4);
  });

  it('calcula total e quantidade de itens', () => {
    cart.add(bolo, 'whole');
    cart.add(bolo, 'slice');
    cart.add(bolo, 'slice');
    cart.add(cafe, 'whole');

    expect(cart.itemCount()).toBe(4);
    expect(cart.total()).toBe(250 + 12 * 2 + 6);
  });

  it('usa o preço inteiro quando o item não tem preço de fatia', () => {
    cart.add(cafe, 'slice');

    expect(cart.unitPrice(cart.items()[0])).toBe(6);
  });

  it('atualiza a quantidade e remove a linha ao chegar em zero', () => {
    cart.add(cafe, 'whole');
    cart.updateQuantity(cart.items()[0], 3);
    expect(cart.items()[0].quantity).toBe(3);

    cart.updateQuantity(cart.items()[0], 0);
    expect(cart.items()).toEqual([]);
  });

  it('finaliza o pedido gerando um recibo e esvaziando a cestinha', () => {
    cart.add(bolo, 'slice');
    cart.add(cafe, 'whole');

    const receipt = cart.checkout();

    expect(receipt.lines).toHaveLength(2);
    expect(receipt.total).toBe(18);
    expect(receipt.orderNumber).toMatch(/^\d{4}$/);
    expect(cart.items()).toEqual([]);
  });

  it('salva a cestinha no localStorage e restaura ao recarregar', () => {
    cart.add(bolo, 'slice');
    TestBed.tick();

    TestBed.resetTestingModule();
    const reloaded = TestBed.inject(Cart);

    expect(reloaded.items()).toHaveLength(1);
    expect(reloaded.items()[0].item.name).toBe('Bolo de Chocolate');
  });
});
