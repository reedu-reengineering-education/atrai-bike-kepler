// // components/WelcomeModal.tsx
// interface WelcomeModalProps {
//   isOpen: boolean;
//   onStart: () => void;
//   onSkip: () => void;
// }

// const WelcomeModal = ({ isOpen, onStart, onSkip }: WelcomeModalProps) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 bg-opacity-70 flex items-center justify-center z-[10001]"
//     // style={{ pointerEvents: "auto" }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-4"
//       // style={{ pointerEvents: "auto" }}
//       >
//         <h2 className="text-2xl font-bold mb-4">Welcome to our website!</h2>
//         <p className="text-gray-700 mb-6">
//           Would you like to take a guided tour of the website features?
//         </p>
//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={onSkip}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//           >
//             Skip Tour
//           </button>
//           <button
//             onClick={onStart}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Start Tour
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeModal;

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
