"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Modal = ({ onClose, currentUser }) => {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPlace, setEditingPlace] = useState(null)

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://ctsimp-backend.test/api/places?user=${encodeURIComponent(currentUser)}`)
        if (response.ok) {
          const data = await response.json()
          setPlaces(data)
        } else {
          console.error("Failed to fetch places")
        }
      } catch (error) {
        console.error("Error fetching places:", error)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      fetchPlaces()
    }
  }, [currentUser])

  const handleSave = async (updatedPlace) => {
    try {
      const response = await fetch(`http://ctsimp-backend.test/api/places/${updatedPlace.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updatedPlace),
      })

      if (response.ok) {
        const updatedPlaces = places.map(p => 
          p.id === updatedPlace.id ? updatedPlace : p
        )
        setPlaces(updatedPlaces)
        setEditingPlace(null)
      } else {
        console.error("Failed to update place")
      }
    } catch (error) {
      console.error("Error updating place:", error)
    }
  }

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const EditForm = ({ place, onCancel, onSave }) => {
    const [formData, setFormData] = useState(place)
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSave(formData)
    }
  
    return (
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Place Name*</label>
              <input
                type="text"
                name="place_name"
                value={formData.place_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Address*</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                rows="3"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address*</label>
              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number*</label>
              <input
                type="tel"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                rows="4"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Entrance Fee</label>
              <input
                type="number"
                name="entrance"
                value={formData.entrance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                min="0"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Room/Cottages Prices</label>
              <textarea
                name="room_or_cottages_price"
                value={formData.room_or_cottages_price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                rows="3"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Virtual Tour Iframe</label>
              <textarea
                name="virtual_iframe"
                value={formData.virtual_iframe}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm font-mono text-xs"
                rows="3"
                placeholder="<iframe>...</iframe>"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Map Iframe</label>
              <textarea
                name="map_iframe"
                value={formData.map_iframe}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm font-mono text-xs"
                rows="3"
                placeholder="<iframe>...</iframe>"
              />
            </div>
          </div>
        </div>
  
        {/* Full Width Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">History</label>
            <textarea
              name="history"
              value={formData.history}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              rows="4"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Activities</label>
            <textarea
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              rows="4"
              placeholder="List activities separated by commas"
            />
          </div>
        </div>
  
        <div className="flex justify-end space-x-4 pt-6">
          <motion.button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </div>
      </motion.form>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-10"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center">
            {editingPlace ? (
              <>
                <motion.button
                  onClick={() => setEditingPlace(null)}
                  className="text-white hover:text-emerald-100 mr-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </motion.button>
                <motion.h2
                  className="text-xl font-semibold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  Edit Destination
                </motion.h2>
              </>
            ) : (
              <>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </motion.svg>
                <motion.h2
                  className="text-xl font-semibold text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  Submitted Destinations
                </motion.h2>
              </>
            )}
          </div>
          <motion.button
            onClick={editingPlace ? () => setEditingPlace(null) : onClose}
            className="text-white hover:text-emerald-100 transition-colors duration-300"
            whileHover={{ rotate: 90 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </motion.div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
          <AnimatePresence mode="wait">
            {editingPlace ? (
              <EditForm
                place={editingPlace}
                onCancel={() => setEditingPlace(null)}
                onSave={handleSave}
              />
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {places.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-emerald-50">
                          <motion.th
                            className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Full Name
                          </motion.th>
                          <motion.th
                            className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Tourist Spot
                          </motion.th>
                          <motion.th
                            className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Address
                          </motion.th>
                          <motion.th
                            className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Status
                          </motion.th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-100">
                        {places.map((place, index) => (
                          <motion.tr
                            key={index}
                            className="hover:bg-emerald-50 transition-colors duration-300"
                            custom={index}
                            variants={tableRowVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{place.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-700">
                              {place.place_name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{place.address}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <div className="flex items-center gap-2">
                                <motion.span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    place.status === "Pending"
                                      ? "bg-amber-100 text-amber-800"
                                      : place.status === "Approved"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  {place.status === "Pending" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 mr-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                  )}
                                  {place.status === "Approved" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 mr-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                  )}
                                  {place.status === "Rejected" && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3 mr-1"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="15" y1="9" x2="9" y2="15"></line>
                                      <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                  )}
                                  {place.status}
                                </motion.span>
                                {place.status === "Approved" && (
                                  <motion.button
                                    onClick={() => setEditingPlace(place)}
                                    className="text-emerald-700 hover:text-emerald-900 text-sm font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Edit
                                  </motion.button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-emerald-300 mx-auto mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </motion.svg>
                    <motion.h3
                      className="text-lg font-medium text-gray-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      No Records Found
                    </motion.h3>
                    <motion.p
                      className="text-gray-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      No destinations have been submitted yet
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <motion.button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "rgb(236, 253, 245)" }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Modal