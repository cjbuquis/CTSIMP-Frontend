"use client"

import { motion } from "framer-motion"

// Custom X icon
const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const Modal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Help & Instructions</h3>
          <button onClick={onClose} className="text-white hover:text-emerald-100 transition-colors">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700 mb-2">How to Submit a Destination</h4>
              <p className="text-sm text-gray-600">
                Fill in all the required fields with accurate information about the tourism destination. Upload a
                high-quality image that showcases the beauty of the place.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-2">Google Maps Embed</h4>
              <p className="text-sm text-gray-600">To add a Google Maps embed:</p>
              <ol className="text-sm text-gray-600 list-decimal ml-5 mt-2 space-y-1">
                <li>Go to Google Maps and search for your location</li>
                <li>Click on "Share" and select "Embed a map"</li>
                <li>Copy the iframe code and paste it in the Google Map iframe field</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-2">Visual Tour Embed</h4>
              <p className="text-sm text-gray-600">To add a visual tour:</p>
              <ol className="text-sm text-gray-600 list-decimal ml-5 mt-2 space-y-1">
                <li>Create a virtual tour using a service like Webobook</li>
                <li>Get the embed code from your virtual tour provider</li>
                <li>Paste the iframe code in the Visual Tour iframe field</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-emerald-700 mb-2">Submission Process</h4>
              <p className="text-sm text-gray-600">
                After submitting, your destination will be reviewed by our admin.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 border-t border-emerald-100">
          <button
            onClick={onClose}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors duration-300"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
