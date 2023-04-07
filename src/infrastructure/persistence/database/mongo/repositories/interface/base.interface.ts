import { Observable } from 'rxjs';

export interface IBase<Model> {
  create(model: Model): Observable<Model>;
  update(_id: string, model: Model): Observable<Model>;
  delete(_id: string): Observable<Model>;
  findById(_id: string): Observable<Model>;
  findAll(): Observable<Model[]>;
}
