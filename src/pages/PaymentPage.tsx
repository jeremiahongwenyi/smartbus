import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Smartphone,Banknote,Loader2,CreditCard  } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


function PaymentPage() {
  const navigate = useNavigate();

  const goBack = (route: string) => {
    console.log(route);
    navigate(`${route}`);
  };

  return (
    <div className="m-10 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => goBack("/customer-details")}>
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
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="mobile-money" id="mobile-money" />
                      <Label htmlFor="mobile-money" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">Pay with your mobile wallet</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Debit/Credit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Verve accepted</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Cash Payment</p>
                          <p className="text-sm text-muted-foreground">Pay at our office or agent</p>
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
                        Pay ₦{bookingDetails.totalPrice.toLocaleString()}
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
                  <span>{bookingDetails.busInfo.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <span>{bookingDetails.busInfo.company}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Departure</span>
                  <span>{bookingDetails.busInfo.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{bookingDetails.selectedSeats.join(", ")}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">₦{bookingDetails.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  🔒 Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
