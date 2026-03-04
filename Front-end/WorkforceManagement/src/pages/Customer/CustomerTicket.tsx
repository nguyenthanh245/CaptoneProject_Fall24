import TicketStep from "../../components/Customer/TicketStep";
import TicketForm from "../../components/Customer/TicketForm";
import { useState } from "react";
import TicketTerm from "../../components/Customer/TicketTerm";
import TicketConfirm from "../../components/Customer/TicketConfirm";
import TicketSuccess from "../../components/Customer/TicketSuccess";

type TTicketForm = {
  projectName: string;
  description: string;
  urls: string;
  estimatedate: string;
};

export default function CustomerTicket() {
  const [step, setStep] = useState<number>(1);
  const [ticketForm, setTicketForm] = useState<TTicketForm>({
    projectName: "",
    description: "",
    urls: "",
    estimatedate: "",
  });
  return (
    <div className="w-full">
      <TicketStep step={step} />

      {step === 1 && (
        <TicketForm
          setStep={setStep}
          ticketForm={ticketForm}
          setTicketForm={setTicketForm}
        />
      )}

      {step === 2 && <TicketTerm setStep={setStep} />}

      {step === 3 && (
        <TicketConfirm setStep={setStep} ticketForm={ticketForm} />
      )}

      {step === 4 && <TicketSuccess />}
    </div>
  );
}
