import { CustomToastProps } from "../types";

export const CustomToast: React.FC<CustomToastProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed z-50 flex items-center px-4 py-2 mb-4 space-x-2 text-white transition-all duration-500 transform -translate-x-1/2 rounded-lg shadow-lg opacity-100 bottom-5 left-1/2 bg-gradient-to-r from-blue-600 to-blue-700 animate-fade-in-out">
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 font-bold text-white">
        x
      </button>
    </div>
  );
};
