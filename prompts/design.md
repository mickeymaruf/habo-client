The "Habo Modern Brutalist" Master Prompt
Instructions for UI Styling:

Please follow this specific Modern Brutalist / Technical Agent design system for all React/Tailwind components:

Color Palette:

Primary Accent: Lime Green (#A3E635). Use for active states, checkmarks, and primary highlights.

Base: Pure White background, Solid Black (#000000) for borders and text.

Neutral: Zinc-50 or Zinc-100 for subtle hover backgrounds.

Typography:

Headings: Use font-black italic uppercase tracking-tighter.

Subtitles/Labels: Use text-[10px] font-black uppercase tracking-widest text-black/40.

Numbers: Use tabular-nums for alignment.

Borders & Geometry:

Weight: All structural borders must be border-4 border-black or border-2 border-black. No soft grays.

Corners: Interactive elements (cards/buttons) use rounded-[30px] or rounded-2xl. Tactical elements (checkboxes) use rounded-none (sharp squares).

Effects (The "Sticker" Aesthetic):

Hard Shadows: Use shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] for buttons and cards.

Rotation: Use subtle tilts like -rotate-1 or rotate-2 on "sticker-like" components to make them look pinned on.

Interactions:

Buttons: Must have a "press" effect using active:scale-95 active:shadow-none.

Checkboxes: When checked, they should be a solid filled block of #A3E635 with a black border.

Icons: >     * Use lucide-react. Set stroke-width to [2.5px] or [3px] to match the heavy borders.