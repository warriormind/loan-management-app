import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  FileText,
  Calculator,
  User,
  Shield,
  CreditCard,
  Eye,
  Save,
  X
} from 'lucide-react';

interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  interestType: 'Flat' | 'Reducing';
  interestRate: number;
}

const loanProducts: LoanProduct[] = [
  {
    id: 'personal',
    name: 'Personal Loan',
    description: 'Flexible loan for personal needs',
    minAmount: 1000,
    maxAmount: 50000,
    minTerm: 3,
    maxTerm: 36,
    interestType: 'Reducing',
    interestRate: 12.5
  },
  {
    id: 'business',
    name: 'Business Loan',
    description: 'Loan for business expansion and operations',
    minAmount: 5000,
    maxAmount: 200000,
    minTerm: 6,
    maxTerm: 60,
    interestType: 'Reducing',
    interestRate: 15.0
  },
  {
    id: 'emergency',
    name: 'Emergency Loan',
    description: 'Quick loan for urgent financial needs',
    minAmount: 500,
    maxAmount: 10000,
    minTerm: 1,
    maxTerm: 12,
    interestType: 'Flat',
    interestRate: 18.0
  }
];

interface LoanApplicationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: any) => void;
}

export function LoanApplicationWizard({ isOpen, onClose, onSubmit }: LoanApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDraft, setIsDraft] = useState(false);

  // Form data
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [repaymentFrequency, setRepaymentFrequency] = useState('');
  const [purpose, setPurpose] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [existingLiabilities, setExistingLiabilities] = useState('');
  const [requireGuarantor, setRequireGuarantor] = useState(false);
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorId, setGuarantorId] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');
  const [guarantorRelation, setGuarantorRelation] = useState('');
  const [collateralType, setCollateralType] = useState('');
  const [collateralDescription, setCollateralDescription] = useState('');
  const [collateralValue, setCollateralValue] = useState('');
  const [kycDocuments, setKycDocuments] = useState<File[]>([]);
  const [creditCheckConsent, setCreditCheckConsent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const totalSteps = 6;

  const calculateInstallment = () => {
    if (!selectedProduct || !loanAmount || !loanTerm || !repaymentFrequency) return 0;

    const principal = parseFloat(loanAmount);
    const term = parseInt(loanTerm);
    const rate = selectedProduct.interestRate / 100;

    let installmentsPerMonth = 1;
    switch (repaymentFrequency) {
      case 'weekly': installmentsPerMonth = 4; break;
      case 'biweekly': installmentsPerMonth = 2; break;
      case 'monthly': installmentsPerMonth = 1; break;
    }

    const totalInstallments = term * installmentsPerMonth;

    if (selectedProduct.interestType === 'Flat') {
      const totalInterest = principal * rate * (term / 12);
      return (principal + totalInterest) / totalInstallments;
    } else {
      // Reducing balance calculation
      const monthlyRate = rate / 12;
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalInstallments)) /
             (Math.pow(1 + monthlyRate, totalInstallments) - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const application = {
      productId: selectedProduct?.id,
      amount: parseFloat(loanAmount),
      term: parseInt(loanTerm),
      frequency: repaymentFrequency,
      purpose,
      employmentStatus,
      monthlyIncome: parseFloat(monthlyIncome),
      otherIncome: parseFloat(otherIncome) || 0,
      existingLiabilities: parseFloat(existingLiabilities) || 0,
      requireGuarantor,
      guarantor: requireGuarantor ? {
        name: guarantorName,
        id: guarantorId,
        phone: guarantorPhone,
        relation: guarantorRelation
      } : null,
      collateral: collateralType ? {
        type: collateralType,
        description: collateralDescription,
        value: parseFloat(collateralValue)
      } : null,
      documents: kycDocuments,
      creditCheckConsent,
      submittedAt: new Date().toISOString()
    };

    onSubmit(application);
    onClose();
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    // Save draft logic here
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Select Loan Product</h3>
              <p className="text-sm text-muted-foreground">Choose the loan product that best fits your needs</p>
            </div>

            <div className="grid gap-4">
              {loanProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer transition-all ${
                    selectedProduct?.id === product.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount: </span>
                            K{product.minAmount.toLocaleString()} - K{product.maxAmount.toLocaleString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Term: </span>
                            {product.minTerm} - {product.maxTerm} months
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rate: </span>
                            {product.interestRate}%
                          </div>
                          <div>
                            <span className="text-muted-foreground">Type: </span>
                            {product.interestType}
                          </div>
                        </div>
                      </div>
                      {selectedProduct?.id === product.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Loan Amount & Term</h3>
              <p className="text-sm text-muted-foreground">Specify your loan requirements</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Loan Amount (K)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  min={selectedProduct?.minAmount}
                  max={selectedProduct?.maxAmount}
                />
                {selectedProduct && (
                  <p className="text-xs text-muted-foreground">
                    Range: K{selectedProduct.minAmount.toLocaleString()} - K{selectedProduct.maxAmount.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="term">Loan Term (months)</Label>
                <Input
                  id="term"
                  type="number"
                  placeholder="Enter term in months"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  min={selectedProduct?.minTerm}
                  max={selectedProduct?.maxTerm}
                />
                {selectedProduct && (
                  <p className="text-xs text-muted-foreground">
                    Range: {selectedProduct.minTerm} - {selectedProduct.maxTerm} months
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="frequency">Repayment Frequency</Label>
                <Select value={repaymentFrequency} onValueChange={setRepaymentFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loanAmount && loanTerm && repaymentFrequency && (
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-600">Estimated Installment</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      K{calculateInstallment().toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-blue-600">
                      {repaymentFrequency.charAt(0).toUpperCase() + repaymentFrequency.slice(1)} payment
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Purpose & Income</h3>
              <p className="text-sm text-muted-foreground">Tell us about your loan purpose and financial situation</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="purpose">Purpose of Loan</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe the purpose of this loan"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="employment">Employment Status</Label>
                <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="income">Monthly Income (K)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0.00"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="other-income">Other Income (K)</Label>
                  <Input
                    id="other-income"
                    type="number"
                    placeholder="0.00"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="liabilities">Existing Liabilities (K)</Label>
                <Input
                  id="liabilities"
                  type="number"
                  placeholder="0.00"
                  value={existingLiabilities}
                  onChange={(e) => setExistingLiabilities(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="credit-check"
                  checked={creditCheckConsent}
                  onCheckedChange={setCreditCheckConsent}
                />
                <Label htmlFor="credit-check" className="text-sm">
                  I authorize credit checks and retrieval of my bank statements
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Guarantor & Collateral</h3>
              <p className="text-sm text-muted-foreground">Optional security for your loan</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="require-guarantor"
                  checked={requireGuarantor}
                  onCheckedChange={setRequireGuarantor}
                />
                <Label htmlFor="require-guarantor">Require Guarantor</Label>
              </div>

              {requireGuarantor && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Guarantor Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="guarantor-name">Full Name</Label>
                        <Input
                          id="guarantor-name"
                          placeholder="Enter guarantor name"
                          value={guarantorName}
                          onChange={(e) => setGuarantorName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guarantor-id">ID Number</Label>
                        <Input
                          id="guarantor-id"
                          placeholder="Enter ID number"
                          value={guarantorId}
                          onChange={(e) => setGuarantorId(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="guarantor-phone">Phone Number</Label>
                        <Input
                          id="guarantor-phone"
                          placeholder="Enter phone number"
                          value={guarantorPhone}
                          onChange={(e) => setGuarantorPhone(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guarantor-relation">Relationship</Label>
                        <Input
                          id="guarantor-relation"
                          placeholder="e.g., Parent, Sibling"
                          value={guarantorRelation}
                          onChange={(e) => setGuarantorRelation(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Collateral (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="collateral-type">Collateral Type</Label>
                    <Select value={collateralType} onValueChange={setCollateralType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collateral type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {collateralType && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="collateral-description">Description</Label>
                        <Textarea
                          id="collateral-description"
                          placeholder="Describe the collateral"
                          value={collateralDescription}
                          onChange={(e) => setCollateralDescription(e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="collateral-value">Estimated Value (K)</Label>
                        <Input
                          id="collateral-value"
                          type="number"
                          placeholder="0.00"
                          value={collateralValue}
                          onChange={(e) => setCollateralValue(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Documents & KYC</h3>
              <p className="text-sm text-muted-foreground">Upload required documents for verification</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Required Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'ID Document', required: true },
                    { label: 'Proof of Address', required: true },
                    { label: 'Salary Slip / Bank Statement', required: false },
                    { label: 'Tax ID (if applicable)', required: false }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.required ? 'Required' : 'Optional'}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">KYC Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">Verified</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Review & E-Sign</h3>
              <p className="text-sm text-muted-foreground">Review your application and sign electronically</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <p className="font-medium">{selectedProduct?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-medium">K{parseFloat(loanAmount).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Term:</span>
                    <p className="font-medium">{loanTerm} months</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequency:</span>
                    <p className="font-medium">{repaymentFrequency}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Monthly Installment:</span>
                    <p className="font-medium">K{calculateInstallment().toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Payable:</span>
                    <p className="font-medium">K{(calculateInstallment() * parseInt(loanTerm) * (repaymentFrequency === 'weekly' ? 4 : repaymentFrequency === 'biweekly' ? 2 : 1)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Amortization Schedule Preview</h4>
                  <div className="text-xs text-muted-foreground">
                    Schedule will be generated after approval
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-32 p-3 border rounded-lg bg-gray-50 text-sm overflow-y-auto">
                  <p>
                    By submitting this application, you agree to the following terms and conditions...
                    [Terms and conditions text would go here]
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">I agree to the Terms & Conditions</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">E-Signature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Button variant="outline" className="mb-4">
                    Send OTP to Phone/Email
                  </Button>
                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        maxLength={6}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Loan Application</span>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </DialogTitle>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </DialogHeader>

        <div className="py-4">
          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={currentStep === totalSteps}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!otpCode}>
                <Check className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}