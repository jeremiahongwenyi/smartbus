import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, AlertCircle, Phone, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import useBuses from "@/store/busStore";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export interface CustomerData {
  fullName: string;
  age: number;
  idNumber: string;
  contactNumber: string;
  emergencyContact1?: string;
  emergencyContact2?: string;
}

function CustomerPage() {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats } = useBuses();
  console.log("retrieved seats", selectedSeats);

  const { totalPrice, updateCustomerData } = useBuses();
  console.log("retrieved price", totalPrice);
  const [formData, setFormData] = useState<CustomerData>({
    fullName: "",
    age: 18,
    idNumber: "",
    contactNumber: "",
    emergencyContact1: "",
    emergencyContact2: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const isMinor = formData.age < 18;

  const goBack = (route: string) => {
    console.log(route);
    navigate(`${route}`);
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerData> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.idNumber?.trim()) {
      newErrors.idNumber = "ID number is required";
    }

    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }

    if (isMinor) {
      if (!formData.emergencyContact1?.trim()) {
        newErrors.emergencyContact1 =
          "First emergency contact is required for minors";
      }
      if (!formData.emergencyContact2?.trim()) {
        newErrors.emergencyContact2 =
          "Second emergency contact is required for minors";
      }
    }

    console.log("errors present ", newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (
    field: keyof CustomerData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form has been clicked");

    if (validateForm()) {
      console.log("form data", formData);
      updateCustomerData(formData);
      navigate("/payment-details");
      return;
    }
    toast("Form Validation Error", {
      description: "Please fill in all required fields correctly.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className="m-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goBack("/seat-selection")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Passenger Details</h1>
          <p className="text-muted-foreground">
            Enter information for all passengers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="age">Age *</Label>
                  <Select
                    value={formData.age?.toString() ?? ""}
                    onValueChange={(value) =>
                      updateFormData("age", parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 83 }, (_, i) => i + 5).map(
                        (age) => (
                          <SelectItem key={age} value={age?.toString() ?? ""}>
                            {age} years old
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* ID Number */}
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter your national ID or passport number"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className={errors.idNumber ? "border-destructive" : ""}
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.idNumber}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    placeholder="+254 xxx xxx xxxx"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      updateFormData("contactNumber", e.target.value)
                    }
                    className={errors.contactNumber ? "border-destructive" : ""}
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Emergency Contacts for Minors */}
              {isMinor && (
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5 text-accent" />
                    Emergency Contacts (Required for minors)
                  </h3>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-accent flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Since you're under 18, please provide two emergency
                      contact numbers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact1">
                        Emergency Contact 1 *
                      </Label>
                      <Input
                        id="emergencyContact1"
                        placeholder="Guardian/Parent contact"
                        value={formData.emergencyContact1}
                        onChange={(e) =>
                          updateFormData("emergencyContact1", e.target.value)
                        }
                        className={
                          errors.emergencyContact1 ? "border-destructive" : ""
                        }
                      />
                      {errors.emergencyContact1 && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.emergencyContact1}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact2">
                        Emergency Contact 2 *
                      </Label>
                      <Input
                        id="emergencyContact2"
                        placeholder="Alternative emergency contact"
                        value={formData.emergencyContact2}
                        onChange={(e) =>
                          updateFormData("emergencyContact2", e.target.value)
                        }
                        className={
                          errors.emergencyContact2 ? "border-destructive" : ""
                        }
                      />
                      {errors.emergencyContact2 && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.emergencyContact2}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Continue to Payment
              </Button>
            </form>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="p-6 shadow-card bg-gradient-card sticky top-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Booking Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bus</span>
                  <span>{selectedBus.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <span>{selectedBus.company}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Departure</span>
                  <span>{selectedBus.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{selectedSeats.map((seat) => seat.id).join(", ")}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">Kes {totalPrice}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
