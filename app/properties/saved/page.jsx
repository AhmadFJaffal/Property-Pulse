"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/general_utils/Spinner";
import PropertyCard from "@/components/PropertyCard";

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookmarks", {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setSavedProperties(data);
        } else {
          toast.error("An error occurred");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {savedProperties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.map((savedProperties) => (
              <PropertyCard
                key={savedProperties._id}
                property={savedProperties}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
