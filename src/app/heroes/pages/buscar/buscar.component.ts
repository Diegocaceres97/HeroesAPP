import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: any = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | any;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino).subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent){
    if(!evento.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = evento.option.value;
    this.heroesService.getHeroesID(heroe.id).subscribe(heroes => this.heroeSeleccionado= heroes);
    console.log(this.heroeSeleccionado);
    this.termino = heroe.superhero;
  }

}
