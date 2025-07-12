import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FlashcardService {
  private API = 'https://quickrecall-server.onrender.com';

  constructor(private http: HttpClient) {}

  getFlashcards(deckId: string) {
    return this.http.get<any[]>(`${this.API}/${deckId}`);
  }

  createFlashcard(deckId: string, data: any) {
    return this.http.post(`${this.API}/${deckId}`, data);
  }

  updateFlashcard(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data); 
  }

  deleteFlashcard(id: string) {
    return this.http.delete(`${this.API}/${id}`); 
  }
}
