import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Guest {
  maxGuests: number;
  nombre: string;
}

interface GuestsDirectory {
  [key: string]: {
    maxGuests: number;
    nombre: string;
  };
}

@Component({
  selector: 'assistance',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.scss'
})
export class AssistanceComponent implements OnInit {
  rsvpForm: FormGroup;
  loading = false;
  isValidGuest = false;
  guestNumbers: number[] = [];
  successMessage = '';
  errorMessage = '';

  private readonly BACKEND_URL = 'https://wedding-backend-tojn.onrender.com/confirm-attendance';

  private invitadosValidos: GuestsDirectory = {
    "angie-mendez": { maxGuests: 2, nombre: "Angie Mendez & José Mina" },
    "bernanda-rojas": { maxGuests: 2, nombre: "Bernarda Rojas & Eliecer Rojas" },
    "alfonso-salamanca": { maxGuests: 2, nombre: "Alfonso Salamanca" },
    "hermencia-barrera": { maxGuests: 3, nombre: "Hermencia Barrera" },
    "leonilde-barrera": { maxGuests: 2, nombre: "Leonilde Barrera" },
    "carlos-barrera": { maxGuests: 1, nombre: "Carlos Barrera" },
    "jose-barrera": { maxGuests: 3, nombre: "Jose Barrera" },
    "aura-rojas": { maxGuests: 3, nombre: "Aura Rojas" },
    "edgar-rojas": { maxGuests: 3, nombre: "Edgar Rojas" },
    "eliecer-rojas": { maxGuests: 3, nombre: "Eliecer Rojas" },
    "rocio-rojas": { maxGuests: 4, nombre: "Rocio Rojas" },
    "fernando-rojas": { maxGuests: 5, nombre: "Fernando Rojas" },
    "leidy-rojas": { maxGuests: 3, nombre: "Leidy Rojas" },
    "gonzalo-forero": { maxGuests: 1, nombre: "Gonzalo Forero" },
    "amanda-rojas": { maxGuests: 3, nombre: "Amanda Rojas" },
    "lorena-rojas": { maxGuests: 4, nombre: "Lorena Rojas" },
    "jaidelver-escamilla": { maxGuests: 3, nombre: "Jaidelver Escamilla" },
    "elizabeth-hurtado": { maxGuests: 1, nombre: "Elizabeth Hurtado" },
    "leidy-gonzalez": { maxGuests: 2, nombre: "Leidy Gonzalez" },
    "francelina-barrera": { maxGuests: 3, nombre: "Francelina Barrera" },
    "ronaldo-montana": { maxGuests: 2, nombre: "Ronaldo Montaña" },
    "tatiana-nunez": { maxGuests: 2, nombre: "Tatiana Nuñez" },
    "edgardo-rivaldo": { maxGuests: 1, nombre: "Edgardo Rivaldo" },
    "leonel-patino": { maxGuests: 3, nombre: "Leonel Patiño" },
    "norbey-echeverry": { maxGuests: 1, nombre: "Norbey Echeverry" },
    "duvia-gonzalez": { maxGuests: 3, nombre: "Duvia Gonzalez" },
    "claudia-patino": { maxGuests: 4, nombre: "Claudia Patiño" },
    "carlos-rico": { maxGuests: 1, nombre: "Carlos Rico" },
    "katherine-montana": { maxGuests: 2, nombre: "Katherine Montaña" },
    "erika-rojas": { maxGuests: 4, nombre: "Erika Rojas" },
    "viviana-rojas": { maxGuests: 4, nombre: "Viviana Rojas" },
    "vanessa-garzon": { maxGuests: 2, nombre: "Vanessa Garzón" },
    "camila-salamanca": { maxGuests: 2, nombre: "Camila Salamanca" },
    "gabriela-rojas": { maxGuests: 2, nombre: "Gabriela Rojas" },
    "isabela-barrera": { maxGuests: 3, nombre: "Isabela Barrera" },
    "daniel-patino": { maxGuests: 2, nombre: "Daniel Patiño" },
    "carolina-montana": { maxGuests: 2, nombre: "Carolina Montaña" },
    "ricardo-gonzalez": { maxGuests: 3, nombre: "Ricardo Gonzalez" },
    "patricia-rojas": { maxGuests: 2, nombre: "Patricia Rojas" },
    "andrea-barrera": { maxGuests: 2, nombre: "Andrea Barrera" },
    "julian-patino": { maxGuests: 3, nombre: "Julian Patiño" },
    "valeria-montana": { maxGuests: 2, nombre: "Valeria Montaña" },
    "sebastian-rojas": { maxGuests: 3, nombre: "Sebastian Rojas" },
    "maria-gonzalez": { maxGuests: 2, nombre: "Maria Gonzalez" },
    "luis-barrera": { maxGuests: 2, nombre: "Luis Barrera" },
    "mariana-rojas": { maxGuests: 3, nombre: "Mariana Rojas" },
    "javier-patino": { maxGuests: 2, nombre: "Javier Patiño" },
    "natalia-montana": { maxGuests: 2, nombre: "Natalia Montaña" }
  } as const;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.rsvpForm = this.fb.group({
      name: ['', Validators.required],
      attendance: ['attend', Validators.required],
      guest: ['', Validators.required],
      what: ['Matrimonio Karen y Andrés', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['invitado']) {
        this.initializeForm(params['invitado']);
      }
    });
  }

  private initializeForm(invitadoId: string) {
    const invitado = this.invitadosValidos[invitadoId];
    if (!invitado) {
      this.isValidGuest = false;
      alert('Invitado no válido');
      return;
    }

    this.isValidGuest = true;
    this.rsvpForm.patchValue({
      name: invitado.nombre
    });

    this.guestNumbers = Array.from(
      { length: invitado.maxGuests },
      (_, i) => i + 1
    );
  }

  onSubmit() {
    if (this.rsvpForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const confirmationData = {
        ...this.rsvpForm.value,
        guest: Number(this.rsvpForm.value.guest)
      };

      this.http.post(this.BACKEND_URL, confirmationData).subscribe({
        next: (response: any) => {
          this.loading = false;
          if (response.success) {
            this.successMessage = response.message || 'Gracias por tu confirmación';
            this.rsvpForm.reset();
          } else {
            this.errorMessage = response.message || 'Error al enviar la confirmación';
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error al enviar la confirmación';
          console.error('Error:', error);
        }
      });
    }
  }

}
