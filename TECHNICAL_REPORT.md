# Technical Report — Cynbit Project Discovery Hub

**Candidate:** Gireesha Pentakota  
**Role:** Full Stack Developer Intern  
**Assessment:** Improve Cynbit's Website  
**Date:** 29 October 2026

## 1. Existing experience reviewed

I reviewed Cynbit's public website from both a user and developer perspective, focusing on the home, services, and contact journeys. The website communicates a broad service ecosystem spanning AI automation, full-stack software, backend systems, cloud infrastructure, technical SEO, CRM automation, and funnel optimization.

The current contact experience invites visitors to start a project and describes a discovery process. I identified an opportunity between "interest" and "contact": a visitor may understand their business problem without knowing which technical service to request or what information will be useful for an initial technical conversation.

## 2. Problem statement

A conventional contact action can create three forms of friction:

1. **Blank-page friction:** users must decide what to write without guidance.
2. **Low-context inquiries:** the engineering/sales team may receive a lead without consistent scope, timeline, or budget context.
3. **Delayed value:** the visitor submits information but receives little immediate guidance before a human follow-up.

The improvement should therefore help the visitor clarify the project while simultaneously creating a better-qualified inquiry.

## 3. Proposed improvement

I built the **Cynbit Project Discovery Hub**, a four-step guided discovery flow.

The prototype asks for:
- project category;
- desired business outcome;
- budget range;
- target timeline;
- name and email.

The backend validates this input and maps it to relevant Cynbit capabilities. The visitor then receives an immediate blueprint containing a recommended direction, delivery complexity, relevant capabilities, and suggested next step. On submission, the backend creates a unique inquiry reference.

This is intentionally a focused improvement rather than a full redesign of Cynbit's website.

## 4. Technical stack and rationale

### Frontend
**HTML + CSS + JavaScript**

The assessment feature does not require a large client-side framework. A lightweight implementation provides fast load time, straightforward review, responsive behavior, and minimal deployment risk.

### Backend
**Node.js native HTTP server**

The server provides REST-style JSON endpoints and serves the frontend. I intentionally used no third-party runtime dependencies, reducing installation overhead and supply-chain surface for the prototype.

### Data
**In-memory prototype store**

Submitted briefs are stored in memory for the demonstration. This proves the end-to-end flow without introducing external credentials into a public assessment repository. A production implementation should use PostgreSQL, Supabase, or another durable datastore.

## 5. Architecture

Browser
→ responsive discovery UI
→ `/api/recommend`
→ validation + capability mapping
→ tailored blueprint returned to browser
→ `/api/inquiries`
→ validated inquiry + generated reference ID

The frontend and API are served from the same Node process, avoiding CORS complexity during deployment.

## 6. Implementation details

### Guided UX
The interface breaks project discovery into four manageable steps and displays progress throughout the flow.

### Validation
The client provides immediate feedback, while the backend independently validates required fields. Server-side validation is important because client validation can be bypassed.

### Recommendation logic
The API maps project categories to a small set of capabilities based on Cynbit's publicly described service areas. The implementation is deterministic, fast, and explainable rather than pretending to use AI where it is unnecessary.

### Inquiry references
Successful submissions receive a cryptographically random short reference in the format `CYN-XXXXXX`, making the success state tangible and easy to reference.

### Responsive design
The UI adapts to mobile layouts with single-column choices and forms.

## 7. User/developer impact

### User impact
- less ambiguity when starting a project;
- faster path from problem to relevant service;
- immediate feedback before a sales conversation;
- clearer expectations for the next step.

### Business/developer impact
- structured lead payloads instead of free-form messages;
- easier CRM integration;
- clearer analytics around demand by service category;
- simple API boundary that can evolve independently of the UI.

## 8. Security and reliability considerations

Implemented:
- server-side required-field validation;
- request body size protection for recommendation requests;
- basic sanitization of text fields;
- no secrets or credentials in the repository;
- no third-party runtime dependencies.

For production I would add:
- durable database persistence;
- schema validation;
- per-IP/API rate limiting;
- CAPTCHA or bot protection;
- secure email/CRM integration;
- structured logging and monitoring;
- automated unit/integration tests;
- privacy/consent handling.

## 9. Results

The prototype converts a generic "contact us" moment into a working full-stack discovery workflow. A user can complete the flow in a few minutes, receive a relevant service map, submit the brief, and get a unique reference without leaving the page.

The prototype demonstrates frontend interaction design, responsive UI, backend API design, validation, business-logic mapping, and deployable Node.js architecture in one focused feature.

## 10. Future iterations

The highest-value next iteration would persist inquiries in PostgreSQL and integrate them with a CRM. I would then measure:
- discovery start-to-completion rate;
- drop-off by step;
- qualified-lead rate;
- most requested service categories;
- discovery-to-call conversion.

These metrics would show whether the improvement creates real conversion and operational value.
