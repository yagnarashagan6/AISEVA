import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  LogOut,
  Plus,
  Users,
  FileText,
  TrendingUp,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  Tag,
  MapPin,
  Calendar,
  Clock,
  XCircle,
} from "lucide-react";
import { mockSchemes } from "../../lib/mockData";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [schemes, setSchemes] = useState(mockSchemes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [deadlineFilter, setDeadlineFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Agriculture",
    "Education",
    "Housing",
    "Healthcare",
    "Skill Development",
    "Entrepreneurship",
  ];
  const locations = ["All", "All India", "Urban Areas", "Rural Areas"];
  const deadlineOptions = ["All", "With Deadline", "No Deadline", "Expired"];

  // Helper function to check if scheme matches deadline filter
  const matchesDeadline = (scheme: any, filter: string) => {
    const now = new Date();
    const hasDeadline = !!scheme.deadline;
    const deadlineDate = hasDeadline ? new Date(scheme.deadline) : null;

    switch (filter) {
      case "All":
        return true;
      case "With Deadline":
        return hasDeadline;
      case "No Deadline":
        return !hasDeadline;
      case "Expired":
        return hasDeadline && deadlineDate && deadlineDate < now;
      default:
        return true;
    }
  };

  // Filter schemes
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || scheme.category === selectedCategory;

    const matchesLocation =
      selectedLocation === "All" || scheme.location === selectedLocation;

    const matchesDeadlineFilter = matchesDeadline(scheme, deadlineFilter);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesDeadlineFilter
    );
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedLocation("All");
    setDeadlineFilter("All");
    setSearchQuery("");
  };

  // Count active filters
  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedLocation !== "All" ? 1 : 0) +
    (deadlineFilter !== "All" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this scheme?")) {
      setSchemes(schemes.filter((s) => s.id !== id));
    }
  };

  // Mock stats
  const stats = {
    totalSchemes: schemes.length,
    filteredSchemes: filteredSchemes.length,
    activeUsers: 1247,
    newApplications: 89,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
            <Button
              onClick={onLogout}
              variant="outline"
              className="rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Total Schemes</h3>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalSchemes}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Active Users</h3>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.activeUsers}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">New Applications</h3>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.newApplications}
            </p>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="space-y-4">
          {/* Search Bar and Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search schemes by title, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-2xl"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="default" className="ml-2 rounded-full">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="rounded-full text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Filter Options</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Tag className="w-4 h-4 text-blue-600" />
                    Category
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={
                          selectedCategory === cat ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="rounded-full text-xs"
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-700 font-medium">
                    <MapPin className="w-4 h-4 text-green-600" />
                    Location
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((loc) => (
                      <Button
                        key={loc}
                        variant={
                          selectedLocation === loc ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedLocation(loc)}
                        className="rounded-full text-xs"
                      >
                        {loc}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Deadline Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Calendar className="w-4 h-4 text-red-600" />
                    Deadline Status
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {deadlineOptions.map((option) => (
                      <Button
                        key={option}
                        variant={
                          deadlineFilter === option ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setDeadlineFilter(option)}
                        className="rounded-full text-xs"
                      >
                        {option === "Expired" && (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {option === "With Deadline" && (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          {!showFilters && filteredSchemes.length !== schemes.length && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-blue-900 font-medium">
                    Showing {filteredSchemes.length} of {schemes.length} schemes
                  </p>
                  <p className="text-blue-700 text-sm">
                    {activeFiltersCount} filter
                    {activeFiltersCount !== 1 ? "s" : ""} applied
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(true)}
                className="rounded-full border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Modify Filters
              </Button>
            </div>
          )}
        </div>

        {/* Schemes Management */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Schemes</h2>
            <Button className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Scheme
            </Button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">
                    Scheme Title
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">
                    Location
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-700">
                    Deadline
                  </th>
                  <th className="text-right px-6 py-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSchemes.map((scheme) => (
                  <tr
                    key={scheme.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {scheme.title}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {scheme.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {scheme.category}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {scheme.location}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {scheme.deadline
                        ? new Date(scheme.deadline).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "No deadline"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(scheme.id)}
                          className="rounded-full text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl p-5 border border-gray-200"
              >
                <h4 className="font-medium mb-2">{scheme.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {scheme.description}
                </p>

                <div className="space-y-1 mb-4 text-sm">
                  <p className="text-gray-700">
                    <span className="text-gray-500">Category:</span>{" "}
                    {scheme.category}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Location:</span>{" "}
                    {scheme.location}
                  </p>
                  {scheme.deadline && (
                    <p className="text-gray-700">
                      <span className="text-gray-500">Deadline:</span>{" "}
                      {new Date(scheme.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(scheme.id)}
                    className="flex-1 rounded-full text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredSchemes.length === 0 && schemes.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Matching Schemes
              </h3>
              <p className="text-gray-500 mb-4">
                No schemes match your current filters. Try adjusting your search
                criteria.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="rounded-full"
                >
                  Clear All Filters
                </Button>
                <Button
                  variant="default"
                  onClick={() => setShowFilters(true)}
                  className="rounded-full"
                >
                  Modify Filters
                </Button>
              </div>
            </div>
          )}

          {schemes.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No Schemes Available
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first scheme
              </p>
              <Button className="rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Scheme
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
