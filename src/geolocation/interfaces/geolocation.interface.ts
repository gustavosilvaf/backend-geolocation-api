import { ValidationError, ValidatorOptions } from 'class-validator';

export interface Locale {
  locale: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  enableDebugMessages: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
