import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(
   private wsService: WebsocketService
  ) { }

  public escucharMensajeBroadcast(idMensaje: string): Observable<unknown>{
    return this.wsService.listen(idMensaje);
  }
}
