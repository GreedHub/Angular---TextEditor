import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {

  @Output() toggleStyleEmitter = new EventEmitter();

  toggleStyle(tagName:string){
    this.toggleStyleEmitter.emit(tagName);
  }
}
