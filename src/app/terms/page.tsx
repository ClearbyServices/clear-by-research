import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | E-Clearby Research",
  description: "Read the Terms & Conditions for E-Clearby Research Consulting Pvt. Ltd.",
  alternates: {
    canonical: "https://www.clearbyresearch.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full flex flex-col bg-brand-light text-brand-dark">
      
      {/* 1. HEADER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 w-full">
        <div className="mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-purple">HOME</Link> <span className="text-brand-gold">›</span> <span className="text-brand-purple">TERMS & CONDITIONS</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-4">
          Terms & Conditions
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
            Welcome to <a href="https://www.clearbyresearch.com" className="text-brand-purple underline font-medium">www.clearbyresearch.com</a>, operated by E-Clearby Research Consulting Pvt. Ltd. (&quot;Clearby Research&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          <p>
            By accessing this Website, submitting an enquiry, requesting a consultation, purchasing or engaging our services, you agree to be bound by these Terms & Conditions (&quot;Terms&quot;).
          </p>

          <p className="text-xs text-gray-500 italic">
            Please read these Terms carefully before using the Website or engaging our services.
          </p>

          <hr className="border-gray-200" />

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">1. About Our Services</h2>
            <p className="mb-3">Clearby Research provides research guidance, consultation, coaching, academic support and related services for scholars, researchers and students.</p>
            <p className="mb-2 font-semibold text-brand-purple">Our services may include:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>PhD topic guidance</li>
              <li>Research proposal development guidance</li>
              <li>Literature review guidance</li>
              <li>Systematic literature review guidance</li>
              <li>Research manuscript development guidance</li>
              <li>Questionnaire development support</li>
              <li>Data collection strategy and data analysis support</li>
              <li>Technical implementation and simulation support</li>
              <li>Thesis and dissertation guidance</li>
              <li>Editing and proofreading support</li>
              <li>Plagiarism/similarity checking support</li>
              <li>Research methodology guidance</li>
              <li>Publication and manuscript-related guidance</li>
            </ul>
            <p className="text-xs text-gray-500">The availability and scope of services may vary depending on the user&apos;s requirements, academic discipline and agreed scope of work.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">2. Guidance and Academic Responsibility</h2>
            <p className="mb-3">Our services are intended to provide professional guidance, consultation, feedback, editing, technical assistance and research support.</p>
            <p className="mb-2 font-semibold text-brand-purple">The user remains responsible for:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Their research decisions</li>
              <li>Academic arguments and conclusions</li>
              <li>Data ownership and accuracy</li>
              <li>Research methodology</li>
              <li>Citations and references</li>
              <li>Institutional requirements</li>
              <li>Final documents submitted to an educational institution or journal</li>
              <li>Compliance with academic integrity policies</li>
              <li>Obtaining required permissions, approvals or ethical clearances</li>
            </ul>
            <p className="text-xs text-gray-500">Users should review and independently verify all materials, recommendations and outputs before using or submitting them.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">3. User-Provided Information</h2>
            <p className="mb-3">You agree that information, documents, data and other materials provided by you are accurate and that you have the legal right or appropriate permission to provide them to us.</p>
            <p className="mb-2 font-semibold text-brand-purple">You must not knowingly submit:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Stolen or unlawfully obtained material</li>
              <li>Confidential information belonging to another person without permission</li>
              <li>Personal information that you are not authorised to share</li>
              <li>Copyright-protected material where you do not have the necessary rights</li>
              <li>Malicious software or files</li>
              <li>Fraudulent or misleading information</li>
            </ul>
            <p className="text-xs text-gray-500">You are responsible for maintaining backups of your original documents and research materials.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">4. Research Data and Confidential Materials</h2>
            <p className="mb-3">Where you provide research documents, datasets, manuscripts, questionnaires or other academic materials, we will handle them in accordance with our Privacy Policy and the agreed scope of services.</p>
            <p className="mb-3 text-xs text-gray-600">You should only provide data that is necessary for the requested service.</p>
            <p className="text-xs text-gray-500">Where research data contains personal information relating to research participants or other individuals, you are responsible for ensuring that you have obtained all required permissions, consents, ethical approvals and legal authorisations before sharing such data with us.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">5. Service Scope</h2>
            <p className="mb-3">The exact scope of a service will depend on the service description, quotation, proposal, consultation or written communication agreed with the client.</p>
            <p className="mb-2 font-semibold text-brand-purple">Additional requests outside the agreed scope may:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Require additional fees</li>
              <li>Require additional time</li>
              <li>Be subject to separate approval</li>
            </ul>
            <p className="text-xs text-gray-500">Clearby Research will communicate material changes to scope, timelines or fees where reasonably practicable.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">6. Fees and Pricing</h2>
            <p className="mb-3 font-semibold text-brand-purple">Service fees may depend on factors including:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Nature of the service</li>
              <li>Complexity of the requirement</li>
              <li>Academic discipline</li>
              <li>Document length</li>
              <li>Data volume</li>
              <li>Technical requirements</li>
              <li>Delivery timeline</li>
              <li>Level of consultation or support required</li>
            </ul>
            <p className="mb-3 text-xs text-gray-600">The pricing page states that costs may be based on project complexity, deadlines, page count and service level.</p>
            <p className="mb-3 text-xs text-gray-600">A quotation or fee communicated to you may be valid only for the period specified in that quotation.</p>
            <p className="text-xs text-gray-500">Taxes, payment gateway charges or other applicable charges may be added where required.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">7. Payment</h2>
            <p className="mb-3">Where payment is required before commencement or at a particular stage, the applicable payment terms will be communicated to you.</p>
            <p className="mb-3 text-xs text-gray-600">Services may not commence until the required payment or advance has been received.</p>
            <p className="text-xs text-gray-500">For projects involving multiple stages, payment may be linked to agreed milestones.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">8. Refunds and Cancellations</h2>
            <p className="mb-3">Cancellation and refund eligibility will depend on the nature and stage of the service.</p>
            <p className="mb-3 text-xs text-gray-600">Where work, consultation, analysis, editing or other professional support has already commenced, the amount refundable, if any, may be reduced to account for services already provided or costs already incurred.</p>
            <p className="mb-3 text-xs text-gray-600">Any applicable refund will be processed using the applicable payment method, subject to payment-provider processing timelines.</p>
            <p className="text-xs text-gray-500">Specific refund conditions may be communicated in the quotation, invoice or service agreement.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">9. Timelines and Delivery</h2>
            <p className="mb-3">We aim to provide services within the timeline agreed with the client.</p>
            <p className="mb-2 font-semibold text-brand-purple">However, timelines may be affected by:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Delayed information or documents from the client</li>
              <li>Changes in requirements</li>
              <li>Additional requests</li>
              <li>Delayed approvals or feedback</li>
              <li>Technical issues</li>
              <li>Third-party dependencies</li>
              <li>Events beyond our reasonable control</li>
            </ul>
            <p className="text-xs text-gray-500">Any timeline provided is therefore subject to timely cooperation and availability of the information required to perform the service.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">10. Reviews and Client Feedback</h2>
            <p className="mb-3">Where a service includes review or revision rounds, the number and scope of such revisions will be determined by the applicable quotation or service agreement.</p>
            <p className="text-xs text-gray-500">Requests that substantially change the original requirements may be treated as additional work.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">11. Intellectual Property</h2>
            <p className="mb-3 font-semibold text-brand-purple">Unless otherwise agreed in writing:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>You retain ownership of original materials and research content supplied by you.</li>
              <li>Third-party materials remain subject to the rights of their respective owners.</li>
              <li>Clearby Research retains ownership of its pre-existing methodologies, templates, frameworks, processes, internal resources and proprietary materials.</li>
            </ul>
            <p className="mb-3 text-xs text-gray-600">You may not reproduce, resell or commercially distribute Clearby Research&apos;s proprietary materials without written permission.</p>
            <p className="text-xs text-gray-500">Where a deliverable is specifically created for you under an agreed paid service, ownership and permitted use will be governed by the applicable agreement, quotation or written communication.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 12 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">12. Third-Party Resources and Tools</h2>
            <p className="mb-3">Our services may involve third-party tools, software, databases, academic platforms, analytics platforms, statistical software or publication systems.</p>
            <p className="mb-2 font-semibold text-brand-purple">Third-party services may have their own:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Terms of use</li>
              <li>Licensing requirements</li>
              <li>Privacy policies</li>
              <li>Fees</li>
              <li>Availability limitations</li>
            </ul>
            <p className="text-xs text-gray-500">Clearby Research is not responsible for changes, interruptions or restrictions imposed by third-party platforms outside our reasonable control.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 13 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">13. Academic Integrity</h2>
            <p className="mb-3">Clearby Research expects all users to comply with the academic integrity rules of their institution, university, research organisation or journal.</p>
            <p className="mb-3 text-xs text-gray-600">Our support is intended to assist users in understanding, developing, improving and presenting their own research.</p>
            <p className="text-xs text-gray-500">We do not guarantee acceptance, approval, publication, academic grades, degree completion, research outcomes or institutional acceptance.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 14 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">14. Plagiarism and Similarity Checking</h2>
            <p className="mb-3">Where similarity or plagiarism-checking support is requested, the results produced by third-party or other checking tools may vary depending on their databases, algorithms, settings and methodology.</p>
            <p className="mb-3 text-xs text-gray-600">A similarity percentage is not by itself a definitive determination of plagiarism.</p>
            <p className="text-xs text-gray-500">The final responsibility for originality, attribution, citations and academic compliance remains with the user.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 15 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">15. Publication and Journal Submission</h2>
            <p className="mb-3">Where we provide manuscript formatting, editing or submission-related guidance, we do not guarantee:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Journal acceptance</li>
              <li>Peer-review outcomes</li>
              <li>Publication</li>
              <li>Indexing</li>
              <li>Citation performance</li>
              <li>Impact factor</li>
              <li>Acceptance within a particular timeframe</li>
            </ul>
            <p className="text-xs text-gray-500">Editorial decisions remain solely with the relevant journal, publisher or editorial body.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 16 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">16. Website Content</h2>
            <p className="mb-3">We make reasonable efforts to keep the information on our Website accurate and current.</p>
            <p className="mb-3 text-xs text-gray-600">However, Website content may contain typographical errors, outdated information or omissions.</p>
            <p className="text-xs text-gray-500">Service descriptions, pricing, availability and other information may change without prior notice.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 17 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">17. No Guarantee of Specific Results</h2>
            <p className="mb-3">Clearby Research provides professional guidance and support but does not guarantee a particular academic, research, publication, examination or career outcome.</p>
            <p className="text-xs text-gray-500">Results may depend on factors outside our control, including the user&apos;s research quality, institutional requirements, supervisor feedback, reviewer decisions, available data and academic evaluation.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 18 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">18. Prohibited Use</h2>
            <p className="mb-2 font-semibold text-brand-purple">You agree not to use the Website or our services to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>Violate any applicable law</li>
              <li>Misrepresent your identity</li>
              <li>Infringe intellectual property rights</li>
              <li>Upload malicious files or software</li>
              <li>Attempt unauthorised access to our systems</li>
              <li>Interfere with Website functionality</li>
              <li>Misuse another person&apos;s personal information</li>
              <li>Engage in fraudulent activity</li>
              <li>Circumvent security measures</li>
              <li>Use our Website or services for any unlawful purpose</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Section 19 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">19. Website Availability</h2>
            <p className="mb-3">We aim to maintain continuous Website availability but do not guarantee that the Website will always be available, error-free, secure, free from interruptions, or free from technical defects.</p>
            <p className="text-xs text-gray-500">We may temporarily suspend Website access for maintenance, security, updates or other operational reasons.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 20 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">20. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by applicable law, Clearby Research shall not be liable for indirect, incidental, consequential or special losses arising from your use of the Website or services.</p>
            <p className="mb-2 font-semibold text-brand-purple">This may include losses relating to:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>Academic decisions</li>
              <li>Publication rejection</li>
              <li>Examination results</li>
              <li>Institutional decisions</li>
              <li>Loss of data caused by circumstances outside our reasonable control</li>
              <li>Third-party platform failures</li>
              <li>Delays resulting from information or actions of the client</li>
            </ul>
            <p className="text-xs text-gray-500">Nothing in these Terms is intended to exclude or limit liability that cannot legally be excluded or limited under applicable law.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 21 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">21. Indemnification</h2>
            <p className="mb-3">To the extent permitted by applicable law, you agree to indemnify and hold harmless Clearby Research, its personnel and service providers from claims, losses or liabilities arising from:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>Your misuse of the Website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of applicable law</li>
              <li>Your infringement of third-party rights</li>
              <li>Materials or information supplied by you without the required rights or permissions</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Section 22 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">22. Confidentiality</h2>
            <p className="mb-3">Both parties are expected to treat confidential information received during a professional engagement appropriately.</p>
            <p className="mb-2 font-semibold text-brand-purple">Confidentiality obligations do not apply to information that:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>Is already publicly available</li>
              <li>Was lawfully known before disclosure</li>
              <li>Is independently developed</li>
              <li>Is required to be disclosed by law or a competent authority</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Section 23 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">23. Termination</h2>
            <p className="mb-3">We may suspend or terminate access to the Website or discontinue a service where reasonably necessary, including where:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-xs text-gray-600">
              <li>These Terms are violated</li>
              <li>Fraudulent or unlawful activity is suspected</li>
              <li>Required payments are not made</li>
              <li>The service cannot reasonably be provided</li>
              <li>Continued engagement presents security, legal or operational concerns</li>
            </ul>
            <p className="text-xs text-gray-500">Any termination will not affect rights or obligations that accrued before termination.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 24 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">24. Privacy</h2>
            <p className="mb-3">Our collection and use of personal information is governed by our Privacy Policy.</p>
            <p className="text-xs text-gray-500">You should review the Privacy Policy before submitting personal information through the Website.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 25 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">25. Changes to These Terms</h2>
            <p className="mb-3">We may update these Terms from time to time.</p>
            <p className="mb-3 text-xs text-gray-600">The revised Terms will be published on this page with an updated &quot;Last Updated&quot; date.</p>
            <p className="text-xs text-gray-500">Your continued use of the Website after changes are published may constitute acceptance of the revised Terms to the extent permitted by applicable law.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 26 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">26. Governing Law and Jurisdiction</h2>
            <p className="mb-3">These Terms shall be governed by the laws applicable in India.</p>
            <p className="text-xs text-gray-500">Any dispute arising in connection with these Terms or the services shall be subject to the jurisdiction of the competent courts in Pune, Maharashtra, India, unless otherwise required by applicable law.</p>
          </div>

          <hr className="border-gray-200" />

          {/* Section 27 */}
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-purple mb-4">27. Contact Us</h2>
            <p className="mb-3">For questions regarding these Terms & Conditions, please contact:</p>
            
            <div className="bg-brand-light p-6 rounded-sm border border-gray-200 space-y-2 text-xs text-gray-700">
              <p className="font-bold text-brand-purple">E-Clearby Research Consulting Pvt. Ltd.</p>
              <p><strong className="text-gray-900">Website:</strong> <a href="https://www.clearbyresearch.com" className="text-brand-purple underline">www.clearbyresearch.com</a></p>
              <p><strong className="text-gray-900">Email:</strong> <a href="mailto:contact@clearbyresearch.com" className="text-brand-purple underline">contact@clearbyresearch.com</a></p>
              <p><strong className="text-gray-900">Phone:</strong> +91 70201 12146</p>
              <p><strong className="text-gray-900">Address:</strong> VJ Indilife Sus-Pashan Road, Vardayani Society, Sutarwadi, Pashan Pune, Maharashtra 411021</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}