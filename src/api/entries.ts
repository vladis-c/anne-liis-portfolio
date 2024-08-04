const CONTENT_TYPES = {
  NAVIGATION: 'navigation',
  HERO: 'hero',
  SECTION: 'section',
  CTA: 'cta',
  FOOTER: 'footer'
} as const;

const ENTRIES = {
  CONTENT_TYPES,
  ENTRIES: 'entries',
} as const;

export default ENTRIES;
