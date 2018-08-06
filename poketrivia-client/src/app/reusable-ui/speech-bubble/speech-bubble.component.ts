import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkt-speech-bubble',
  templateUrl: './speech-bubble.component.html',
  styleUrls: ['./speech-bubble.component.scss']
})
export class SpeechBubbleComponent {

  @Input() text;

}
