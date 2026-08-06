import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Cake {
  name: string;
  photo: string;
  tagline: string;
  description: string;
  priceWhole: string;
  priceSlice: string;
  ingredients: string;
}

@Component({
  selector: 'app-doces',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './doces.html',
  styleUrl: './doces.scss',
})
export class Doces {
  protected readonly cakes: Cake[] = [
    {
      name: 'Bolo de Chocolate',
      photo: 'images/doces/bolos/bolo_chocolate.jpg',
      tagline: 'Intenso e irresistível',
      description:
        'Camadas macias de chocolate com recheio cremoso e cobertura brilhante — um clássico que conquista à primeira mordida.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Cenoura com Chocolate',
      photo: 'images/doces/bolos/bolo_cenourachocolate.jpg',
      tagline: 'O combo perfeito',
      description:
        'Massa fofinha de cenoura com uma generosa cobertura de chocolate cremoso. Simples, afetivo e sempre gostoso.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Coco',
      photo: 'images/doces/bolos/bolo_coco.jpg',
      tagline: 'Refrescante e aconchegante',
      description:
        'Massa leve com coco fresco e um toque de leite condensado, para quem ama um doce suave e cheiroso.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Laranja',
      photo: 'images/doces/bolos/bolo_laranja.jpg',
      tagline: 'Suave e cítrico',
      description:
        'Massa fofa com sabor natural de laranja e calda cítrica — leve, perfumado e perfeito para qualquer hora do dia.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo Mármore',
      photo: 'images/doces/bolos/bolo_marmore.jpg',
      tagline: 'O melhor dos dois mundos',
      description:
        'Massas de baunilha e chocolate mescladas em cada fatia — ideal para quem não sabe escolher só um sabor.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Morango',
      photo: 'images/doces/bolos/bolo_morango.jpg',
      tagline: 'Fresquinho e delicado',
      description:
        'Massa macia com morangos frescos e um toque adocicado — leve, colorido e cheio de sabor em cada fatia.',
      priceWhole: 'R$ 250,00 (médio)',
      priceSlice: 'R$ 10,00',
      ingredients: 'Morango',
    },
    {
      name: 'Bolo Red Velvet',
      photo: 'images/doces/bolos/bolo_redvelvet.jpg',
      tagline: 'Elegante e aveludado',
      description:
        'Massa aveludada com um toque de cacau e cobertura de cream cheese — sofisticado, macio e surpreendente.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
  ];
}
