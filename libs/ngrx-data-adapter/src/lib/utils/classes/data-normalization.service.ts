import { Injectable } from "@angular/core";
import { reduceFlat, reduceGraph } from "ngrx-entity-relationship";

@Injectable()
export class DataNormalizationService {
  constructor() { }
  reduceFlat(payload: {
    data: any;
    selector: any;
  }) {
    return reduceFlat(payload);
  }
  reduceGraph(payload: {
    data: any;
    selector: any;
  }) {
    return reduceGraph(payload);
  }
}
