/**
 * TypeScript declarations for the PageClip library
 */

interface PageclipOptions {
  onSubmit?: (event: Event) => boolean | void;
  onResponse?: (error: Error | null, response: any) => boolean | void;
  successTemplate?: string;
}

interface PageclipStatic {
  form: (form: HTMLFormElement, options?: PageclipOptions) => void;
  send: (siteKey: string, formName: string, data: any, callback: (error: Error | null, response: any) => void) => void;
}

interface Window {
  Pageclip: PageclipStatic;
} 