import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Bell,
  Search,
  Filter,
  User,
  LogOut,
  X,
  Calendar,
  MapPin,
  Tag,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { mockSchemes, type Scheme } from "../../lib/mockData";

interface UserDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function UserDashboard({
  userName,
  onLogout,
}: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedEligibility, setSelectedEligibility] = useState("All");
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });
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
  const eligibilityOptions = ["All", "Eligible", "Not Eligible", "Unknown"];
  const deadlineOptions = ["All", "This Month", "Next 3 Months", "This Year"];

  // Helper function to check if scheme matches deadline filter
  const matchesDeadline = (scheme: Scheme, filter: string) => {
    if (filter === "All" || !scheme.deadline) return true;

    const deadlineDate = new Date(scheme.deadline);
    const now = new Date();

    switch (filter) {
      case "This Month":
        return (
          deadlineDate.getMonth() === now.getMonth() &&
          deadlineDate.getFullYear() === now.getFullYear()
        );
      case "Next 3 Months":
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(now.getMonth() + 3);
        return deadlineDate >= now && deadlineDate <= threeMonthsFromNow;
      case "This Year":
        return deadlineDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  // Filter schemes
  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || scheme.category === selectedCategory;

    const matchesLocation =
      selectedLocation === "All" || scheme.location === selectedLocation;

    const matchesEligibility =
      selectedEligibility === "All" ||
      (selectedEligibility === "Eligible" && scheme.isEligible === true) ||
      (selectedEligibility === "Not Eligible" && scheme.isEligible === false) ||
      (selectedEligibility === "Unknown" && scheme.isEligible === undefined);

    const matchesAge =
      (!ageRange.min || scheme.ageMin <= parseInt(ageRange.min)) &&
      (!ageRange.max || scheme.ageMax >= parseInt(ageRange.max));

    const matchesDeadlineFilter = matchesDeadline(scheme, deadlineFilter);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesEligibility &&
      matchesAge &&
      matchesDeadlineFilter
    );
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedEligibility("All");
    setAgeRange({ min: "", max: "" });
    setDeadlineFilter("All");
    setSearchQuery("");
  };

  // Count active filters
  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedLocation !== "All" ? 1 : 0) +
    (selectedEligibility !== "All" ? 1 : 0) +
    (ageRange.min || ageRange.max ? 1 : 0) +
    (deadlineFilter !== "All" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Recommended schemes (eligible ones)
  const recommendedSchemes = mockSchemes.filter((scheme) => scheme.isEligible);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">
                Hello, {userName}! 👋
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LogOut className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Search Bar and Filter Toggle */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for schemes (e.g., 'education', 'farmer')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-2xl"
            />
          </div>

          {/* Filter Toggle and Active Filters Summary */}
          <div className="flex items-center justify-between">
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
                  Clear All
                </Button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {filteredSchemes.length} schemes
              </span>
              {filteredSchemes.filter((s) => s.isEligible).length > 0 && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {filteredSchemes.filter((s) => s.isEligible).length} eligible
                </span>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="outline" className="rounded-full">
                  <Search className="w-3 h-3 mr-1" />
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge variant="outline" className="rounded-full">
                  <Tag className="w-3 h-3 mr-1" />
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedLocation !== "All" && (
                <Badge variant="outline" className="rounded-full">
                  <MapPin className="w-3 h-3 mr-1" />
                  {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation("All")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Recommended For You Section */}
        {recommendedSchemes.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedSchemes.slice(0, 3).map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-green-50 border-green-200 hover:bg-green-100 rounded-2xl p-5 border transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="font-medium line-clamp-2">{scheme.title}</h4>
                    <Badge variant="default" className="rounded-full shrink-0">
                      ✓ Eligible
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {scheme.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag className="w-4 h-4 shrink-0" />
                      <span className="truncate">{scheme.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{scheme.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      variant={selectedCategory === cat ? "default" : "outline"}
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
                      variant={selectedLocation === loc ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLocation(loc)}
                      className="rounded-full text-xs"
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Eligibility Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Eligibility Status
                </Label>
                <div className="flex flex-wrap gap-2">
                  {eligibilityOptions.map((option) => (
                    <Button
                      key={option}
                      variant={
                        selectedEligibility === option ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedEligibility(option)}
                      className="rounded-full text-xs"
                    >
                      {option === "Eligible" && (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {option === "Not Eligible" && (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {option === "Unknown" && (
                        <Users className="w-3 h-3 mr-1" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Deadline Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Deadline
                </Label>
                <div className="flex flex-wrap gap-2">
                  {deadlineOptions.map((opt) => (
                    <Button
                      key={opt}
                      variant={deadlineFilter === opt ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDeadlineFilter(opt)}
                      className="rounded-full text-xs"
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Schemes Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">All Schemes</h3>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                  scheme.isEligible === true
                    ? "bg-green-50 border-green-200 hover:bg-green-100"
                    : scheme.isEligible === false
                    ? "bg-red-50 border-red-200 hover:bg-red-100"
                    : "bg-white border-gray-200 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-medium line-clamp-2">{scheme.title}</h4>
                  {scheme.isEligible !== undefined && (
                    <Badge
                      variant={scheme.isEligible ? "default" : "destructive"}
                      className="rounded-full shrink-0"
                    >
                      {scheme.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {scheme.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4 shrink-0" />
                    <span className="truncate">{scheme.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{scheme.location}</span>
                  </div>

                  {scheme.deadline && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100"
                      >
                        Deadline:{" "}
                        {new Date(scheme.deadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <div className="mb-4">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">
                  No schemes found
                </h4>
                <p className="text-gray-500 mb-4">
                  No schemes match your current criteria. Try adjusting your
                  filters.
                </p>
              </div>
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
        </section>
      </main>
    </div>
  );
}
