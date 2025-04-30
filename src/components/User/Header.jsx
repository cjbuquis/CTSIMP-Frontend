"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReviewDialog from "./ReviewDialog"

// Custom icons
const HelpCircleIcon = (props) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
)

const LogOutIcon = (props) => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

const ListIcon = (props) => (
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
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
)

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

const EditIcon = (props) => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
)

const SubmissionsModal = ({ isOpen, onClose, onEdit, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Your Submissions</h3>
              <button onClick={onClose} className="text-white hover:text-emerald-100 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
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
      )}
    </AnimatePresence>
  )
}

const Header = ({ onOpenModal, onEditSubmission }) => {
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const jwt = localStorage.getItem("jwt")

    if (userData && jwt) {
      const user = JSON.parse(userData)
      setCurrentUser(user.name || user.email || "")

      fetch(`http://tourism-backend.test/api/users/${user.id}/places`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch submissions")
          }
          return response.json()
        })
        .then((data) => {
          setSubmissions(data)
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error)
        })
    } else {
      console.error("User not authenticated. Redirecting to login.")
      window.location.href = "/login"
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.href = "/login"
  }

  const handleOpenSubmissions = (e) => {
    e.preventDefault()
    setIsSubmissionsModalOpen(true)
  }

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission)
    setIsReviewDialogOpen(true)
  }

  return (
    <>
      <motion.div
        className="mb-8 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-emerald-800">Submit New Destination</h2>
          <p className="text-emerald-600 text-sm">Fill in the details to add a new tourism spot</p>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={handleOpenSubmissions}
            type="button"
            className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors duration-300 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ListIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">My Submissions</span>
            {submissions.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {submissions.length}
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={onOpenModal}
            type="button"
            className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircleIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Help</span>
          </motion.button>

          <motion.button
            onClick={handleLogout}
            type="button"
            className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOutIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <SubmissionsModal
        isOpen={isSubmissionsModalOpen}
        onClose={() => setIsSubmissionsModalOpen(false)}
        onEdit={onEditSubmission}
      >
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{submission.place_name}</h3>
                  <p className="text-sm text-gray-600">{submission.address}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    submission.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : submission.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-sm text-gray-700">{submission.description}</p>
                {submission.status === "Approved" && (
                  <button
                    className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                    onClick={() => handleViewSubmission(submission)}
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SubmissionsModal>

      <ReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        submission={selectedSubmission}
      />
    </>
  )
}

export default Header
