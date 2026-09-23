# Mama's School Rides — PRD

## Original Problem Statement
Warm, trustworthy marketing website for "Mama's School Rides," a private door-to-door school transportation service in McConachie, Edmonton, AB, run by a mom of three who personally drives routes. Funnel: Social/Google → Home → Check Route Availability (inquiry) → manual owner approval → private Registration link → Agreement → Payment → Confirmation → Active client. Registration NOT publicly linked. Waitlist state for full routes. Sticky, dominant "Check Route Availability" CTA, mobile-first.

## User Personas
- Busy working parent in McConachie (mobile browser, needs trust + quick inquiry)
- The founder/owner (reviews inquiries, toggles route-full state, manages registrations)
- Approved family completing private registration

## Architecture
- React (CRA + craco) frontend, Tailwind + shadcn/ui, framer-motion (masked line reveals, scroll reveals, parallax hero), Lenis smooth scrolling
- FastAPI backend on /api, MongoDB (motor)
- Collections: inquiries, registrations, waitlist, settings (route_status)
- Admin: env-based shared password → JWT (12h) → protected GET lists + route-status toggle
- Design system: Fraunces (display serif) + Outfit (body); terracotta #E87A5D / cream #FDFBF7 / sage / sun amber; custom SVG sun-van logo + favicon

## Implemented (2026-09-23)
- Pages: Home (kinetic hero, trust strip, marquee, 4 features, 5 steps, meet driver, CTA banner), How It Works (+ door-to-door definition), Services & Pricing ($550/$425/$35–40 + siblings + disclaimer), Check Availability (validated inquiry form + confirmation + reference code), Registration (/register-private-portal, noindex, 8 sections, 3 agreement checkboxes), Safety & Trust (credentials + 5 practice groups, honest not-yet-earned note), About (first-person founder story), FAQ (15 accordion Q&As), Policies (6 draft-flagged docs, footer-linked), Contact (phone/email/hours + conversion CTA)
- Components: Navbar (glass, mobile drawer), Footer (quick links + policies), TrustStrip, Marquee, Reveal/MaskLine, StickyCTA (mobile fixed bottom), WaitlistCard (reusable), Logo
- Backend: POST inquiries/registrations/waitlist, GET route-status, admin login + protected lists + route-full toggle
- Admin dashboard at /admin (password: MamaRides2026!) — view submissions, toggle "routes full" (waitlist card appears on availability page)

## Placeholders to swap before launch
- [Your Name] founder name, (780) 555-1234, hello@mamasschoolrides.ca, business hours
- Founder photography (currently curated warm placeholders)
- Policy pages are DRAFT text pending professional legal review

## Backlog
- P0: Real founder photo + name/contact details; legal review of policies
- P1: Email notification to owner on new inquiry/registration (Resend); online payment step (Stripe) to complete funnel
- P2: Testimonials section, service-area map, inquiry status lookup by reference code, per-route (not global) full toggles

## Next Tasks
1. Swap in real founder details/photos
2. Resend email notifications for new submissions
3. Stripe payment link step after registration
4. Professional legal review of the 6 policy documents
