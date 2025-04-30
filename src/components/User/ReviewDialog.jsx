"use client"

import { motion } from "framer-motion"

const ReviewDialog = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Submission Details</h3>
          <button onClick={onClose} className="text-white hover:text-emerald-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium text-emerald-700">Place Name</h4>
            <p className="text-sm text-gray-600">{submission.place_name}</p>
          </div>
          <div>
            <h4 className="font-medium text-emerald-700">Address</h4>
            <p className="text-sm text-gray-600">{submission.address}</p>
          </div>
          <div>
            <h4 className="font-medium text-emerald-700">Description</h4>
            <p className="text-sm text-gray-600">{submission.description}</p>
          </div>
          <div>
            <h4 className="font-medium text-emerald-700">Status</h4>
            <p className="text-sm text-gray-600">{submission.status}</p>
          </div>
          <div>
            <h4 className="font-medium text-emerald-700">Submitted On</h4>
            <p className="text-sm text-gray-600">{submission.date}</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 border-t border-emerald-100">
          <button
            onClick={onClose}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ReviewDialog