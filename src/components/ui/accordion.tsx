"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border",
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("data-open:bg-muted/50 not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between gap-6 border border-transparent p-4 text-left text-sm font-medium transition-all outline-none hover:underline disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4",
          className,
        )}
        {...props}
      >
        {children}
        <div className="pointer-events-none flex shrink-0 items-center justify-center rounded-full bg-black/20 p-1 text-white group-aria-expanded/accordion-trigger:hidden">
          <FaPlus
            size={13}
            // data-slot="accordion-trigger-icon"
            color="#FFFFFF"
          />
        </div>
        <div className="pointer-events-none hidden shrink-0 items-center justify-center rounded-full bg-black p-1 text-white group-aria-expanded/accordion-trigger:flex">
          <FaMinus
            size={13}
            // data-slot="accordion-trigger-icon"
            color="#FFFFFF"
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden px-4 text-sm"
      {...props}
    >
      <div
        className={cn(
          "[&_a]:hover:text-foreground h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
