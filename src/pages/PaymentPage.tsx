import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  Smartphone,
  Banknote,
  Loader2,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useBuses from "@/store/busStore";
import { useCustomers } from "@/store/customerStore";
import { saveCustomerData } from "@/store/customerStore";

type PaymentMethod = "mobile-money" | "card" | "cash";

interface paymentData {
  mobileNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

function PaymentPage() {
  const navigate = useNavigate();
  const { selectedBus,selectedSeats, totalPrice,  } = useBuses();
    const {customerData} =useCustomers()
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("mobile-money");
  const [isProcessing, setIsProcessing] = useState(false);

  const [errors, setErrors] = useState<Partial<paymentData>>({});

  const goBack = (route: string) => {
    console.log(route);
    navigate(`${route}`);
  };

  const [paymentData, setPaymentData] = useState<paymentData>(
    {} as paymentData
  );

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case "mobile-money":
        return <Smartphone className="h-5 w-5" />;
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "cash":
        return <Banknote className="h-5 w-5" />;
    }
  };
  const handlePayment = async () => {
    if (formValidation(paymentMethod)) {
      setIsProcessing(true);
      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Generate booking ID
        const bookingId = `SB${Date.now().toString().slice(-8)}`;
       saveCustomerData(customerData)

        toast("Payment Successful!", {
          description: `Your booking has been confirmed. Booking ID: ${bookingId}`,
        });
        navigate("/confirmation");
      } catch (error) {
        toast("Payment Failed", {
          description:
            "There was an error processing your payment. Please try again.",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const formValidation = (method: PaymentMethod) => {
    const newErrors = {} as paymentData;
    switch (method) {
      case "mobile-money":
        {
          if (!paymentData.mobileNumber?.trim()) {
            newErrors.mobileNumber = "Mobile Number is required";
          }
        }
        break;
        case 'card': {
          if(!paymentData.cardHolderName?.trim()){
            newErrors.cardHolderName = "Card Holder name is required";
          }

           if(!paymentData.cardNumber?.trim()){
            newErrors.cardNumber = "Card Number is required";
          }

           if(!paymentData.expiryDate?.trim()){
            newErrors.expiryDate = "Expiry date name is required";
          }
           if(!paymentData.cvv?.trim()){
            newErrors.cvv = "CVV is required";
          }
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "mobile-money":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Money Number</Label>
              <Input
                id="mobileNumber"
                placeholder="+234 xxx xxx xxxx"
                value={paymentData.mobileNumber}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                  }))
                }
              />
              {errors.mobileNumber && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.mobileNumber}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                We support Mpesa and Airtel Money
              </p>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardHolderName">Cardholder Name</Label>
              <Input
                id="cardHolderName"
                placeholder="Name on card"
                value={paymentData.cardHolderName}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    cardHolderName: e.target.value,
                  }))
                }
              />
               {errors.cardHolderName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.cardHolderName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
              />
               {errors.cardNumber && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      expiryDate: e.target.value,
                    }))
                  }
                />
                 {errors.expiryDate && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.expiryDate}
                </p>
              )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) =>
                    setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))
                  }
                />
                 {errors.cvv && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.cvv}
                </p>
              )}
              </div>
            </div>
          </div>
        );

      case "cash":
        return (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-medium text-accent mb-2">
                Cash Payment Instructions
              </h4>
              <ul className="text-sm text-accent space-y-1">
                <li>• Visit any SmartBus office or authorized agent</li>
                <li>• Present your booking reference number</li>
                <li>• Pay in cash and collect your ticket</li>
                <li>• Payment must be completed 2 hours before departure</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Your seat will be reserved for 2 hours. Please complete payment
              within this time.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="m-10 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => goBack("/customer-details")}
        >
          <ArrowLeft className="h-4 w-4 " />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Payment</h1>
          <p className="text-muted-foreground">
            Choose your preferred payment method
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-card">
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Payment Method</h3>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as PaymentMethod)
                  }
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="mobile-money" id="mobile-money" />
                      <Label
                        htmlFor="mobile-money"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">
                            Pay with your mobile wallet
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Debit/Credit Card</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, Mastercard, Verve accepted
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label
                        htmlFor="cash"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Cash Payment</p>
                          <p className="text-sm text-muted-foreground">
                            Pay at our office or agent
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Details Form */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {getPaymentIcon(paymentMethod)}
                  Payment Details
                </h3>
                {renderPaymentForm()}
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    {paymentMethod === "cash" ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Reserve Seat & Get Reference
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Pay Kes {totalPrice}
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="p-6 shadow-card bg-gradient-card sticky top-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Final Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Passenger</span>
                  <span>{customerData.fullName}</span>
                </div>
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
                  <span>
                    {selectedSeats
                      .map((seat) => seat.id)
                      .join(", ")}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">Kes {totalPrice}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                {/* <p className="text-xs text-muted-foreground">
                  🔒 Your payment is secured with 256-bit SSL encryption
                </p> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
