// src/app/decks/deck.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DeckService {
  private API = 'http://localhost:5000/api/decks';

  constructor(private http: HttpClient) {}

  createDeck(data: { name: string; description?: string }) {
    return this.http.post(this.API, data); // use full API
  }

  getDecks() {
    return this.http.get<any[]>(this.API);
  }

  updateDeck(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteDeck(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
