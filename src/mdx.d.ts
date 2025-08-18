declare module "@mdx-js/react" {
  import { ComponentType, HTMLAttributes } from "react";

  type MDXComponents = {
    [key in keyof JSX.IntrinsicElements]?: ComponentType<
      HTMLAttributes<HTMLElement>
    >;
  } & {
    [componentName: string]: ComponentType<any>;
  };

  export const MDXProvider: ComponentType<{
    components?: MDXComponents;
    disableParentContext?: boolean;
    children?: React.ReactNode;
  }>;
}
