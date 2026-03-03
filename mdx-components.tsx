import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/Callout";
import { StepGuide, Step } from "@/components/StepGuide";
import { InfoTable } from "@/components/InfoTable";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    Callout,
    StepGuide,
    Step,
    InfoTable,
    ...components,
  };
}
