export type Error = string;
export type Errors = Error[];
/* Nested error type
export type FormError<T> = T extends any[]
  ? T[number] extends object
    ? FormErrors<T[number]>
    : Errors
  : T extends object
  ? FormErrors<T>
  : Errors;
*/
/* Dumbed down error type */
export type FormError<T> = Errors;
export type FormErrors<T> = {
  [K in keyof T]?: FormError<T[K]>;
};
