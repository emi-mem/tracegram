# Tracegram — Learning Notes

## Project overview
Tracegram is a Next.js + Tailwind + shadcn/ui app that compares two Instagram follower snapshots
and shows who unfollowed, who is new, and who stayed.  
Goal: practice modern, in-demand frameworks and build a project I can explain on my resume.

---

## Day 1 — Setup & Routing
- **What I did:**
  - Created project with `create-next-app`.
  - Added TailwindCSS + shadcn/ui for styling and components.
  - Made a GitHub repo for version control.
  - Built a custom layout (`layout.tsx`) with consistent background & centered content.
  - Replaced the default homepage with a Tracegram Home page + link to `/compare`.
  - Created `/compare` route with a placeholder page.

- **What I learned:**
  - In Next.js App Router, `src/app/page.tsx` = `/`, `src/app/compare/page.tsx` = `/compare`.
  - `layout.tsx` is a wrapper applied to all routes.
  - Tailwind utility classes make layout and styling very fast.
  - “localhost:3000” is just my local dev server, not the real internet.

---

