// app/(admin)/admin/elections/create/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "../../../../../lib/api";
import { ArrowLeft, Plus, Trash2, Calendar, FileText, Users, Upload, X } from "lucide-react";

export default function ElectionForm() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    description  : "",
    startDate   : "",
    endDate     : "",
    candidates  : [
      { name: "", party: "", symbol: "", symbolPreview: null },
      { name: "", party: "", symbol: "", symbolPreview: null }
    ]
  });

  const [loading, setLoading] = useState(false);
  const fileInputRefs = useRef([]);

  useEffect(() => {
    if (isEdit && id) {
      fetchElection();
    }
  }, [id]);

  const fetchElection = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/admin/elections/${id}`);
      const e = res.data.election;
      setForm({
        title: e.title,
        description: e.description || "",
        startDate: e.startDate.split("T")[0],
        endDate: e.endDate.split("T")[0],
        candidates: e.candidates.map(c => ({
          name: c.name,
          party: c.party || "",
          symbol: c.symbol || "",
          symbolPreview: c.symbol ? `http://localhost:5000${c.symbol}` : null
        }))
      });
    } catch (err) {
      alert("Failed to load election");
      router.push("/admin/elections");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...form.candidates];
      updated[index] = {
        ...updated[index],
        symbol: file,
        symbolPreview: reader.result
      };
      setForm({ ...form, candidates: updated });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const updated = [...form.candidates];
    updated[index] = { ...updated[index], symbol: "", symbolPreview: null };
    setForm({ ...form, candidates: updated });
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
    }
  };

  const addCandidate = () => {
    setForm({
      ...form,
      candidates: [...form.candidates, { name: "", party: "", symbol: "", symbolPreview: null }]
    });
  };

  const removeCandidate = (index) => {
    if (form.candidates.length <= 2) return;
    setForm({
      ...form,
      candidates: form.candidates.filter((_, i) => i !== index)
    });
  };

  const updateCandidate = (index, field, value) => {
    const updated = [...form.candidates];
    updated[index][field] = value;
    setForm({ ...form, candidates: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      alert("End date must be after start date");
      return;
    }

    if (form.candidates.some(c => !c.name.trim())) {
      alert("All candidates must have a name");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);

    form.candidates.forEach((c, i) => {
      formData.append(`candidates[${i}][name]`, c.name);
      formData.append(`candidates[${i}][party]`, c.party);
      if (c.symbol && typeof c.symbol === "object") {
        formData.append("symbols", c.symbol);
      }
    });

    setLoading(true);
    try {
      if (isEdit) {
        await API.put(`/admin/elections/${id}`, formData);
      } else {
        await API.post("/admin/elections", formData);
      }
      router.push("/admin/elections");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save election");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-950 text-white border-b-8 border-indigo-700">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => router.back()}
              className="p-3 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                {isEdit ? "Edit Election" : "Create New Election"}
              </h1>
              <p className="text-blue-200 mt-1 text-lg">
                Upload real party symbols – they will appear in live results
              </p>
            </div>
          </div>
          <div className="hidden md:block text-sm opacity-90">
            <span className="font-medium">Election Commission Nepal • 2082</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {loading && !isEdit ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-700 mx-auto mb-6"></div>
              <p className="text-xl font-semibold text-blue-900">Loading election data...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-10 py-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-xl">
                  <FileText className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Election Information</h2>
                  <p className="opacity-90">All fields are required except description</p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 space-y-10">
              <div>
                <label className="block text-sm font-bold text-blue-950 mb-3">
                  Election Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Local Level Election 2082"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-700 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-950 mb-3">
                  Description <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  placeholder="Brief description of this election..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-700 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Election Period <span className="text-red-600">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-700 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-700 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                      <Users className="w-8 h-8 text-indigo-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-950">Candidates</h3>
                      <p className="text-gray-600">Upload party symbol (PNG/JPG, max 2MB)</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full">
                    {form.candidates.length} Candidates
                  </span>
                </div>

                <div className="space-y-6">
                  {form.candidates.map((candidate, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all"
                    >
                      <div className="grid lg:grid-cols-3 gap-6 items-end">
                        <div>
                          <label className="block text-sm font-bold text-blue-900 mb-2">Name *</label>
                          <input
                            type="text"
                            placeholder="Full name"
                            value={candidate.name}
                            onChange={(e) => updateCandidate(index, "name", e.target.value)}
                            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-700 outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-blue-900 mb-2">Party</label>
                          <input
                            type="text"
                            placeholder="Party name"
                            value={candidate.party}
                            onChange={(e) => updateCandidate(index, "party", e.target.value)}
                            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-700 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-blue-900 mb-2">Party Symbol</label>
                          {candidate.symbolPreview ? (
                            <div className="relative group">
                              <img
                                src={candidate.symbolPreview}
                                alt="Symbol"
                                className="w-full h-32 object-contain bg-white rounded-xl border-2 border-gray-300 p-4"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition">
                              <Upload className="w-10 h-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">Click to upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                                ref={(el) => (fileInputRefs.current[index] = el)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {form.candidates.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeCandidate(index)}
                          className="mt-4 text-red-600 hover:text-red-800 font-medium flex items-center gap-2"
                        >
                          <Trash2 className="w-5 h-5" /> Remove Candidate
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addCandidate}
                  className="mt-8 flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-xl hover:from-indigo-700 hover:to-blue-800 font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  <Plus className="w-6 h-6" />
                  Add New Candidate
                </button>
              </div>

              <div className="pt-8 border-t-4 border-indigo-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-700 to-blue-900 text-white font-black text-2xl py-7 rounded-2xl hover:from-indigo-800 hover:to-blue-950 transform hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-60"
                >
                  {loading ? "Saving Election..." : isEdit ? "Update Election" : "Create Election"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}