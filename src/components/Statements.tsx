import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  Receipt,
  FileCheck,
  Eye,
  Mail,
  Printer,
  Award
} from 'lucide-react';

const loanStatements = [
  {
    id: 'STMT001',
    period: 'January 2024',
    amount: 'K25,000',
    status: 'completed',
    generatedDate: '2024-01-31',
    dueDate: '2024-01-25',
    paidDate: '2024-01-20',
    interest: 'K625',
    principal: 'K24,375',
    balance: 'K12,500'
  },
  {
    id: 'STMT002',
    period: 'December 2023',
    amount: 'K25,000',
    status: 'completed',
    generatedDate: '2023-12-31',
    dueDate: '2023-12-25',
    paidDate: '2023-12-22',
    interest: 'K625',
    principal: 'K24,375',
    balance: 'K15,000'
  },
  {
    id: 'STMT003',
    period: 'November 2023',
    amount: 'K25,000',
    status: 'completed',
    generatedDate: '2023-11-30',
    dueDate: '2023-11-25',
    paidDate: '2023-11-20',
    interest: 'K625',
    principal: 'K24,375',
    balance: 'K17,500'
  }
];

const clearanceCertificates = [
  {
    id: 'CERT001',
    loanId: 'LN001',
    amount: 'K25,000',
    completionDate: '2024-01-20',
    status: 'available',
    certificateType: 'Loan Completion Certificate'
  }
];

export function Statements() {
  const [selectedStatement, setSelectedStatement] = useState<string | null>(null);

  const handleDownload = (id: string, type: string) => {
    // Simulate download
    console.log(`Downloading ${type} ${id}`);
    // In a real app, this would trigger a file download
  };

  const handleEmail = (id: string, type: string) => {
    // Simulate email sending
    console.log(`Emailing ${type} ${id}`);
    // In a real app, this would send an email
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Statements & Documents</h1>
            <p className="text-purple-100 mt-1">Access your loan statements and certificates</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Total Documents</p>
            <p className="text-3xl font-bold">{loanStatements.length + clearanceCertificates.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Loan Statements</h3>
                <p className="text-sm text-muted-foreground">{loanStatements.length} available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Certificates</h3>
                <p className="text-sm text-muted-foreground">{clearanceCertificates.length} available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Payment Receipts</h3>
                <p className="text-sm text-muted-foreground">12 available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Monthly Reports</h3>
                <p className="text-sm text-muted-foreground">Auto-generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="statements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="statements">Loan Statements</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="receipts">Payment Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Statements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanStatements.map((statement) => (
                  <div key={statement.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{statement.period} Statement</h3>
                        <p className="text-sm text-muted-foreground">
                          Generated: {statement.generatedDate}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm">Amount: <strong>{statement.amount}</strong></span>
                          <span className="text-sm">Balance: <strong>{statement.balance}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        {statement.status.charAt(0).toUpperCase() + statement.status.slice(1)}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStatement(statement.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(statement.id, 'statement')}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEmail(statement.id, 'statement')}
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clearance Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clearanceCertificates.map((certificate) => (
                  <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{certificate.certificateType}</h3>
                        <p className="text-sm text-muted-foreground">
                          Loan ID: {certificate.loanId} • Completed: {certificate.completionDate}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm">Amount: <strong>{certificate.amount}</strong></span>
                          <Badge className="bg-green-100 text-green-800">
                            {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(certificate.id, 'certificate')}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmail(certificate.id, 'certificate')}
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4 mr-1" />
                        Print
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample payment receipts */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Payment Receipt #{String(i).padStart(3, '0')}</h3>
                        <p className="text-sm text-muted-foreground">
                          Payment Date: 2024-01-{String(20 - i).padStart(2, '0')}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm">Amount: <strong>K2,500</strong></span>
                          <span className="text-sm">Method: <strong>Mobile Money</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Statement Details Modal */}
      {selectedStatement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Loan Statement Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStatement(null)}
                >
                  ✕
                </Button>
              </div>

              {(() => {
                const statement = loanStatements.find(s => s.id === selectedStatement);
                if (!statement) return null;

                return (
                  <div className="space-y-6">
                    {/* Statement Header */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{statement.period} Statement</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Statement ID:</span>
                          <span className="ml-2 font-medium">{statement.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Generated:</span>
                          <span className="ml-2 font-medium">{statement.generatedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-4">Payment Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground">Due Date:</span>
                          <span className="ml-2 font-medium">{statement.dueDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payment Date:</span>
                          <span className="ml-2 font-medium">{statement.paidDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount Due:</span>
                          <span className="ml-2 font-medium">{statement.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">
                            Paid
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-4">Payment Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Principal:</span>
                          <span className="font-medium">{statement.principal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest:</span>
                          <span className="font-medium">{statement.interest}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>Total Paid:</span>
                          <span>{statement.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining Balance:</span>
                          <span className="font-medium">{statement.balance}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Statement
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Statement
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}