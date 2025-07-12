import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { FlashcardFormComponent } from './flashcards/flashcard-form/flashcard-form.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { DeckListComponent } from './decks/deck-list/deck-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'decks', component: DeckListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'decks/:deckId/flashcards/new', component: FlashcardFormComponent },
  { path: 'decks/:deckId/flashcards/:flashcardId/edit', component: FlashcardFormComponent },
  { path: 'decks/:deckId/flashcards', component: FlashcardListComponent },
  {path: 'decks/:deckId/flashcards', loadComponent: () => import('./flashcards/flashcard-list/flashcard-list.component')
    .then(m => m.FlashcardListComponent)
}
  
];
