
// Re-export from the correct source (sonner)
import { toast } from "sonner";

export { toast };

// For compatibility with any existing code
export const useToast = () => {
  return { toast };
};
