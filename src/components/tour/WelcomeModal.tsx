import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface WelcomeModalProps {
  isOpen: boolean;
  onStart: () => void;
  onSkip: () => void;
}

const WelcomeModal = ({ isOpen, onStart, onSkip }: WelcomeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onSkip()}>
      <DialogContent
        className="sm:max-w-md softer-overlay"
       
      >
        <DialogHeader>
          <DialogTitle>Welcome to ATRAI DATA PLATFORM! <img src="/logo.png" alt="ATRAI DATA PLATFORM Logo" className="ml-2 inline-block w-8 h-8"></img></DialogTitle>
          <DialogDescription>
            Would you like to take a guided tour of the website features?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={onSkip}>
            Skip Tour
          </Button>
          <Button onClick={onStart}>
            Start Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
