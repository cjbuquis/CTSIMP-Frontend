"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "", // This will be populated from sessionStorage
    place_name: "", // User will input this manually
    province: "", // Changed to dropdown selection
    address: "",
    email_address: "",
    contact_no: "",
    entrance_fee: "", // newly added
    activities: "", // newly added
    services: "", // newly added
    description: "",
    virtual_iframe: "",
    map_iframe: "",
    image_link: null,
    status: "Pending",
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "", // "success" or "error"
  })
  const [formSection, setFormSection] = useState("basic") // basic, details, media
  const [formProgress, setFormProgress] = useState(33)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // List of provinces in the Philippines (focusing on Caraga Region)
  const provinces = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Dinagat Islands"]

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const userData = sessionStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData((prevData) => ({ ...prevData, name: user.name }))
    }
  }, [])

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification.show])

  // Update form progress based on section
  useEffect(() => {
    if (formSection === "basic") setFormProgress(33)
    else if (formSection === "details") setFormProgress(66)
    else if (formSection === "media") setFormProgress(100)
  }, [formSection])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({ ...prevData, image_link: file }))

      // Generate a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFormData((prevData) => ({ ...prevData, image_link: null }))
      setImagePreview(null)
    }
  }

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLoading(true)

    const submitFormData = new FormData()
    for (const key in formData) {
      submitFormData.append(key, formData[key])
    }

    try {
      const response = await fetch("http://tourism_backend.test/api/places", {
        method: "POST",
        body: submitFormData,
      })

      if (response.ok) {
        showNotification("Spot submitted for review!", "success")
        setFormData({
          name: formData.name,
          place_name: "",
          province: "",
          address: "",
          email_address: "",
          contact_no: "",
          entrance_fee: "",
          activities: "",
          services: "",
          description: "",
          virtual_iframe: "",
          map_iframe: "",
          image_link: null,
          status: "Pending",
        })
        setImagePreview(null)
        setFormSection("basic")
      } else {
        showNotification("Failed to submit spot. Please try again.", "error")
        console.error("Failed to submit spot:", response.status)
      }
    } catch (error) {
      showNotification("An error occurred. Please try again later.", "error")
      console.error("An error occurred:", error)
    } finally {
      setLoading(false)
      setIsSubmitting(false)
    }
  }

  const nextSection = () => {
    if (formSection === "basic") setFormSection("details")
    else if (formSection === "details") setFormSection("media")
  }

  const prevSection = () => {
    if (formSection === "media") setFormSection("details")
    else if (formSection === "details") setFormSection("basic")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-emerald-900 bg-opacity-80"></div>

      <motion.div
        className="relative z-10 container mx-auto p-6 md:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header with animated underline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Submit a New Spot</h1>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-4 animate-[growWidth_1s_ease-out]"></div>
            <p className="text-gray-200">Share the beauty of Caraga with the world</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-white">Progress</span>
              <span className="text-sm font-medium text-white">{formProgress}%</span>
            </div>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-200">
              <span className={formSection === "basic" ? "font-bold text-white" : ""}>Basic Info</span>
              <span className={formSection === "details" ? "font-bold text-white" : ""}>Details</span>
              <span className={formSection === "media" ? "font-bold text-white" : ""}>Media</span>
            </div>
          </div>

          {/* Form card with glass effect */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Basic Info Section */}
              <AnimatePresence mode="wait">
                {formSection === "basic" && (
                  <motion.div
                    key="basic"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-semibold text-emerald-800 mb-6 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Place Name */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="place_name" className="block text-sm font-medium text-emerald-700 mb-1">
                          Place Name
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
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                          <input
                            id="place_name"
                            type="text"
                            placeholder="e.g, Tinuy-an Falls"
                            value={formData.place_name || ""}
                            onChange={handleChange}
                            name="place_name"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Province - Changed to dropdown */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="province" className="block text-sm font-medium text-emerald-700 mb-1">
                          Province
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
                              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </div>
                          <select
                            id="province"
                            value={formData.province || ""}
                            onChange={handleChange}
                            name="province"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
                            required
                          >
                            <option value="" disabled>
                              Select Province
                            </option>
                            {provinces.map((province) => (
                              <option key={province} value={province}>
                                {province}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Address */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="address" className="block text-sm font-medium text-emerald-700 mb-1">
                          Address
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
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                          <input
                            id="address"
                            type="text"
                            placeholder="e.g, Bislig City"
                            value={formData.address || ""}
                            onChange={handleChange}
                            name="address"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Entrance Fee */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="entrance_fee" className="block text-sm font-medium text-emerald-700 mb-1">
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
                              <circle cx="12" cy="12" r="10" />
                              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                              <path d="M12 18V6" />
                            </svg>
                          </div>
                          <input
                            id="entrance_fee"
                            type="text"
                            placeholder="e.g, ₱50 per person"
                            value={formData.entrance_fee || ""}
                            onChange={handleChange}
                            name="entrance_fee"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Next Step
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Details Section */}
                {formSection === "details" && (
                  <motion.div
                    key="details"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-semibold text-emerald-800 mb-6 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Spot Details
                    </h2>

                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label htmlFor="email_address" className="block text-sm font-medium text-emerald-700 mb-1">
                            Email Address
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
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                            </div>
                            <input
                              id="email_address"
                              type="email"
                              placeholder="e.g, sample@gmail.com"
                              value={formData.email_address || ""}
                              onChange={handleChange}
                              name="email_address"
                              className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <label htmlFor="contact_no" className="block text-sm font-medium text-emerald-700 mb-1">
                            Contact Number
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
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 20.79 20.79 0 0 1-8.63-4.3A20.19 20.19 0 0 1 6.16 6.17A2 2 0 0 1 4 4.08v3a2 2 0 0 0 1 1.72A12.84 12.84 0 0 0 12 12.55a12.84 12.84 0 0 0 6.25 2.29A2 2 0 0 0 22 16.92z"></path>
                              </svg>
                            </div>
                            <input
                              id="contact_no"
                              type="tel"
                              placeholder="e.g, 09123456789"
                              value={formData.contact_no || ""}
                              onChange={handleChange}
                              name="contact_no"
                              className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                              required
                            />
                          </div>
                        </motion.div>
                      </div>

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
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <textarea
                            id="activities"
                            placeholder="List of activities available at this destination..."
                            value={formData.activities || ""}
                            onChange={handleChange}
                            name="activities"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] transition-all duration-300 shadow-sm hover:shadow-md"
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
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                              <line x1="12" y1="19" x2="12" y2="22"></line>
                            </svg>
                          </div>
                          <textarea
                            id="services"
                            placeholder="Available services (e.g., guides, rentals, food, accommodations)..."
                            value={formData.services || ""}
                            onChange={handleChange}
                            name="services"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] transition-all duration-300 shadow-sm hover:shadow-md"
                          />
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="description" className="block text-sm font-medium text-emerald-700 mb-1">
                          Description
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
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <textarea
                            id="description"
                            placeholder="Spot Description..."
                            value={formData.description || ""}
                            onChange={handleChange}
                            name="description"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[150px] transition-all duration-300 shadow-sm hover:shadow-md"
                            required
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
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
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Next Step
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Media Section */}
                {formSection === "media" && (
                  <motion.div
                    key="media"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 md:p-8"
                  >
                    <h2 className="text-xl font-semibold text-emerald-800 mb-6 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Media & Embeds
                    </h2>

                    <div className="space-y-6">
                      {/* Virtual Tour Iframe */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="virtual_iframe" className="block text-sm font-medium text-emerald-700 mb-1">
                          Virtual Tour Iframe
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
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                              <line x1="8" y1="21" x2="16" y2="21"></line>
                              <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                          </div>
                          <textarea
                            id="virtual_iframe"
                            placeholder="&lt;iframe src=&quot;your-virtual-tour-link&quot;&gt;&lt;/iframe&gt;"
                            value={formData.virtual_iframe || ""}
                            onChange={handleChange}
                            name="virtual_iframe"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] transition-all duration-300 shadow-sm hover:shadow-md"
                          />
                        </div>
                      </motion.div>

                      {/* Map Iframe */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="map_iframe" className="block text-sm font-medium text-emerald-700 mb-1">
                          Map Iframe
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
                              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                              <line x1="8" y1="2" x2="8" y2="18"></line>
                              <line x1="16" y1="6" x2="16" y2="22"></line>
                            </svg>
                          </div>
                          <textarea
                            id="map_iframe"
                            placeholder="&lt;iframe src=&quot;your-map-link&quot;&gt;&lt;/iframe&gt;"
                            value={formData.map_iframe || ""}
                            onChange={handleChange}
                            name="map_iframe"
                            className="pl-10 w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] transition-all duration-300 shadow-sm hover:shadow-md"
                          />
                        </div>
                      </motion.div>

                      {/* Image Upload */}
                      <motion.div variants={itemVariants}>
                        <label htmlFor="image_link" className="block text-sm font-medium text-emerald-700 mb-3">
                          Image Upload
                        </label>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="w-full md:w-auto">
                            <input
                              id="image_link"
                              type="file"
                              onChange={handleImageChange}
                              name="image_link"
                              className="hidden"
                            />
                            <label
                              htmlFor="image_link"
                              className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                            >
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
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              {imagePreview ? "Change Image" : "Upload Image"}
                            </label>
                          </div>
                          {imagePreview && (
                            <div className="relative group">
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, image_link: null }))
                                    setImagePreview(null)
                                  }}
                                  className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                              </div>
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Spot Preview"
                                className="h-32 w-32 object-cover rounded-lg shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
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
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                          loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Spot
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
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
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Success Animation */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 relative mb-4">
                  <motion.svg
                    className="w-16 h-16 text-emerald-500"
                    viewBox="0 0 50 50"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M16 25 L22 32 L34 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Your Submission</h3>
                <p className="text-gray-600 mb-6">Please wait while we upload your spot information...</p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Notification Component */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center ${
              notification.type === "success"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white"
            }`}
          >
            <div className="mr-3">
              {notification.type === "success" ? (
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              ) : (
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              )}
            </div>
            <div className="flex-1">{notification.message}</div>
            <button
              onClick={() => setNotification((prev) => ({ ...prev, show: false }))}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
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
    </motion.div>
  )
}

export default Dashboard
