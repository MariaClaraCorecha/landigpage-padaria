import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Cake {
  name: string;
  photo: string;
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
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Cenoura com Chocolate',
      photo: 'images/doces/bolos/bolo_cenourachocolate.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Coco',
      photo: 'images/doces/bolos/bolo_coco.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Laranja',
      photo: 'images/doces/bolos/bolo_laranja.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo Mármore',
      photo: 'images/doces/bolos/bolo_marmore.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo de Morango',
      photo: 'images/doces/bolos/bolo_morango.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
    {
      name: 'Bolo Red Velvet',
      photo: 'images/doces/bolos/bolo_redvelvet.jpg',
      description: 'Descrição breve do bolo.',
      priceWhole: 'R$ 00,00',
      priceSlice: 'R$ 0,00',
      ingredients: 'Principais ingredientes aqui',
    },
  ];
}
