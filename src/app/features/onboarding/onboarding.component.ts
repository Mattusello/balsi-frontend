import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FaceShape {
  id: string;
  label: string;
  description: string;
  svgPath: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  step = signal(1);
  selectedShape = signal<string | null>(null);

  faceShapes: FaceShape[] = [
    {
      id: 'ovale',
      label: 'Ovale',
      description: 'Equilibrato e versatile',
      svgPath: 'M50,10 C75,10 90,28 90,50 C90,72 75,90 50,90 C25,90 10,72 10,50 C10,28 25,10 50,10Z',
    },
    {
      id: 'quadrato',
      label: 'Quadrato',
      description: 'Mascella forte e definita',
      svgPath: 'M15,12 L85,12 Q88,12 88,15 L88,85 Q88,88 85,88 L15,88 Q12,88 12,85 L12,15 Q12,12 15,12Z',
    },
    {
      id: 'rotondo',
      label: 'Rotondo',
      description: 'Guance morbide e armoniose',
      svgPath: 'M50,8 C73,8 92,27 92,50 C92,73 73,92 50,92 C27,92 8,73 8,50 C8,27 27,8 50,8Z',
    },
  ];

  select(id: string) {
    this.selectedShape.set(id);
  }

  next() {
    if (this.selectedShape()) {
      this.step.set(2);
    }
  }
}
