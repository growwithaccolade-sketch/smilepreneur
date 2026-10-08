# The Smilepreneur Solutions

Independent Vite + React + Framer Motion website. No Lovable dependency.

## Local setup

```bash
npm install
npm run dev
npm run build
```

## Deployment

Connect this repository to Vercel using framework **Vite**, build command `npm run build`, output directory `dist`. SPA rewrite configured in `vercel.json`.

## Enquiry form

The client-side form sends to `/api/inquiry`. A serverless email relay is included at `api/inquiry.js`. It requires a verified sending domain and Resend environment variables. Until those are configured, the form shows a fallback to Esther's existing contact links. Do not represent it as working lead capture before end-to-end testing.

## Images

All photos in `public/photos` were supplied as reference material. Review usage/ownership and privacy approvals before publication. Portfolio clearly labels these as event participation and moments, not unverified organizer case studies.

## Next phase

Secure enquiries API with spam prevention, verified admin auth, editable portfolio content and server storage, monitoring, verified custom domain and metadata.

## Secure mail relay

The `/api/inquiry` Vercel function validates incoming form data and forwards enquiries via Resend. Configure `RESEND_API_KEY`, `LEADS_TO_EMAIL`, and `LEADS_FROM_EMAIL` (a verified sending domain) under Vercel Environment Variables. Until configured the endpoint returns 503 and the frontend explicitly directs visitors to the existing Linktree. Rate limiting and database-backed CRM are future work, not implemented yet.
