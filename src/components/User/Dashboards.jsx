"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Remove the lucide-react import
import Header from "./Header"
import FilePreview from "./FilePreview"
import Modal from "./Modal"

// Add custom icon components
const MapPinIcon = (props) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const MailIcon = (props) => (
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
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const PhoneIcon = (props) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const FileTextIcon = (props) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const MapIcon = (props) => (
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
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
)

const VideoIcon = (props) => (
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
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
)

const HistoryIcon = (props) => (
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
    <path d="M3 3v5h5"></path>
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path>
    <path d="M12 7v5l4 2"></path>
  </svg>
)

const CheckCircleIcon = (props) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const AlertCircleIcon = (props) => (
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
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
)

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [snackbar, setSnackbar] = useState({
    show: false,
    text: "",
    color: "",
  })
  const [formData, setFormData] = useState({
    name: "", // This will be populated from localStorage
    place_name: "",
    address: "",
    email_address: "",
    contact_no: "",
    description: "",
    virtual_iframe: "",
    map_iframe: "",
    image_link: null,
    status: "Pending",
    entrance: "",
    room_or_cottages_price: "",
    history: "",
    activities: "",
    services: "", // Add new services field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const fileInputRef = useRef(null)

  // Set the name field from localStorage when the component mounts
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        setFormData((prevData) => ({
          ...prevData,
          name: user.name || user.email || "",
        }))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
        setFormData((prevData) => ({
          ...prevData,
          image_link: file, // Set the image file for upload
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
      setFormData((prevData) => ({
        ...prevData,
        image_link: null,
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const showNotification = (text, color) => {
    setSnackbar({
      show: true,
      text,
      color,
    })

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, show: false }))
    }, 5000)
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    if (!formData.place_name) newErrors.place_name = "Place name is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.email_address) newErrors.email_address = "Email address is required"
    if (!formData.contact_no) newErrors.contact_no = "Contact number is required"
    if (!formData.description) newErrors.description = "Description is required"
    if (!previewUrl && !isEditing) newErrors.image_link = "Image is required"

    // Email validation
    if (formData.email_address && !/\S+@\S+\.\S+/.test(formData.email_address)) {
      newErrors.email_address = "Please enter a valid email address"
    }

    // Phone validation (simple check for now)
    if (formData.contact_no && !/^\d{10,11}$/.test(formData.contact_no.replace(/\D/g, ""))) {
      newErrors.contact_no = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      showNotification("Please fill in all required fields correctly", "error")
      return
    }

    setIsSubmitting(true)

    const formDataToSubmit = new FormData()

    // Append form data
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSubmit.append(key, formData[key])
      }
    }

    try {
      const endpoint = isEditing
        ? `http://tourism-backend.test/api/places/${editingId}`
        : "http://tourism-backend.test/api/places"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          Accept: "application/json",
        },
        body: formDataToSubmit,
      })

      const data = await response.json()
      if (response.ok) {
        console.log("Place " + (isEditing ? "updated" : "created") + ":", data.place)
        showNotification(`Place ${isEditing ? "updated" : "created"} successfully`, "success")

        // Reset form if creating new place
        if (!isEditing) {
          resetForm()
        }

        // Reset editing state
        setIsEditing(false)
        setEditingId(null)

        // Delay the page refresh to allow time to see the notification
        setTimeout(() => {
          window.location.reload()
        }, 3000) // 3 second delay
      } else {
        console.error("Error:", data.message)
        showNotification(data.message || `Error ${isEditing ? "updating" : "creating"} place`, "error")
      }
    } catch (error) {
      console.error("Error:", error)
      showNotification("Error submitting form. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: formData.name, // Keep the user name
      place_name: "",
      address: "",
      email_address: "",
      contact_no: "",
      description: "",
      virtual_iframe: "",
      map_iframe: "",
      image_link: null,
      status: "Pending",
      entrance: "",
      room_or_cottages_price: "",
      history: "",
      activities: "",
      services: "",
    })
    setPreviewUrl(null)
    setErrors({})
  }

  const handleEditSubmission = (submission) => {
    // Set form data with submission data
    setFormData({
      ...formData,
      place_name: submission.place_name,
      address: submission.address,
      description: submission.description,
      // Other fields would be populated here in a real app
    })

    // Set editing state
    setIsEditing(true)
    setEditingId(submission.id)

    // Show notification
    showNotification(`Editing ${submission.place_name}. Make your changes and submit.`, "success")

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const formVariants = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{ backgroundImage: "url(bg.jpg)" }}>
      <div className="absolute inset-0 bg-emerald-900 bg-opacity-80"></div>
      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.form
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          <motion.div
            className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mr-3"
              >
                <MapPinIcon className="h-8 w-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h1 className="text-2xl font-bold text-white">Caraga Tourism</h1>
                <p className="text-emerald-100 text-sm">
                  {isEditing ? "Edit Destination" : "Submit a New Destination"}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="p-6">
            <Header onOpenModal={() => setIsModalOpen(true)} onEditSubmission={handleEditSubmission} />

            {isEditing && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span className="font-medium text-blue-700">
                    You are editing an existing submission. Make your changes and click "Update Destination".
                  </span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setEditingId(null)
                      resetForm()
                    }}
                    className="px-3 py-1 text-sm bg-white border border-blue-300 text-blue-700 rounded hover:bg-blue-50"
                  >
                    Cancel Editing
                  </button>
                </div>
              </div>
            )}

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="lg:col-span-2 space-y-6" variants={containerVariants}>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={containerVariants}>
                  {/* Place Name */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="place_name" className="block text-sm font-medium text-emerald-700 mb-1">
                      Place Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        id="place_name"
                        type="text"
                        placeholder="e.g, Tinuy-an Falls"
                        value={formData.place_name}
                        onChange={handleChange}
                        name="place_name"
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.place_name ? "border-red-300 bg-red-50" : "border-emerald-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.place_name && <p className="mt-1 text-sm text-red-600">{errors.place_name}</p>}
                  </motion.div>

                  {/* Address */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="address" className="block text-sm font-medium text-emerald-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        id="address"
                        type="text"
                        placeholder="e.g, Bislig, Surigao Del Sur"
                        value={formData.address}
                        onChange={handleChange}
                        name="address"
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.address ? "border-red-300 bg-red-50" : "border-emerald-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </motion.div>

                  {/* Email Address */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g, example@gmail.com"
                        value={formData.email_address}
                        onChange={handleChange}
                        name="email_address"
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.email_address ? "border-red-300 bg-red-50" : "border-emerald-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.email_address && <p className="mt-1 text-sm text-red-600">{errors.email_address}</p>}
                  </motion.div>

                  {/* Contact No */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="contact" className="block text-sm font-medium text-emerald-700 mb-1">
                      Contact No. <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <input
                        id="contact"
                        type="tel"
                        placeholder="e.g, 09518149753"
                        value={formData.contact_no}
                        onChange={handleChange}
                        name="contact_no"
                        className={`pl-10 w-full px-4 py-2 border ${
                          errors.contact_no ? "border-red-300 bg-red-50" : "border-emerald-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
                      />
                    </div>
                    {errors.contact_no && <p className="mt-1 text-sm text-red-600">{errors.contact_no}</p>}
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="description" className="block text-sm font-medium text-emerald-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileTextIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <textarea
                      id="description"
                      placeholder="Spot Description..."
                      value={formData.description}
                      onChange={handleChange}
                      name="description"
                      className={`pl-10 w-full px-4 py-2 border ${
                        errors.description ? "border-red-300 bg-red-50" : "border-emerald-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] transition-all duration-300`}
                    />
                  </div>
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </motion.div>

                {/* Entrance Fee */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="entrance" className="block text-sm font-medium text-emerald-700 mb-1">
                    Entrance Fee
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <text x="6" y="18" fontSize="16" fontWeight="bold">
                          ₱
                        </text>
                      </svg>
                    </div>
                    <input
                      id="entrance"
                      type="text"
                      placeholder="e.g, ₱50 per person"
                      value={formData.entrance}
                      onChange={handleChange}
                      name="entrance"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Room/Cottages Price*/}
                <motion.div variants={itemVariants}>
                  <label htmlFor="roomPrice" className="block text-sm font-medium text-emerald-700 mb-1">
                    Room/Cottages Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <text x="6" y="18" fontSize="16" fontWeight="bold">
                          ₱
                        </text>
                      </svg>
                    </div>
                    <input
                      id="roomPrice"
                      type="text"
                      placeholder="e.g, ₱1500 per night"
                      value={formData.room_or_cottages_price}
                      onChange={handleChange}
                      name="room_or_cottages_price"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* History */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="history" className="block text-sm font-medium text-emerald-700 mb-1">
                    History
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <HistoryIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <textarea
                      id="history"
                      placeholder="Historical background..."
                      value={formData.history}
                      onChange={handleChange}
                      name="history"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Activities */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="activities" className="block text-sm font-medium text-emerald-700 mb-1">
                    Activities
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2l-4 4-4-4"></path>
                        <path d="M14 22l-4-4-4 4"></path>
                        <path d="M6 18V6"></path>
                        <path d="M18 18V6"></path>
                      </svg>
                    </div>
                    <textarea
                      id="activities"
                      placeholder="Available activities (e.g., hiking, sightseeing, camping)..."
                      value={formData.activities}
                      onChange={handleChange}
                      name="activities"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Services */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="services" className="block text-sm font-medium text-emerald-700 mb-1">
                    Services
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2H2v10h10V2z"></path>
                        <path d="M12 12H2v10h10V12z"></path>
                        <path d="M22 2h-10v10h10V2z"></path>
                        <path d="M22 12h-10v10h10V12z"></path>
                      </svg>
                    </div>
                    <textarea
                      id="services"
                      placeholder="Available services (e.g., Accommodation & Lodging, Food & Beverage Services, Equipment Rental & Support)..."
                      value={formData.services}
                      onChange={handleChange}
                      name="services"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Google Map iframe */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="googleMap" className="block text-sm font-medium text-emerald-700 mb-1">
                    Google Map iframe
                    <span className="ml-5">
                      <a
                        href="https://youtube.com/watch?v=T5FaFLeERLs&si=3rAhKhMruFZitpAb"
                        className="text-emerald-600 hover:text-emerald-700 underline transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (For Tutorial, click here)
                      </a>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MapIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <textarea
                      id="googleMap"
                      placeholder="e.g, (https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126440.1668895862!2d123.76526621796874!3d7.972554395731812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1732520001105!5m2!1sen!2sph)"
                      value={formData.map_iframe}
                      onChange={handleChange}
                      name="map_iframe"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] transition-all duration-300"
                      rows={4}
                    />
                  </div>
                </motion.div>

                {/* Visual Tour iframe */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="visualTour" className="block text-sm font-medium text-emerald-700 mb-1">
                    Visual Tour iframe
                    <span className="ml-5">
                      <a
                        href="https://webobook.com/embedded-virtual-tour"
                        className="text-emerald-600 hover:text-emerald-700 underline transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (For Tutorial, click here)
                      </a>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <VideoIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <textarea
                      id="visualTour"
                      placeholder="e.g, (https://webobook.com/public/67307f5970d3461cbc339ac2,en?ap=true&si=true&sm=false&sp=true&sfr=false&sl=false&sop=false&)"
                      value={formData.virtual_iframe}
                      onChange={handleChange}
                      name="virtual_iframe"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[80px] transition-all duration-300"
                      rows={2}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Image Preview */}
              <motion.div className="lg:col-span-1" variants={itemVariants}>
                <FilePreview previewUrl={previewUrl} onFileChange={handleFileChange} fileInputRef={fileInputRef} />
                {errors.image_link && <p className="mt-1 text-sm text-red-600">{errors.image_link}</p>}
              </motion.div>
            </motion.div>

            <motion.div className="mt-8 flex justify-end" variants={itemVariants}>
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-md transition duration-300 flex items-center justify-center shadow-md relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    {isEditing ? "Update Destination" : "Submit Destination"}
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-xs text-emerald-700">Department of Tourism - Caraga Region</p>
            <p className="text-xs text-emerald-600 mt-1">Discover the beauty and culture of Caraga</p>
          </motion.div>
        </motion.form>
      </motion.div>

      <AnimatePresence>{isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>

      {/* Notification Snackbar */}
      <AnimatePresence>
        {snackbar.show && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg flex items-center ${
              snackbar.color === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            <span className="mr-2">
              {snackbar.color === "success" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 20, 0] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CheckCircleIcon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                  <AlertCircleIcon className="h-5 w-5" />
                </motion.div>
              )}
            </span>
            <span>{snackbar.text}</span>
            <button
              onClick={() => setSnackbar((prev) => ({ ...prev, show: false }))}
              className="ml-4 text-white hover:text-gray-200 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard
