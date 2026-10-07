import { company } from '../company';
import { LegalPage, legalMetadata } from '../legal-page';

export const metadata = legalMetadata(
  '/terms',
  'Terms of Use',
  'Terms of Use for the Tuas AI website and Model API, a Singapore-hosted, OpenAI-compatible API for frontier-level AI models. Governed by the laws of Singapore.',
);

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      summary="The terms that apply when you use the tuas.ai website and the Tuas AI Model API."
    >
      <h2>1. Agreement</h2>
      <p>
        These terms are an agreement between you and {company.name}. By using the website or the Tuas AI Model API (the
        &ldquo;Service&rdquo;) you agree to them. If you use the Service for an organisation, you confirm you can bind that
        organisation to these terms. A separate signed agreement with us takes precedence over these terms where they
        differ.
      </p>

      <h2>2. The Service</h2>
      <p>
        The Service gives access to open-weight AI models through an OpenAI-compatible API, hosted in Singapore. The
        Service is launching soon; features, models and availability may change, and pre-release access may be limited or
        withdrawn at any time.
      </p>

      <h2>3. Accounts and API keys</h2>
      <p>
        Keep your API keys secret. You are responsible for all use of the Service under your keys. Tell us promptly if a key
        may be compromised.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You must not use the Service to:</p>
      <ul>
        <li>break any law, including Singapore law and the laws that apply to you;</li>
        <li>create or spread child sexual abuse material, or content that exploits or harms minors;</li>
        <li>develop weapons capable of mass casualties, or plan or promote violence or terrorism;</li>
        <li>build or deploy malware, or attack, probe or disrupt any system without authorisation;</li>
        <li>defraud, impersonate, harass or unlawfully surveil others, or infringe others&rsquo; rights;</li>
        <li>make decisions with legal or similarly significant effects on people without appropriate human review;</li>
        <li>interfere with the Service, get around its limits, or resell it without our written agreement.</li>
      </ul>
      <p>
        Report misuse to <a href={`mailto:${company.abuseEmail}`}>{company.abuseEmail}</a>.
      </p>

      <h2>5. Your content</h2>
      <p>
        You keep all rights in the inputs you send and, as between you and us, in the outputs you receive. You confirm you
        have the rights needed to send your inputs. We process your content only to provide the Service. We do not retain it
        after the session and do not use it to train any model, as described in our{' '}
        <a href="/privacy">Privacy Policy</a> and <a href="/ai-governance">AI Governance Policy</a>.
      </p>

      <h2>6. Models and outputs</h2>
      <p>
        Models are developed by third parties and distributed under their own licences, which you must follow. AI output can
        be inaccurate, incomplete or offensive. Check outputs before relying on them, especially for legal, medical,
        financial or safety decisions.
      </p>

      <h2>7. Prices and payment</h2>
      <p>
        Prices are in USD per 1 million tokens as shown on our website or in your order, and may change with notice. You
        pay for the usage recorded by the Service. Taxes are extra where they apply.
      </p>

      <h2>8. Suspension and termination</h2>
      <p>
        We may suspend or end access if you breach these terms, if your use creates a security or legal risk, or if we are
        required to by law. You may stop using the Service at any time.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        To the extent the law allows, the Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
        warranties of any kind, including fitness for a particular purpose, accuracy or uninterrupted availability.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the extent the law allows, we are not liable for indirect, consequential or special loss, or for loss of profit,
        revenue, data or goodwill. Our total liability for any claim is limited to the fees you paid us for the Service in
        the 12 months before the claim arose. Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You will indemnify us against third-party claims arising from your content or your breach of these terms.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these terms. The effective date above shows when they last changed. Continuing to use the Service
        after a change means you accept it.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of Singapore. The courts of Singapore have exclusive jurisdiction over any
        dispute arising from them.
      </p>
    </LegalPage>
  );
}
