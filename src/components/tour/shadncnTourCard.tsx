import { TooltipRenderProps } from "react-joyride";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ShadcnTourTooltip = ({
  continuous,
  index,
  isLastStep, // <--- use this!
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <div {...tooltipProps} className="z-[20000]">
      <Card className="w-80 shadow-xl">
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
            {continuous && !isLastStep && (
              <Button size="sm" {...primaryProps}>
                Next
              </Button>
            )}
            {isLastStep && (
              <Button size="sm" {...primaryProps}>
                Finish
              </Button>
            )}
            {!isLastStep && (
              <Button variant="ghost" size="sm" {...skipProps}>
                Skip
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShadcnTourTooltip;

