import { Pipe, Sanitizer, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
