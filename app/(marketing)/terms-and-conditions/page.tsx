import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for the use of DRS Health website at https://drshealth.in/',
  openGraph: {
    title: 'Terms and Conditions | DRS Health',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
          Terms and Conditions
        </h1>
        <p className="text-sm text-body-muted mb-10">
          Last updated: October 2022
        </p>

        <div className="prose prose-neutral max-w-none space-y-8 text-body-muted leading-relaxed">
          <p>
            Welcome to DRS Health! These terms and conditions outline the rules and regulations for the use of DRS Health&apos;s Website, located at{' '}
            <a href="https://drshealth.in/" className="text-primary hover:underline">https://drshealth.in/</a>.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use DRS Health if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Terminology</h2>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of India. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing DRS Health, you agreed to use cookies in agreement with the DRS Health&apos;s Privacy Policy.
          </p>
          <p>
            Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">License</h2>
          <p>
            Unless otherwise stated, DRS Health and/or its licensors own the intellectual property rights for all material on DRS Health. All intellectual property rights are reserved. You may access this from DRS Health for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Republish material from DRS Health</li>
            <li>Sell, rent or sub-license material from DRS Health</li>
            <li>Reproduce, duplicate or copy material from DRS Health</li>
            <li>Redistribute content from DRS Health</li>
          </ul>
          <p className="mt-4">
            This Agreement shall begin on the date hereof.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Comments</h2>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. DRS Health does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of DRS Health, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, DRS Health shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
          </p>
          <p>
            DRS Health reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
          </p>
          <p>You warrant and represent that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
          <p className="mt-4">
            You hereby grant DRS Health a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Hyperlinking to our Content</h2>
          <p>
            The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors (in the same manner as they hyperlink to other listed businesses); and System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.
          </p>
          <p>
            These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party&apos;s site.
          </p>
          <p>
            We may consider and approve other link requests from commonly-known consumer and/or business information sources; dot.com community sites; associations or other groups representing charities; online directory distributors; internet portals; accounting, law and consulting firms; and educational institutions and trade associations. We will approve link requests if we decide that: (a) the link would not make us look unfavorably; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of DRS Health; and (d) the link is in the context of general resource information.
          </p>
          <p>
            Approved organizations may hyperlink by use of our corporate name; or by use of the uniform resource locator being linked to; or by use of any other description that makes sense within the context of the linking party&apos;s site. No use of DRS Health&apos;s logo or other artwork will be allowed for linking absent a trademark license agreement.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">iFrames</h2>
          <p>
            Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Content Liability</h2>
          <p>
            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Your Privacy</h2>
          <p>
            Please read our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Reservation of Rights</h2>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Removal of links from our website</h2>
          <p>
            If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.
          </p>
          <p>
            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-10">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will: limit or exclude our or your liability for death or personal injury; limit or exclude our or your liability for fraud or fraudulent misrepresentation; limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law.
          </p>
          <p>
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
          </p>
          <p>
            As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
          </p>
        </div>

        <p className="mt-12 text-body-muted text-sm">
          <Link href="/contact" className="text-primary hover:underline">Contact us</Link> for any questions about these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
