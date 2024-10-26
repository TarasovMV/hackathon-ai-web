import {inject, Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:5000'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly zone = inject(NgZone);

  startCall(): Observable<any> {
    return this.http.post(`${API_URL}/start`, {})
  }

  chatStream(): Observable<any> {
    return this.getServerSentEvent(`${API_URL}/stream`);
  }

  // Метод для создания подключения через EventSource и возврата Observable
  private getServerSentEvent<T>(url: string): Observable<T> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      // Когда сервер отправляет сообщение, его обрабатываем
      eventSource.onmessage = event => {
        // Обрабатываем событие в зоне Angular, чтобы обновления корректно отобразились в UI
        this.zone.run(() => {
          observer.next(event.data);
        });
      };

      // Обрабатываем ошибки
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };

      // Очищаем EventSource при завершении
      return () => {
        eventSource.close();
      };
    });
  }
}
