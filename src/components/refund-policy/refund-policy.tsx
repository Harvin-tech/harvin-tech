import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PolicySection = ({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {Array.isArray(content) ? (
      <ul className="list-disc pl-6 space-y-2">
        {content.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700">{content}</p>
    )}
  </div>
);

const RefundPolicy = ({ policies = defaultPolicies }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto my-4 bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Refund Policy
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {policies.map((section, index) => (
            <PolicySection
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const defaultPolicies = [
  {
    title: 'Information Collection',
    content:
      'Harvinn technologies may collects information in several ways. When you register for a course available with us, we may ask for contact information such as your name, address, telephone number and e-mail address, and for billing information. We may also ask you to complete certain forms or surveys that gather information about you, your academic background, business, profession, job and your opinions or comments. Correspondence sent to us by you or by third parties about your activities, including letters or emails, may be collected into a file specific to you.',
  },
  {
    title: 'Refund & Cancellation Policy',
    content: [
      'Pre-Registration amount refund (Rs. 1000/-) – No refund in any case',
      'Refund policy for full fees – The refund will be considered only before the commencement of the batch within 24hrs after pre-registration for which the student is registered',
      'Applications for refund shall be submitted to the Program Director',
    ],
  },
  {
    title: 'Payment Policy',
    content: [
      'All fees are accepted in the form of Cheque/Demand Draft/ECS/Credit & Debit card/UPI/crypto/Paypal/Zest/Bajaj fin/Gray quest. No cash transactions are accepted.',
      'For confirmation of admission, the requisite amount of fees has to be paid.',
      'A student can opt for payment of fees either through the Lumpsum payment option, or, the Loan Instalment through available payment partner.',
      'Fees once paid are not refundable, under any circumstances.',
      'Harvinn provides options for students wishing for a break in study due to unavoidable circumstances. For details please contact your academic counsellor.',
      "In case of non-payment/delay in payment beyond 15 days/bounced cheque, the Institute reserves the right to cancel the student's admission, at its sole discretion without any information or intimation.",
      'All doc and KYC requirement should be submitted at the time of admission',
    ],
  },
  {
    title: 'Price Changes',
    content:
      'We reserve the right to modify, terminate, or otherwise amend the fees and features associated with your subscription. If we notify you in advance of at least fifteen (15) days, your continued use of dexterity and the Online and/or blended learning course after the changes have been made will constitute your acceptance of the changes. If you do not wish to continue subscribing with the new fees or features, you may terminate your subscription by cancelling at any time. If you accept the new subscription, its terms and conditions with these Terms will apply for all future months.',
  },
  {
    title: 'Taxes',
    content:
      'When you purchase any Online and/or blended learning course or other Service or product from Harvinn Technologies, you agree to pay not only the applicable fee, but also all applicable sales, use, value-added, transaction taxes, or other government-required fees and charges that Harvinn technologies determines it is required to collect (taxes). Please note that Harvinn technologies will calculate the Estimated Taxes at checkout and that, upon confirmation, you may be responsible for a different total. All applicable taxes are calculated based on the billing information you provide us at the time of purchase. You hereby authorize Harvinn technologies to modify and charge any Taxes owed by you upon confirming the tax rate. Please also note that where GST/VAT collection is required, if any, GST/VAT will be calculated and added at checkout. You hereby agree to indemnify and hold Harvinn technologies harmless against any and all claims by any tax authority for any underpayment of any Taxes, including, without limitation, GST/VAT, and any related penalties and/or interest.',
  },
];

export default RefundPolicy;
