import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Calculator,
  Target,
  DollarSign,
  Clock,
  Shield,
  Award,
  XCircle
} from 'lucide-react';

const creditAssessmentData = {
  overallScore: 720,
  riskLevel: 'Low',
  eligibilityStatus: 'Eligible',
  maxLoanAmount: 'K50,000',
  recommendedAmount: 'K25,000',
  interestRate: '12.5%',
  monthlyPayment: 'K3,125',
  loanTerm: '12 months',
  approvalProbability: 85,
  factors: {
    positive: [
      { factor: 'Credit History', impact: 'High', description: 'Excellent payment history' },
      { factor: 'Income Stability', impact: 'High', description: 'Consistent income for 3+ years' },
      { factor: 'Debt-to-Income Ratio', impact: 'Medium', description: 'Well within acceptable limits' }
    ],
    negative: [
      { factor: 'Recent Credit Inquiries', impact: 'Low', description: '2 inquiries in last 6 months' },
      { factor: 'Credit Utilization', impact: 'Low', description: 'Could be lower for better score' }
    ]
  },
  loanOptions: [
    {
      id: 'personal_loan',
      name: 'Personal Loan',
      amount: 'K25,000',
      interestRate: '12.5%',
      term: '12 months',
      monthlyPayment: 'K2,604',
      eligibility: 'Eligible',
      features: ['No collateral required', 'Quick approval', 'Flexible repayment']
    },
    {
      id: 'business_loan',
      name: 'Business Loan',
      amount: 'K35,000',
      interestRate: '15.0%',
      term: '18 months',
      monthlyPayment: 'K2,458',
      eligibility: 'Conditional',
      features: ['Business plan required', 'Lower rates for established businesses', 'Tax benefits']
    },
    {
      id: 'home_improvement',
      name: 'Home Improvement Loan',
      amount: 'K40,000',
      interestRate: '10.5%',
      term: '24 months',
      monthlyPayment: 'K1,925',
      eligibility: 'Eligible',
      features: ['Property as collateral', 'Lowest interest rate', 'Longer repayment period']
    }
  ]
};

export function CreditAssessment() {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility.toLowerCase()) {
      case 'eligible': return 'text-green-600 bg-green-100';
      case 'conditional': return 'text-yellow-600 bg-yellow-100';
      case 'ineligible': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-600" />;
      case 'low': return <TrendingDown className="w-4 h-4 text-orange-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Credit Assessment Results</h1>
            <p className="text-green-100 mt-1">Your loan eligibility and recommended options</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-lg font-semibold">Credit Score</span>
            </div>
            <p className="text-3xl font-bold">{creditAssessmentData.overallScore}</p>
            <Badge className={`${getRiskColor(creditAssessmentData.riskLevel)} text-white`}>
              {creditAssessmentData.riskLevel} Risk
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Eligibility Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <Badge className={getEligibilityColor(creditAssessmentData.eligibilityStatus)}>
                    {creditAssessmentData.eligibilityStatus}
                  </Badge>
                </div>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                <p className="text-2xl font-semibold text-blue-600">{creditAssessmentData.maxLoanAmount}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="text-2xl font-semibold text-purple-600">{creditAssessmentData.interestRate}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approval Probability</p>
                <p className="text-2xl font-semibold text-green-600">{creditAssessmentData.approvalProbability}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Details */}
      <Tabs defaultValue="factors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="factors">Assessment Factors</TabsTrigger>
          <TabsTrigger value="options">Loan Options</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Positive Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Positive Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditAssessmentData.factors.positive.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      {getImpactIcon(factor.impact)}
                      <div className="flex-1">
                        <p className="font-medium text-green-800">{factor.factor}</p>
                        <p className="text-sm text-green-600">{factor.description}</p>
                        <Badge variant="outline" className="mt-1 text-green-700 border-green-300">
                          {factor.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Negative Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="w-5 h-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditAssessmentData.factors.negative.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                      {getImpactIcon(factor.impact)}
                      <div className="flex-1">
                        <p className="font-medium text-orange-800">{factor.factor}</p>
                        <p className="text-sm text-orange-600">{factor.description}</p>
                        <Badge variant="outline" className="mt-1 text-orange-700 border-orange-300">
                          {factor.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="options" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {creditAssessmentData.loanOptions.map((loan) => (
              <Card key={loan.id} className={`cursor-pointer transition-all ${
                selectedLoan === loan.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`} onClick={() => setSelectedLoan(loan.id)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{loan.name}</h3>
                      <p className="text-sm text-muted-foreground">{loan.amount} • {loan.term}</p>
                    </div>
                    <Badge className={getEligibilityColor(loan.eligibility)}>
                      {loan.eligibility}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold">{loan.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold">{loan.monthlyPayment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Term</p>
                      <p className="font-semibold">{loan.term}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold">{loan.amount}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {loan.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedLoan === loan.id && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button className="flex-1">
                        Apply for this Loan
                      </Button>
                      <Button variant="outline">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Options Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Loan Type</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Interest Rate</th>
                      <th className="text-left p-3">Monthly Payment</th>
                      <th className="text-left p-3">Term</th>
                      <th className="text-left p-3">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditAssessmentData.loanOptions.map((loan) => (
                      <tr key={loan.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{loan.name}</td>
                        <td className="p-3">{loan.amount}</td>
                        <td className="p-3">{loan.interestRate}</td>
                        <td className="p-3">{loan.monthlyPayment}</td>
                        <td className="p-3">{loan.term}</td>
                        <td className="p-3">
                          <Badge className={getEligibilityColor(loan.eligibility)}>
                            {loan.eligibility}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          This assessment is based on the information provided and may change with additional verification.
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Recalculate
          </Button>
          <Button>
            Proceed with Application
          </Button>
        </div>
      </div>
    </div>
  );
}