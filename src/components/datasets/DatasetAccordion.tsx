import { FC, ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DatasetAccordionItem {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface DatasetAccordionProps {
  items: DatasetAccordionItem[];
}

export const DatasetAccordion: FC<DatasetAccordionProps> = ({ items }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-left text-xl font-semibold hover:no-underline">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
