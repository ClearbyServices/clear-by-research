import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | E-Clearby Research",
  description: "Read the Privacy Policy for E-Clearby Research Consulting Pvt. Ltd.",
  alternates: {
    canonical: "https://www.clearbyresearch.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex flex-col bg-brand-light text-brand-dark">
      
      {/* 1. HEADER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 w-full">
        <div className="mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-purple">HOME</Link> <span className="text-brand-gold">›</span> <span className="text-brand-purple">PRIVACY POLICY</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-4">
          Privacy Policy
        </h1>
        <div className="text-xs text-gray-500 font-medium space-x-4">
          <span>Effective Date: 26 September 2026</span>
          <span>•</span>
          <span>Last Updated: 26 September 2026</span>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <div className="bg-white p-8 sm:p-12 border border-gray-200 shadow-sm rounded-sm space-y-8 text-sm text-gray-700 leading-relaxed">
          
          <p>
            E-Clearby Research Consulting Pvt. Ltd. (&quot;Clearby Research&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you provide when you visit or use <a href="https://www.clearbyresearch.com" className="text-brand-purple underline font-medium">www.clearbyresearch.com</a> (the &quot;Website&quot;) or communicate with us regarding our research guidance, academic support, editing, proofreading, data analysis, manuscript development and related services.
          </p>

          <p>
            This Privacy Policy explains what information we may collect, how we use it, how we protect it, and the choices available to you.
          </p>

          <hr className="border-gray-200" />

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">1. Information We Collect</h2>
            <p className="mb-3">Depending on how you interact with our Website and services, we may collect the following information:</p>
            
            <h3 className="font-bold text-brand-purple mt-4 mb-2">A. Information You Provide</h3>
            <p className="mb-2">When you submit an enquiry, contact form, service request or other communication, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-xs text-gray-600">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone/mobile number</li>
              <li>City or location</li>
              <li>Academic level or programme</li>
              <li>Research topic or area of research</li>
              <li>Service you are interested in</li>
              <li>Information included in your enquiry or communication</li>
              <li>Documents or files that you voluntarily upload for consultation or service evaluation</li>
              <li>Any other information you choose to provide to us</li>
            </ul>
            <p className="text-xs text-gray-500 italic mb-4">We request that you do not submit unnecessary sensitive personal information through website forms or email.</p>

            <h3 className="font-bold text-brand-purple mt-4 mb-2">B. Research and Academic Information</h3>
            <p className="mb-2">If you engage with our services, you may voluntarily provide research-related information such as:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-xs text-gray-600">
              <li>Research topic or proposed topic</li>
              <li>Research objectives</li>
              <li>Literature or references</li>
              <li>Research methodology</li>
              <li>Questionnaires or research instruments</li>
              <li>Research data or datasets</li>
              <li>Draft manuscripts, proposals, theses or dissertations</li>
              <li>Tables, figures or supporting documents</li>
            </ul>
            <p className="text-xs text-gray-500 italic mb-4">Such information is used only to understand your requirements and provide the relevant guidance or support requested by you.</p>

            <h3 className="font-bold text-brand-purple mt-4 mb-2">C. Technical and Usage Information</h3>
            <p className="mb-2">When you visit our Website, certain information may be collected automatically, including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-xs text-gray-600">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Approximate location derived from technical information</li>
              <li>Date and time of visits</li>
              <li>Referring website or source</li>
              <li>Website interaction and usage information</li>
            </ul>
            <p className="text-xs text-gray-500 italic">This information may be collected through cookies, analytics tools, tags and similar technologies.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">2. How We Use Your Information</h2>
            <p className="mb-3">We may use the information collected for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Responding to enquiries and requests</li>
              <li>Understanding your academic or research requirements</li>
              <li>Providing requested research guidance and support</li>
              <li>Preparing quotations or service proposals</li>
              <li>Communicating about requested services</li>
              <li>Scheduling consultations or discussions</li>
              <li>Providing editing, proofreading, research, manuscript or data-analysis support</li>
              <li>Processing and evaluating documents submitted for our services</li>
              <li>Improving our Website, services and user experience</li>
              <li>Understanding Website traffic and usage</li>
              <li>Maintaining Website security and preventing misuse</li>
              <li>Managing business records and communications</li>
              <li>Complying with applicable legal and regulatory obligations</li>
              <li>Sending service-related communications</li>
              <li>Sending promotional or marketing communications where permitted and, where required, with your consent</li>
            </ul>
            <p className="text-xs text-gray-500 italic mt-3">We do not use your research materials for purposes unrelated to the services or purposes communicated to you, except where required or permitted by applicable law.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">3. Academic Integrity and User Responsibility</h2>
            <p className="mb-3">Clearby Research provides research guidance, consultation, coaching, editing, proofreading, methodological support and related academic assistance.</p>
            <p className="mb-3">Where applicable, our services are intended to help users develop and improve their own academic work. You remain responsible for your research, academic decisions, submitted work, citations, data, conclusions and compliance with the rules of your institution.</p>
            <p>You should not submit confidential information belonging to another person or organisation unless you have the appropriate authority to do so.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">4. Cookies and Similar Technologies</h2>
            <p className="mb-3">Our Website may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Enable essential Website functionality</li>
              <li>Remember certain preferences</li>
              <li>Understand Website usage</li>
              <li>Measure traffic and performance</li>
              <li>Improve Website functionality and user experience</li>
              <li>Support advertising or marketing measurement, where applicable</li>
            </ul>
            <p className="text-xs text-gray-500">You may be able to manage or disable cookies through your browser settings. Disabling certain cookies may affect Website functionality.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">5. Analytics and Third-Party Services</h2>
            <p className="mb-3">We may use third-party services for purposes such as website analytics, advertising measurement, communication, hosting, security, payment processing or other business functions.</p>
            <p className="mb-3">These providers may process information in accordance with their own privacy policies and applicable contractual or legal requirements.</p>
            <p className="text-xs text-gray-500">Third-party services used by the Website may change from time to time.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">6. Sharing of Information</h2>
            <p className="mb-3 font-semibold text-brand-purple">We do not sell your personal information.</p>
            <p className="mb-3">We may share information where reasonably necessary with:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Employees, consultants, advisors or service professionals working with Clearby Research</li>
              <li>Technology, hosting, analytics and communication service providers</li>
              <li>Payment or transaction service providers, where applicable</li>
              <li>Professional advisors such as legal, accounting or compliance professionals</li>
              <li>Government authorities or law-enforcement agencies where required by applicable law</li>
              <li>Other parties where you have provided appropriate consent or where disclosure is otherwise legally permitted</li>
            </ul>
            <p className="text-xs text-gray-500">Where practical and appropriate, we take reasonable steps to ensure that third parties handling information on our behalf maintain appropriate confidentiality and security measures.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">7. Confidentiality of Research Materials</h2>
            <p className="mb-3">We understand that research documents, datasets, manuscripts, proposals and related academic materials may be confidential.</p>
            <p className="mb-3">We take reasonable organisational, technical and contractual measures to protect information entrusted to us.</p>
            <p className="text-xs text-gray-500">However, no method of electronic transmission, storage or communication can be guaranteed to be completely secure. You should therefore avoid submitting information that you are not authorised to share or that you do not wish to transmit electronically.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">8. Data Security</h2>
            <p className="mb-3">We take reasonable measures designed to protect personal information against:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Unauthorised access</li>
              <li>Unauthorised disclosure</li>
              <li>Loss or misuse</li>
              <li>Alteration</li>
              <li>Destruction</li>
            </ul>
            <p className="mb-3 text-xs text-gray-600">Security measures may include access controls, restricted access to information, secure systems and appropriate organisational safeguards.</p>
            <p className="text-xs text-gray-500">Despite these measures, no online system can be guaranteed to be completely secure.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">9. Data Retention</h2>
            <p className="mb-3">We retain personal information and research-related information only for as long as reasonably necessary for the purposes for which it was collected, to provide requested services, maintain business records, resolve disputes, comply with contractual obligations, or satisfy applicable legal and regulatory requirements.</p>
            <p className="mb-3 text-xs text-gray-600">The actual retention period may depend on the nature of the information and the purpose for which it was collected.</p>
            <p className="text-xs text-gray-500">When information is no longer required, we may securely delete, anonymise or otherwise dispose of it in accordance with applicable requirements.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">10. Your Rights and Choices</h2>
            <p className="mb-3">Subject to applicable law, you may have rights regarding your personal information, including the ability to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Request information about the personal data we process about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of personal information where legally applicable</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Request information about how your personal data is being used</li>
              <li>Raise a complaint regarding the handling of your personal information</li>
            </ul>
            <p className="mb-3 text-xs text-gray-600">Requests may be submitted using the contact details provided below. We may need to verify your identity before processing certain requests.</p>
            <p className="text-xs text-gray-500">Where applicable, we will respond to requests in accordance with the requirements and timelines prescribed by applicable law.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">11. Withdrawal of Consent</h2>
            <p className="mb-3">Where processing is based on your consent, you may withdraw that consent by contacting us using the details below or through any applicable mechanism provided by us.</p>
            <p className="mb-3 text-xs text-gray-600">Withdrawal of consent will not affect the lawfulness of processing carried out before withdrawal.</p>
            <p className="text-xs text-gray-500">Withdrawal may also affect our ability to provide certain services where the relevant information is necessary for providing those services.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 12 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">12. Children&apos;s Privacy</h2>
            <p className="mb-3">Our Website and services are primarily intended for adults and academic researchers.</p>
            <p className="mb-3 text-xs text-gray-600">We do not knowingly seek to collect personal information from children in violation of applicable law.</p>
            <p className="text-xs text-gray-500">If you believe that a child has provided personal information to us without appropriate authorisation, please contact us so that we can review the matter and take appropriate action.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 13 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">13. External Links</h2>
            <p className="mb-3">Our Website may contain links to third-party websites, platforms, journals, tools or resources.</p>
            <p className="text-xs text-gray-500">We are not responsible for the privacy practices, security or content of third-party websites. We encourage you to review their respective privacy policies before providing personal information.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 14 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">14. Changes to This Privacy Policy</h2>
            <p className="mb-3">We may update this Privacy Policy periodically to reflect changes in our services, Website functionality, technology or applicable legal requirements.</p>
            <p className="text-xs text-gray-500">The updated version will be published on this page with a revised &quot;Last Updated&quot; date.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 15 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">15. Contact Us</h2>
            <p className="mb-3">If you have questions, requests or concerns regarding this Privacy Policy or the handling of your personal information, please contact:</p>
            
            <div className="bg-brand-light p-6 rounded-sm border border-gray-200 space-y-2 text-xs text-gray-700">
              <p className="font-bold text-brand-purple">E-Clearby Research Consulting Pvt. Ltd.</p>
              <p><strong className="text-gray-900">Website:</strong> <a href="https://www.clearbyresearch.com" className="text-brand-purple underline">www.clearbyresearch.com</a></p>
              <p><strong className="text-gray-900">Email:</strong> <a href="mailto:contact@clearbyresearch.com" className="text-brand-purple underline">contact@clearbyresearch.com</a></p>
              <p><strong className="text-gray-900">Phone:</strong> +91 70201 12146</p>
              <p><strong className="text-gray-900">Address:</strong> VJ Indilife Sus-Pashan Road, Vardayani Society, Sutarwadi, Pashan Pune, Maharashtra 411021</p>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 italic">For privacy-related requests, please mention &quot;Privacy Request&quot; in the subject line of your communication.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 16 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">16. Governing Legal Framework</h2>
            <p className="mb-3">This Privacy Policy is intended to operate in accordance with applicable laws and regulations of India, including applicable provisions of the Digital Personal Data Protection Act, 2023 and related rules, as and when applicable to the processing activities of Clearby Research.</p>
            <p className="text-xs text-gray-500">Where applicable law provides additional rights or protections, those provisions will apply.</p>
          </div>

        </div>
      </section>

    </div>
  );
}