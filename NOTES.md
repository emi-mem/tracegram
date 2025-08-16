# Tracegram – Development Notes

## Day 1 Progress

### Project setup
- Created a new Next.js project with TypeScript, Tailwind, and the new `/app` directory.
- Installed **shadcn/ui** (UI component library built on Tailwind).
- Set up GitHub repo and pushed initial code for version control.

### Routing
- Learned how Next.js routes work:
  - `/` → Home page
  - `/compare` → Compare page
- Added a navigation button on the home page that links to the Compare tool.

### Compare Page (Core Functionality)
- Built a page where you can paste two snapshots of Instagram followers.
- Supports **multiple formats**:
  - JSON arrays (`["alice","bob"]` or `[{"username":"alice"}]`)
  - CSV with a `username` column
  - Plain text, one username per line
- Normalizes usernames (case-insensitive, removes spaces, strips `@`).
- Detects and counts duplicate entries.
- Compares old vs new snapshots:
  - **Unfollowed** (in old, not in new)
  - **New followers** (in new, not in old)
  - **Unchanged** (in both)
- Results are shown instantly as you type/paste.

### Key Takeaways
- **Client component**: Needed `"use client"` at the top of the file because we’re using React hooks.
- **State (`useState`)**: Keeps track of textarea inputs.
- **Derived values (`useMemo`)**: Recomputes parsed lists, diffs, and duplicate counts only when input changes.
- **Sets**: Used to compare lists efficiently (no duplicate issues, fast lookups).
- **Reusable components**: Created a `<List>` component to avoid repeating UI code.

---

## Next Steps (Day 2 Preview)
- Improve UI using shadcn components (cards, buttons, toasts).
- Add file upload support for CSV/JSON.
- Explore saving comparison history or exporting results.
