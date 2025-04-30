"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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

const SubmissionsModal = ({ isOpen, onClose, onEdit }) => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    if (!isOpen) return

    // Get current user from local storage
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        setCurrentUser(user.name || user.email || "")
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }

    // In a real app, you would fetch this from your API
    // For now, we'll use mock data that includes the current user's submissions
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, you would fetch this from your API
      // This mock data assumes the current user has submissions
      const mockSubmissions = [
        {
          id: 1,
          place_name: "Tinuy-an Falls",
          status: "Approved",
          date: "2023-05-15",
          user: currentUser || "Current User",
          address: "Bislig, Surigao Del Sur",
          description: "Beautiful three-tiered waterfall known as the 'Niagara Falls of the Philippines'",
        },
        {
          id: 2,
          place_name: "Enchanted River",
          status: "Pending",
          date: "2023-06-20",
          user: currentUser || "Current User",
          address: "Hinatuan, Surigao Del Sur",
          description: "A deep blue river with mysterious depths and crystal clear waters",
        },
        {
          id: 3,
          place_name: "Britania Islands",
          status: "Rejected",
          date: "2023-07-10",
          user: currentUser || "Current User",
          address: "San Agustin, Surigao Del Sur",
          description: "A group of 24 islets with white sand beaches and crystal clear waters",
        },
      ]

      setSubmissions(mockSubmissions)
      setLoading(false)
    }, 1000)
  }, [isOpen, currentUser])

  const handleEdit = (submission) => {
    onClose()
    onEdit(submission)
  }

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

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
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
                      <div className="p-4">
                        <p className="text-sm text-gray-700 mb-3">{submission.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Submitted on {submission.date}</span>
                          <div className="space-x-2">
                            <button
                              className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                              onClick={() => window.open(`/destination/${submission.id}`, "_blank")}
                            >
                              View
                            </button>
                            {submission.status !== "Approved" && (
                              <button
                                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
                                onClick={() => handleEdit(submission)}
                              >
                                <EditIcon className="h-3 w-3 mr-1" /> Edit
                              </button>
                            )}
                            {submission.status === "Pending" && (
                              <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-emerald-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">You haven't submitted any destinations yet.</p>
                  <p className="text-gray-500 mt-1">Your submissions will appear here once you create them.</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Create Your First Submission
                  </button>
                </div>
              )}
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
      )}
    </AnimatePresence>
  )
}

const Header = ({ onOpenModal, onEditSubmission }) => {
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    // Get current user from local storage
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        setCurrentUser(user.name || user.email || "")
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }

    // This would typically be fetched from your API
    // For now, we'll use mock data
    const mockSubmissions = [
      {
        id: 1,
        place_name: "Tinuy-an Falls",
        status: "Approved",
        date: "2023-05-15",
        user: currentUser || "Current User",
      },
      {
        id: 2,
        place_name: "Enchanted River",
        status: "Pending",
        date: "2023-06-20",
        user: currentUser || "Current User",
      },
      {
        id: 3,
        place_name: "Britania Islands",
        status: "Rejected",
        date: "2023-07-10",
        user: currentUser || "Current User",
      },
    ]

    setSubmissions(mockSubmissions)
  }, [currentUser])

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear()
    // Clear local storage
    localStorage.clear()
    // Redirect to Home page
    window.location.href = "src/components/Auth/Home.jsx"
  }

  const handleOpenSubmissions = (e) => {
    e.preventDefault() // Prevent form submission
    setIsSubmissionsModalOpen(true)
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
            type="button" // Explicitly set button type to prevent form submission
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
            type="button" // Explicitly set button type to prevent form submission
            className="flex items-center text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircleIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Help</span>
          </motion.button>

          <motion.button
            onClick={handleLogout}
            type="button" // Explicitly set button type to prevent form submission
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
      />
    </>
  )
}

export default Header
