export interface DataTablesParameters {
  columns: any[];
  draw: number;
  length: number;
  order: { column: number; dir: 'desc' | 'asc' }[];
  start: 0;
}
