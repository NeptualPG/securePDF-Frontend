import type { Language } from '../i18n';

const messages: Record<Language, Record<string, string>> = {
  en: {
    EMPTY_FILE: 'That file is empty. Choose a file with content and try again.',
    CORRUPT_FILE: 'That file appears damaged or does not match its extension.',
    PASSWORD_PROTECTED: 'This file is password-protected. Remove the password and try again.',
    UNSUPPORTED_FORMAT: 'This file type or conversion is not supported yet.',
    PAYLOAD_TOO_LARGE: 'That file is too large. The maximum upload size is 25 MB.',
    CONVERSION_TIMEOUT: 'This file is taking too long to convert. Try a smaller file.',
    INVALID_OPTIONS: 'The conversion options are invalid. Please try again.',
  },
  es: {
    EMPTY_FILE: 'El archivo está vacío. Elige un archivo con contenido e inténtalo de nuevo.',
    CORRUPT_FILE: 'El archivo parece dañado o no coincide con su extensión.',
    PASSWORD_PROTECTED: 'Este archivo está protegido con contraseña. Quita la contraseña e inténtalo de nuevo.',
    UNSUPPORTED_FORMAT: 'Este tipo de archivo o conversión todavía no es compatible.',
    PAYLOAD_TOO_LARGE: 'El archivo es demasiado grande. El tamaño máximo es de 25 MB.',
    CONVERSION_TIMEOUT: 'El archivo está tardando demasiado. Prueba con un archivo más pequeño.',
    INVALID_OPTIONS: 'Las opciones de conversión no son válidas. Inténtalo de nuevo.',
  },
};

export function friendlyError(code?: string, language: Language = 'en'): string {
  const fallback = language === 'es'
    ? 'No se pudo convertir el archivo. Inténtalo de nuevo.'
    : 'We could not convert that file. Please try again.';
  return (code && messages[language][code]) || fallback;
}
