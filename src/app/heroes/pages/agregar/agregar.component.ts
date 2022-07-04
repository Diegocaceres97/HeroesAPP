import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius:5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService, private activateRoute: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroesID(id)))
      .subscribe((heroe: any) => this.heroe = heroe);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(resp => this.mostrarSnackbar('Registro actualizado'));
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnackbar('Registro creado');
      });
    }
  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroes(this.heroe.id).subscribe(resp => this.router.navigate(['/heroes']))
        }
      }
    )

  }

  mostrarSnackbar(mensaje: string): void {

    this.snackBar.open(mensaje, 'ok!', {
      duration: 3000
    });

  }

}
