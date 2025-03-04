"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getQr } from "@/services/apicall";
import { Loader } from "lucide-react";

export default function BasicForm() {
  // State to manage form inputs
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") || "";
  const [isLoading, setIsLoading] = useState(true);
  interface DataType {
    id?: string;
    used?: boolean;
    [key: string]: any;
  }

  const [data, setData] = useState<DataType>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getQr(code);
        const validData = response?.id
          ? response
          : Object.values(response).find((obj: any) => obj.id);

        setData(validData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (code) fetchData();
  }, [code]);
  const bol = data?.used;
  console.log("data", bol);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
  });
  console.log("code", code);
  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Basic validation
    if (formData.code && formData.name && formData.email) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to a server
      alert("Form submitted successfully!");
    } else {
      alert("Please fill in all fields");
    }
  };
  if (data && isLoading) {
    return (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6  mt-10">
        <div className="flex items-center justify-center sm:h-[65vh] md:h-[80vh] col-span-full">
          <Loader className="animate-spin w-10 h-10 " />
        </div>
      </div>
    );
  }
  if (bol) {
    return (
      <div className="flex items-center justify-center h-[65vh]">
        <h1 className="text-2xl text-red-500">QR Code already used</h1>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 font-bold mb-2">
            Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter code"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter email"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
