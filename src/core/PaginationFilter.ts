/**
 * Represents the pagination filter.
 * @class
 */
export class PaginationFilter {
  /** Represents the sort filter @property {any} */
  filter?: any;

  /** Represents the sort filter @property {string} */
  sort?: string;

  /** Represents the page number @property {number} */
  page: number;

  /** Represents the page limit @property {number} */
  limit: number;
}
