import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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

interface Faq {
  question: string;
  answer: string;
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
            <button 
              class="btn btn-outline-light btn-sm"
              (click)="isLoggedIn ? logout() : openAuthModal()">
              {{ isLoggedIn ? 'Logout' : 'Log in' }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- AUTH MODAL -->
    <div 
      class="modal fade show" 
      tabindex="-1" 
      [ngStyle]="{ display: showAuthModal ? 'block' : 'none' }" 
      (click)="closeModal($event)">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h5 class="modal-title">{{ isLoginMode ? 'Log in' : 'Sign up' }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form #authForm="ngForm" (ngSubmit)="submitAuth(authForm)">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  name="email" 
                  ngModel 
                  required>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  name="password" 
                  ngModel 
                  required minlength="6">
              </div>
              <div class="mb-3" *ngIf="!isLoginMode">
                <label class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  name="confirmPassword" 
                  ngModel 
                  required minlength="6">
              </div>
              <button 
                type="submit" 
                class="btn btn-primary w-100" 
                [disabled]="!authForm.valid">
                {{ isLoginMode ? 'Log in' : 'Sign up' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <a href="#" (click)="toggleMode()">
                {{ isLoginMode ? 'Need an account? Sign up' : 'Have an account? Log in' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="showAuthModal"></div>

    <!-- HERO FORM SECTION -->
    <section class="bg-primary bg-opacity-10 py-5">
      <div class="container">
        <h1 class="display-6 text-center mb-4">
          The best flight offers from anywhere, to everywhere
        </h1>
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
        <form class="row g-3 align-items-end">
          <div class="col-md-2">
            <label class="form-label">From</label>
            <select class="form-select" [(ngModel)]="from" name="from">
              <option *ngFor="let city of cities">{{ city }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">To</label>
            <select class="form-select" [(ngModel)]="to" name="to">
              <option *ngFor="let city of cities">{{ city }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Depart</label>
            <input type="date" class="form-control" [(ngModel)]="depart" name="depart">
          </div>
          <div class="col-md-2" *ngIf="selectedTab !== 1">
            <label class="form-label">Return</label>
            <input type="date" class="form-control" [(ngModel)]="returnDate" name="return">
          </div>
          <div class="col-md-2">
            <label class="form-label">Travellers & Class</label>
            <select class="form-select" [(ngModel)]="travellers" name="travellers">
              <option *ngFor="let opt of travellerOptions">{{ opt }}</option>
            </select>
          </div>
          <div class="col-md-2 text-end">
            <button 
              type="button" 
              class="btn btn-primary w-100"
              (click)="search()">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- FEATURE HIGHLIGHTS -->
    <section class="container py-5">
      <div class="row text-center gx-4 gy-4">
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-airplane-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">Explore the best flight deals</h5>
            <p class="text-muted mb-0">Book with no hidden fees</p>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-calendar3-range-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">Compare 1000+ providers</h5>
            <p class="text-muted mb-0">Cheapest, fastest or greenest</p>
          </div>
        </div>
        <div class="col-md-4 d-flex align-items-start">
          <i class="bi bi-tags-fill fs-2 text-primary me-3"></i>
          <div>
            <h5 class="mb-1">Best time to fly</h5>
            <p class="text-muted mb-0">Set Price Alerts for drops</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FLIGHT DEALS GRID -->
    <section class="container py-5">
      <h2 class="h4 mb-3">Flight deals from India</h2>
      <p class="text-muted mb-4">
        All deals depart within the next 3 months.
      </p>
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-lg-4" *ngFor="let deal of flightDeals">
          <div class="card h-100 shadow-sm deal-card">
            <img [src]="deal.image" class="card-img-top" alt="{{deal.destination}}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{deal.destination}}</h5>
              <p class="text-muted">{{deal.country}}</p>
              <ul class="list-unstyled mb-3 flex-grow-1">
                <li *ngFor="let leg of deal.legs" class="d-flex justify-content-between small">
                  <div>
                    <i class="bi bi-plane-fill me-1"></i>
                    {{leg.date}}<br><small class="text-muted">{{leg.route}}</small>
                  </div>
                  <span class="badge bg-light text-dark align-self-center">
                    {{leg.direct ? 'Direct' : ''}}
                  </span>
                </li>
              </ul>
              <button class="btn btn-gradient mt-auto">
                from ₹ {{deal.price | number}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="bg-light py-5">
      <div class="container">
        <h2 class="h4 text-center mb-4">Frequently Asked Questions</h2>
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item" *ngFor="let f of faqs; let i = index">
            <h2 class="accordion-header" [id]="'heading'+i">
              <button class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      [attr.data-bs-target]="'#collapse'+i"
                      aria-expanded="false"
                      [attr.aria-controls]="'collapse'+i">
                {{f.question}}
              </button>
            </h2>
            <div [id]="'collapse'+i"
                 class="accordion-collapse collapse"
                 [attr.aria-labelledby]="'heading'+i"
                 data-bs-parent="#faqAccordion">
              <div class="accordion-body">{{f.answer}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-dark text-white pt-5">
      <div class="container">
        <div class="row">
          <div class="col-6 col-md-3 mb-3" *ngFor="let col of footerCols">
            <h6>{{col.title}}</h6>
            <ul class="list-unstyled">
              <li *ngFor="let link of col.links">
                <a href="#" class="footer-link">{{link}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center py-3 border-top border-secondary mt-3">
          © 2025 TravelMate. All rights reserved.
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .modal { background: rgba(0,0,0,0.4); }
    .modal-dialog { max-width: 400px; }
    .nav-pills .nav-link { cursor: pointer; }
    .nav-pills .nav-link.active { background-color: #0d6efd; }
    .card-img-top { height: 160px; object-fit: cover; }
    .btn-gradient {
      background: linear-gradient(45deg, #007bff, #00d4ff);
      color: white; transition: transform .2s, box-shadow .2s; width: 100%;
    }
    .btn-gradient:hover {
      transform: scale(1.05); box-shadow: 0 0 8px rgba(0,212,255,.6);
    }
    .deal-card { transition: transform .2s, box-shadow .2s; }
    .deal-card:hover {
      transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,.2);
    }
    .footer-link { color: #ccc; text-decoration: none; transition: color .2s; }
    .footer-link:hover { color: white; }
    @media (max-width: 767px) {
      .accordion-button { font-size: .9rem; }
      .btn-gradient { width: 100%; }
    }
  `]
})
export class Home {
  isLoggedIn = false;
  showAuthModal = false;
  isLoginMode = true;

  tabs = ['Return', 'One way', 'Multi‑city'];
  selectedTab = 1;

  cities = [
    'India (IN)', 'New York (JFK)', 'London (LHR)',
    'Dubai (DXB)', 'Tokyo (HND)', 'Paris (CDG)',
    'Sydney (SYD)', 'Cape Town (CPT)'
  ];
  from = this.cities[0];
  to = this.cities[1];
  depart = '';
  returnDate = '';

  travellerOptions = [
    '1 adult, Economy', '2 adults, Economy', '1 adult, Business',
    '2 adults, Business', '1 adult, First Class', '2 adults, First Class'
  ];
  travellers = this.travellerOptions[0];

  flightDeals: FlightDeal[] = [
    { destination: 'Pasighat', country: 'India', image: 'assets/images/dest3.png', price: 878,
      legs: [
        { date: 'Sat, 19 Jul', route: 'JRH → IXT', direct: true },
        { date: 'Sat, 2 Aug',  route: 'IXT → JRH', direct: true }
      ]
    },
    { destination: 'Muscat', country: 'Oman', image: 'assets/images/dest2.png', price: 8897,
      legs: [
        { date: 'Sat, 21 Jun', route: 'BOM → MCT', direct: true },
        { date: 'Sun, 6 Jul',  route: 'MCT → BOM', direct: true }
      ]
    },
    { destination: 'Dhaka', country: 'Bangladesh', image: 'assets/images/dest1.png', price: 9249,
      legs: [
        { date: 'Fri, 11 Jul', route: 'CCU → DAC', direct: true },
        { date: 'Fri, 18 Jul', route: 'DAC → CCU', direct: true }
      ]
    }
  ];

  faqs: Faq[] = [
    {
      question: 'How do I change or cancel a booking?',
      answer: 'Log in to "My Trips", select the booking, and choose modify or cancel up to 24 hrs before departure.'
    },
    {
      question: 'When will I receive my e‑ticket?',
      answer: 'Your e‑ticket is sent instantly to your registered email upon booking confirmation.'
    },
    {
      question: 'Can I book multi‑city flights?',
      answer: 'Yes—switch to “Multi‑city” in the search tabs and add up to five flight legs.'
    }
  ];

  footerCols = [
    { title: 'Company', links: ['About Us', 'Careers', 'Press'] },
    { title: 'Support', links: ['Help Center', 'Cancellation Options', 'Safety Information'] },
    { title: 'Discover', links: ['Destinations', 'Travel Deals', 'Partners'] },
    { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies'] }
  ];

  openAuthModal() {
    this.isLoginMode = true;
    this.showAuthModal = true;
  }
  closeModal(e?: MouseEvent) {
    if (!e || (e.target as HTMLElement).classList.contains('modal')) {
      this.showAuthModal = false;
    }
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  submitAuth(form: NgForm) {
    if (!form.valid) return;
    // TODO: integrate real auth API here
    console.log(this.isLoginMode ? 'Logging in' : 'Signing up', form.value);
    this.isLoggedIn = true;
    this.showAuthModal = false;
  }
  logout() {
    this.isLoggedIn = false;
    // TODO: clear session/token
  }
  search() {
    // TODO: wire up real search logic or navigation
    console.log('Searching flights:', {
      mode: this.tabs[this.selectedTab],
      from: this.from,
      to: this.to,
      depart: this.depart,
      return: this.returnDate,
      travellers: this.travellers
    });
  }
}
