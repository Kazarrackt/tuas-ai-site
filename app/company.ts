export const siteUrl = process.env.SITE_URL ?? 'https://tuas.ai';

export const company = {
  name: 'Tuas AI',
  uen: '202635139W',
  status: 'Live Company',
  ssic: { code: '62023', description: 'Computer facilities management activities' },
  address: {
    street: '1 Kaki Bukit View, #02-10, Techview',
    locality: 'Singapore',
    postalCode: '415941',
    country: 'SG',
  },
  privacyEmail: 'privacy@tuas.ai',
  abuseEmail: 'abuse@tuas.ai',
} as const;

export const companyAddress = `${company.address.street}, ${company.address.locality} ${company.address.postalCode}`;

export const legalPages = [
  { path: '/privacy', title: 'Privacy Policy' },
  { path: '/terms', title: 'Terms of Use' },
  { path: '/ai-governance', title: 'AI Governance Policy' },
] as const;

export const legalEffectiveDate = '7 October 2026';
