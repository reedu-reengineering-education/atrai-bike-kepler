import { TooltipRenderProps } from "react-joyride";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const ShadcnTourTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <div {...tooltipProps} className="z-[20000]">
      <Card className="w-80 shadow-xl">
        {/* <CardHeader className="text-base font-semibold">
          Step {index + 1}
        </CardHeader> */}

        <CardContent className="text-sm text-muted-foreground">
          {step.content}
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="outline" size="sm" {...backProps}>
                Back
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {continuous && (
              <Button size="sm" {...primaryProps}>
                {/* {primaryProps.title} */}
                Next
              </Button>
            )}
            <Button variant="ghost" size="sm" {...skipProps}>
              Skip
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShadcnTourTooltip;
