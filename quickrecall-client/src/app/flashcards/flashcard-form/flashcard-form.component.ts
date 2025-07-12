import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flashcard-form',
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
})
export class FlashcardFormComponent implements OnInit {
  form: FormGroup;
  deckId!: string;
  flashcardId: string | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('deckId')!;
    this.flashcardId = this.route.snapshot.paramMap.get('flashcardId');

    if (this.flashcardId) {
      this.isEdit = true;
      this.flashcardService.getFlashcards(this.deckId)
        .subscribe(card => this.form.patchValue(card));
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.flashcardService.updateFlashcard(this.flashcardId!, this.form.value)
        .subscribe(() => this.router.navigate(['/decks', this.deckId, 'flashcards']));
    } else {
      this.flashcardService.createFlashcard(this.deckId, this.form.value)
        .subscribe(() => this.router.navigate(['/decks', this.deckId, 'flashcards']));
    }
  }
}
