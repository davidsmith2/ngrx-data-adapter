import { Address } from "@ngrx-data-adapter/api-interfaces";
import { AddressDao } from "./address.dao";

export const ADDRESS_DATA: Array<AddressDao> = [
  {
    id: 300,
    street: '1 Hacker Way',
    city: 'Menlo Park',
    country: 'USA',
    company: 200
  },
  {
    id: 301,
    street: '410 Terry Ave N',
    city: 'Seattle',
    country: 'USA',
    company: 201
  },
  {
    id: 302,
    street: '121 Albright Way',
    city: 'Los Gatos',
    country: 'USA',
    company: 202
  },
  {
    id: 303,
    street: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    country: 'USA',
    company: 203
  },
  {
    id: 304,
    street: '3500 Deer Creek Road',
    city: 'Palo Alto',
    country: 'USA',
    company: 204
  },
  {
    id: 305,
    street: 'Rocket Road',
    city: 'Hawthorne',
    country: 'USA',
    company: 205
  }
]
