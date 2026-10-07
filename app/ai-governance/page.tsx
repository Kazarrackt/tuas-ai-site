import { company } from '../company';
import { LegalPage, legalMetadata } from '../legal-page';

export const metadata = legalMetadata(
  '/ai-governance',
  'AI Governance Policy',
  'How Tuas AI governs its AI service: certified on-premises NVIDIA GPU accelerators owned and operated in Singapore, no data retention after the session, no training on customer data, and model weights from Hugging Face.',
);

export default function AiGovernancePage() {
  return (
    <LegalPage
      title="AI Governance Policy"
      summary="How we run, source and oversee the AI models behind the Tuas AI Model API, and the commitments we make about your data."
    >
      <h2>1. Our commitments</h2>
      <ul>
        <li>
          <strong>Our own hardware, in Singapore.</strong> We use only certified, physical NVIDIA GPU accelerators,
          on premises, owned and operated by {company.name}. Inference does not run on shared public-cloud GPU capacity.
        </li>
        <li>
          <strong>No retention.</strong> Prompts, context and outputs are processed for the duration of the session only and
          are not kept afterwards.
        </li>
        <li>
          <strong>No training.</strong> We never train or fine-tune any model on session data, prompts, context or outputs.
        </li>
        <li>
          <strong>Content stays with us.</strong> Customer content does not leave our infrastructure and is never sent to
          the model vendor.
        </li>
      </ul>

      <h2>2. Model sourcing</h2>
      <p>
        Models are delivered and distributed in flight, with Hugging Face as our model weight provider. We deploy the
        weights onto our own infrastructure and serve them from there. Only model weights flow from Hugging Face to us; no
        customer data flows back.
      </p>
      <p>
        Before we offer a model, we check its source, licence and published documentation, and test it for quality and
        stability. We follow each model&rsquo;s licence and acceptable-use terms and identify the model and its developer on
        our website.
      </p>

      <h2>3. Security and access</h2>
      <p>
        Access to production systems is limited to authorised staff, on a need-to-know basis. Traffic to the API is encrypted
        in transit. We monitor service metadata (not content) to keep the Service secure and to detect abuse.
      </p>

      <h2>4. Responsible use</h2>
      <p>
        Customers decide how they use model outputs and remain responsible for their own use cases, including human review
        of decisions that significantly affect people. Our <a href="/terms">Terms of Use</a> set out prohibited uses. Report
        misuse to <a href={`mailto:${company.abuseEmail}`}>{company.abuseEmail}</a>; we investigate reports and may suspend
        access.
      </p>

      <h2>5. Transparency</h2>
      <p>
        We publish which models we serve, who developed them and what they cost. AI outputs can be wrong; we say so plainly
        and encourage customers to tell their own users when they are interacting with AI.
      </p>

      <h2>6. Frameworks</h2>
      <p>
        This policy is informed by Singapore&rsquo;s Model AI Governance Framework and the Personal Data Protection Act 2012.
        Our handling of personal data is described in our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>7. Incidents and review</h2>
      <p>
        We investigate security and model incidents promptly and notify affected customers and authorities where required.
        We review this policy at least once a year and when we materially change our models or infrastructure.
      </p>
    </LegalPage>
  );
}
