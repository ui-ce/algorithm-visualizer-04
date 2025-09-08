import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'web-player',
  imports: [FormsModule, KnobModule, SliderModule, ButtonModule],
  templateUrl: './web-player.html',
  styleUrl: './web-player.scss',
})
export class WebPlayer implements OnDestroy {
  @Input()
  public animationLength: number;

  @Input()
  public frameIndex: number = 0;

  @Input()
  public frameTime: number = 200;

  @Output()
  public frameIndexChange: EventEmitter<number> = new EventEmitter<number>();

  protected playing: boolean = false;

  private _timer: ReturnType<typeof setInterval>;

  public ngOnDestroy(): void {
    this.stop();
  }

  public play(): void {
    if (!this.animationLength) {
      return;
    }

    this.playing = true;
    this._timer = setInterval(() => this.next(), this.frameTime);
  }

  public stop(): void {
    this.playing = false;
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  public togglePlay(): void {
    if (this.playing) {
      this.stop();
      return;
    }

    this.play();
  }

  public next(): void {
    this.frameIndex = Math.min(this.frameIndex + 1, this.animationLength - 1);
    this.frameIndexChange.emit(this.frameIndex);

    if (this.frameIndex === this.animationLength - 1) {
      this.stop();
    }
  }

  public prev(): void {
    if (!this.animationLength) {
      return;
    }

    this.frameIndex = Math.max(this.frameIndex - 1, 0);
    this.frameIndexChange.emit(this.frameIndex);
  }

  public first(): void {
    this.frameIndex = 0;
    this.frameIndexChange.emit(this.frameIndex);
  }

  public last(): void {
    if (!this.animationLength) {
      return;
    }

    this.frameIndex = this.animationLength - 1;
    this.frameIndexChange.emit(this.frameIndex);
  }

  protected onFrameTimeChanged(frameTime: number): void {
    this.frameTime = frameTime;

    if (!this.playing) {
      return;
    }

    clearInterval(this._timer);
    this._timer = setInterval(() => this.next(), this.frameTime);
  }

  protected onFrameIndexChanged(frameIndex: number) {
    this.frameIndex = frameIndex;
    this.frameIndexChange.emit(this.frameIndex);
  }
}
