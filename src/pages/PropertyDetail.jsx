import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import Carousel from "../components/ui/carousel"  // ReactBits Carousel

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`properties/${id}/`)
      .then(res => setProperty(res.data))
      .catch(() => setProperty(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!property) return <p>Property not found.</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold">{property.title}</h1>

        <div style={{ height: "400px", position: "relative" }}>
          <Carousel
            baseWidth={800}  // adjust width suitable for your layout
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
            items={property.media}  // pass your media array
          />
        </div>

        {/* The rest of your details */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <p>{property.description_beautified || property.description_raw}</p>
          {/* etc */}
        </div>
      </div>
    </div>
  )
}
