import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FlightLeg {
  date: string;
  route: string;
  direct: boolean;
}

interface FlightDeal {
  destination: string;
  country: string;
  image: string;
  price: number;
  legs: FlightLeg[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">TravelMate</a>
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item mx-2"><a class="nav-link" href="#">Help</a></li>
          <li class="nav-item mx-2">
            <select class="form-select form-select-sm">
              <option>English (UK)</option>
              <option>English (US)</option>
            </select>
          </li>
          <li class="nav-item mx-2">
            <select class="form-select form-select-sm">
              <option>₹ INR</option>
              <option>$ USD</option>
            </select>
          </li>
          <li class="nav-item mx-2">
            <button class="btn btn-outline-light btn-sm">Log in</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- HERO FORM SECTION -->
    <section class="bg-primary bg-opacity-10 py-5">
      <div class="container">
        <h1 class="display-6 text-center mb-4">
          The best flight offers from anywhere, to everywhere
        </h1>

        <!-- Tabs -->
        <ul class="nav nav-pills justify-content-center mb-4">
          <li class="nav-item" *ngFor="let t of tabs; let i = index">
            <button
              class="nav-link"
              [class.active]="selectedTab === i"
              (click)="selectedTab = i">
              {{ t }}
            </button>
          </li>
        </ul>

        <!-- Search Form -->
        <form class="row g-3 align-items-end">
          <!-- From -->
          <div class="col-md-2">
            <label class="form-label">From</label>
            <select class="form-select" [(ngModel)]="from" name="from">
              <option *ngFor="let city of cities">{{ city }}</option>
            </select>
          </div>

          <!-- To -->
          <div class="col-md-2">
            <label class="form-label">To</label>
            <select class="form-select" [(ngModel)]="to" name="to">
              <option *ngFor="let city of cities">{{ city }}</option>
            </select>
          </div>

          <!-- Depart -->
          <div class="col-md-2">
            <label class="form-label">Depart</label>
            <input
              type="date"
              class="form-control"
              [(ngModel)]="depart"
              name="depart">
          </div>

          <!-- Return (hidden for One‑way) -->
          <div class="col-md-2" *ngIf="selectedTab !== 1">
            <label class="form-label">Return</label>
            <input
              type="date"
              class="form-control"
              [(ngModel)]="returnDate"
              name="return">
          </div>

          <!-- Travellers & Class -->
          <div class="col-md-2">
            <label class="form-label">Travellers & Class</label>
            <select
              class="form-select"
              [(ngModel)]="travellers"
              name="travellers">
              <option *ngFor="let opt of travellerOptions">
                {{ opt }}
              </option>
            </select>
          </div>

          <!-- Search Button -->
          <div class="col-md-2 text-end">
            <button type="button" class="btn btn-primary w-100">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- FEATURE HIGHLIGHTS -->
    <!--
    <section class="container py-5">
      <div class="row text-center gx-4 gy-4">
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-airplane-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">
              Explore the best flight deals from anywhere, to everywhere
            </h5>
            <p class="text-muted mb-0">then book with no fees</p>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-calendar3-range-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">
              Compare deals from over 1000 providers
            </h5>
            <p class="text-muted mb-0">
              choose cheapest, fastest, or lowest‑emission
            </p>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-tags-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">
              Find the cheapest month—or even day—to fly
            </h5>
            <p class="text-muted mb-0">
              set up Price Alerts to book when the price is right
            </p>
          </div>
        </div>
      </div>
    </section>
-->
    <!-- FLIGHT DEALS GRID -->
    <section class="container py-5 ">
      <h2 class="h4 mb-3">Flight deals from India</h2>
      <p class="text-muted mb-4">
        Here are the flight deals with the lowest prices. Act fast – they all
        depart within the next three months.
      </p>

      <div class="row g-4 py-5">
        <div
          class="col-sm-6 col-lg-4"
          *ngFor="let deal of flightDeals">
          <div class="card h-100 shadow-sm">
            <img
              [src]="deal.image"
              class="card-img-top"
              alt="{{ deal.destination }}">
            <div class="card-body">
              <h5 class="card-title">{{ deal.destination }}</h5>
              <p class="card-text text-muted">{{ deal.country }}</p>
              <ul class="list-unstyled mb-3">
                <li
                  *ngFor="let leg of deal.legs"
                  class="d-flex justify-content-between">
                  <div>
                    <i class="bi bi-plane-fill me-1"></i>
                    {{ leg.date }}<br>
                    <small class="text-muted">{{ leg.route }}</small>
                  </div>
                  <span
                    class="badge bg-light text-dark align-self-center">
                    {{ leg.direct ? 'Direct' : '' }}
                  </span>
                </li>
              </ul>
              <div class="text-end">
                <a href="#" class="stretched-link text-primary">
                  from ₹ {{ deal.price | number }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
     
    </section>
  `,
  styles: [`
    .nav-pills .nav-link { cursor: pointer; }
    .nav-pills .nav-link.active { background-color: #0d6efd; }
    .card-img-top { height: 160px; object-fit: cover; }
  `]
})
export class Home {
  tabs = ['Return', 'One way', 'Multi‑city'];
  selectedTab = 1;

  cities = [
    'India (IN)',
    'New York (JFK)',
    'London (LHR)',
    'Dubai (DXB)',
    'Tokyo (HND)'
  ];

  from = this.cities[0];
  to = this.cities[1];
  depart = '';
  returnDate = '';

  travellerOptions = [
    '1 adult, Economy',
    '2 adults, Economy',
    '1 adult, Business',
    '2 adults, Business'
  ];
  travellers = this.travellerOptions[0];

  flightDeals: FlightDeal[] = [
    {
      destination: 'Pasighat',
      country: 'India',
      image: 'assets/images/dest3.png',
      price: 878,
      legs: [
        { date: 'Sat, 19 Jul', route: 'JRH → IXT with Alliance Air', direct: true },
        { date: 'Sat, 2 Aug', route: 'IXT → JRH with Alliance Air', direct: true },
      ]
    },
    {
      destination: 'Muscat',
      country: 'Oman',
      image: 'assets/images/dest2.png',
      price: 8897,
      legs: [
        { date: 'Sat, 21 Jun', route: 'BOM → MCT with SalamAir', direct: true },
        { date: 'Sun, 6 Jul', route: 'MCT → BOM with SalamAir', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest1.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest4.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest5.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest6.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest7.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest8.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    },
    {
      destination: 'Dhaka',
      country: 'Bangladesh',
      image: "assets/images/dest9.png",
      price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC with US‑Bangla Airlines', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU with US‑Bangla Airlines', direct: true },
      ]
    }
  ];
}
