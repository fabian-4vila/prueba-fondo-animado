import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-matrix-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class MatrixBackgroundComponent implements AfterViewInit, OnDestroy {
  private resizeListener = () => this.resizeCanvas();

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private fontSize = 14;
  private letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?~:"';
  private drops: number[] = [];
  private intervalId: any;

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeListener);

    this.intervalId = setInterval(() => this.draw(), 33);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.resizeListener);
  }

  private resizeCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    const columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(columns).fill(1);
  }

  private draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#0F0';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.letters[Math.floor(Math.random() * this.letters.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }
}

