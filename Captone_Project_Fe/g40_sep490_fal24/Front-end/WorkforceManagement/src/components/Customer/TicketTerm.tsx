import { useState } from "react";

export default function TicketTerm({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-50 shadow-md rounded-md my-10">
      <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
      <div className="max-h-96 overflow-y-auto">
        <p className="text-lg mb-4">
          By using our services, you agree to the following terms and
          conditions. You acknowledge that all information provided during
          registration is accurate and up-to-date. You understand that your
          account may be suspended or terminated if false or misleading
          information is detected. The services provided are subject to
          availability and may be modified or discontinued at any time without
          notice. You are responsible for the security of your login credentials
          and agree not to share your account with unauthorized individuals.
        </p>
        <p className="text-lg mb-4">
          By submitting a request or ticket, you consent to the collection and
          processing of your data in accordance with our privacy policy. We
          reserve the right to decline or modify any request based on internal
          review. You also agree to our data retention policies and understand
          that any misuse of the services may result in penalties as per the
          applicable laws.
        </p>
        <p className="text-lg mb-4">
          Our services are designed to provide secure and efficient solutions,
          but we make no guarantees regarding the outcome or findings from the
          vulnerability scanning process. Users must ensure their own compliance
          with local regulations and laws before using the scanning services.
          You must not use the services to infringe on the privacy, rights, or
          operations of third parties.
        </p>
        <p className="text-lg mb-4">
          Any disputes arising out of these terms and conditions shall be
          governed by the laws of the jurisdiction in which our company is
          registered. By continuing to use our platform, you confirm that you
          have read and understood all terms and conditions stated here and
          agree to abide by them. These terms are subject to updates and
          modifications at any time, and it is your responsibility to review
          them regularly.
        </p>
        <p className="text-lg mb-4">
          We emphasize that the information provided during vulnerability
          scanning is only indicative and not exhaustive. Users are encouraged
          to consult cybersecurity professionals for a more comprehensive
          analysis. Additionally, any intellectual property, trade secrets, or
          confidential data discovered during the service process will remain
          your sole property, and we will take all necessary measures to
          safeguard this information.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing our services. We hope to provide a seamless
          experience as you explore our solutions. If you have any questions or
          concerns, please feel free to reach out to our support team for
          assistance. Your satisfaction is our priority, and we are committed to
          providing you with the best possible service.
        </p>
        <p className="text-lg mb-4">
          We also reserve the right to monitor and log activity on our platform
          to ensure compliance with these terms. Any unauthorized access or
          misuse of the services will result in immediate account suspension and
          possible legal action. By using this service, you acknowledge and
          accept these measures as a part of our commitment to maintaining a
          secure platform.
        </p>
        <div className="flex items-center mb-6">
          <input
            id="agree"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => setIsChecked(!isChecked)}
          />
          <label
            htmlFor="agree"
            className="ml-2 text-lg font-medium text-red-700"
          >
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold text-base"
          onClick={() => setStep((prev) => prev - 1)}
        >
          Back
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded font-semibold text-base ${
            !isChecked ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={() => setStep((prev) => prev + 1)}
          disabled={!isChecked}
        >
          Next
        </button>
      </div>
    </div>
  );
}
