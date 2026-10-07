import { company } from '../company';
import { LegalPage, legalMetadata } from '../legal-page';

export const metadata = legalMetadata(
  '/privacy',
  'Privacy Policy',
  'How Tuas AI collects, uses and protects personal data under the Singapore Personal Data Protection Act 2012 (PDPA). Prompts and outputs are not retained or used for training.',
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="How we collect, use, disclose and protect personal data, in line with Singapore's Personal Data Protection Act 2012 (PDPA)."
    >
      <h2>1. Scope</h2>
      <p>
        This policy applies to the tuas.ai website and the Tuas AI Model API (the &ldquo;Service&rdquo;). It explains how{' '}
        {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal data of website visitors, customers and their
        authorised users.
      </p>

      <h2>2. Personal data we collect</h2>
      <ul>
        <li>
          <strong>Contact and account details</strong> you give us, such as your name, company, work email and billing
          details.
        </li>
        <li>
          <strong>Service metadata</strong> needed to run, bill and secure the Service, such as API key identifiers,
          request timestamps, model used, token counts, IP addresses and error logs.
        </li>
        <li>
          <strong>Correspondence</strong> you send us, for example to {company.privacyEmail} or {company.abuseEmail}.
        </li>
      </ul>

      <h2>3. Prompts, inputs and outputs</h2>
      <p>
        The content you send to the API (prompts, context, files) and the outputs the models return are processed in memory
        on our own GPU infrastructure in Singapore, only for the duration of the request or session.
      </p>
      <ul>
        <li>We do not retain prompt or output content after the session ends.</li>
        <li>We do not use prompt or output content, or any session data or context, to train or fine-tune any model.</li>
        <li>We do not sell, share or disclose prompt or output content to model vendors or other third parties.</li>
      </ul>

      <h2>4. How we use personal data</h2>
      <ul>
        <li>To provide, operate and maintain the Service, and to authenticate users.</li>
        <li>To calculate usage and bill for it.</li>
        <li>To detect, investigate and prevent fraud, abuse and security incidents.</li>
        <li>To respond to enquiries and send service notices.</li>
        <li>To meet our legal and regulatory obligations.</li>
      </ul>
      <p>We collect, use and disclose personal data with your consent, or as otherwise permitted or required under the PDPA.</p>

      <h2>5. Disclosure</h2>
      <p>
        We do not sell personal data. We disclose it only to service providers who help us run our business (for example
        payment processing or email), under contracts that require them to protect it; or where required by law, court
        order or a lawful request from a public authority.
      </p>

      <h2>6. Where data is processed</h2>
      <p>
        Inference runs on hardware owned and operated by {company.name} in Singapore. If any personal data must be
        transferred outside Singapore (for example by a service provider), we will make sure it receives a standard of
        protection comparable to the PDPA.
      </p>

      <h2>7. Retention</h2>
      <p>
        We keep account, billing and service metadata only for as long as we need it for the purposes above, or as the
        law requires, and then delete or anonymise it. Prompt and output content is not retained after the session.
      </p>

      <h2>8. Security</h2>
      <p>
        We protect personal data with reasonable administrative, physical and technical safeguards, including access
        controls, encryption in transit and physical control of our own infrastructure.
      </p>

      <h2>9. Cookies</h2>
      <p>
        This website does not use advertising or tracking cookies and does not load analytics. If this changes, we will
        update this policy first.
      </p>

      <h2>10. Your rights</h2>
      <p>
        You may ask to access or correct your personal data, or withdraw your consent to its collection, use or disclosure.
        Withdrawing consent may mean we can no longer provide the Service to you. Send requests to our Data Protection
        Officer at <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>. We will respond within the time
        frames set by the PDPA.
      </p>

      <h2>11. Data breaches</h2>
      <p>
        If a data breach occurs, we will assess it and notify the Personal Data Protection Commission and affected
        individuals where the PDPA requires.
      </p>

      <h2>12. Changes</h2>
      <p>We may update this policy. The effective date above shows when it last changed.</p>
    </LegalPage>
  );
}
