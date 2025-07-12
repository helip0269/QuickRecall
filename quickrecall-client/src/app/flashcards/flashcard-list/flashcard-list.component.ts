// src/app/flashcards/flashcard-list/flashcard-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss'],
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    MaterialModule,
    NgIf,
    NgFor]
})
export class FlashcardListComponent implements OnInit {
  deckId!: string;
  flashcards: any[] = [];
  form: FormGroup;
  editingCardId: string | null = null;
  showCreateForm = false;


  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      front: [''],
      back: ['']
    });
  }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('deckId')!;
    this.loadFlashcards();
  }

loadFlashcards() {
  this.flashcardService.getFlashcards(this.deckId).subscribe({
  next: (res: any) => {
    this.flashcards = res;
    console.log('Loaded flashcards:', this.flashcards);
  },
  error: (err) => {
    console.error('Error loading flashcards:', err);
  }
});
}


submitForm() {
  if (this.editingCardId) {
    this.flashcardService.updateFlashcard(this.editingCardId!, this.form.value).subscribe(() => {
      this.loadFlashcards();
      this.form.reset();
      this.editingCardId = null;
    });
  } else {
    this.flashcardService.createFlashcard(this.deckId, this.form.value).subscribe(() => {
      this.loadFlashcards();
      this.showCreateForm = false;
      this.form.reset();
    });
  }
}
  edit(card: any) {
    this.editingCardId = card._id;
   this.form.patchValue({ front: card.front, back: card.back });
  }

toggleFlip(card: any) {
  this.editingCardId = card._id === this.editingCardId ? null : card._id;
}


delete(id: string) {
  if (confirm('Are you sure you want to delete this flashcard?')) {
    this.flashcardService.deleteFlashcard(id).subscribe(() => {
      this.loadFlashcards();
    });
  }
}     

  cancelEdit() {
    this.form.reset();
    this.editingCardId = null;
  }
}

