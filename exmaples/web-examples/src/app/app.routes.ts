import { Routes } from '@angular/router';
import { BinarySearch } from './components/binary-search/binary-search';
import { Home } from './components/home/home';
import { MergeSort } from './components/merge-sort/merge-sort';
import { BubbleSort } from './components/bubble-sort/bubble-sort';
import { Dijkstra } from './components/dijkstra/dijkstra';
import { Dfs } from './components/dfs/dfs';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'dfs',
    component: Dfs,
  },
  {
    path: 'dijkstra',
    component: Dijkstra,
  },
  {
    path: 'merge-sort',
    component: MergeSort,
  },
  {
    path: 'bubble-sort',
    component: BubbleSort,
  },
  {
    path: 'binary-search',
    component: BinarySearch,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
