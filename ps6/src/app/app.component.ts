import { Component } from '@angular/core';
import mockData from './mock-data.json';

interface Pokemon {
  id: number;
  name: string;
  abilities: Ability[];
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Your Angular App';
  data: Pokemon = { id: 0, name: '', abilities: [] };  
  showData = false;

  fetchData() {
    this.data = (mockData as any).data as Pokemon;
    this.showData = true;
  }
}
