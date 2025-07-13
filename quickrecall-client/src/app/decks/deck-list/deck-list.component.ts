
import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DeckListComponent implements OnInit {
  decks: any[] = [];
  form: FormGroup;
  editingDeck: string | null = null;
  showCreateForm: boolean = false;

  constructor(private deckService: DeckService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadDecks();
  }

  loadDecks() {
    this.deckService.getDecks().subscribe({
      next: (res: any) => {
        this.decks = res;
      },
      error: (err) => {
        console.error('Error fetching decks:', err);
      }
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    if (this.editingDeck) {
      this.deckService.updateDeck(this.editingDeck, this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.editingDeck = null;
          this.loadDecks();
        },
        error: (err: any) => {
          console.error('Error updating deck:', err);
        }
      });
    } else {
      this.deckService.createDeck(this.form.value).subscribe({
        next: () => {
          this.form.reset();
          this.showCreateForm = false;
          this.loadDecks();
        },
        error: (err: any) => {
          console.error('Error creating deck:', err);
        }
      });
    }
  }

  editDeck(deck: any) {
    this.editingDeck = deck._id;
    this.showCreateForm = true;
    this.form.patchValue({
      name: deck.name,
      description: deck.description
    });
  }

  cancelEdit() {
    this.form.reset();
    this.editingDeck = null;
    this.showCreateForm = false;
  }

  deleteDeck(id: string) {
    if (confirm('Are you sure you want to delete this deck?')) {
      this.deckService.deleteDeck(id).subscribe(() => this.loadDecks());
    }
  }
}
