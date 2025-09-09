import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { FileText, Download, Calendar, Filter, BarChart3 } from 'lucide-react';

const mockReports = [
  {
    id: 'R001',
    name: 'Monthly Loan Portfolio Report',
    type: 'Portfolio',
    generatedDate: '2024-01-31',
    period: 'January 2024',
    status: 'Completed',
    size: '2.4 MB'
  },
  {
    id: 'R002',
    name: 'Overdue Loans Analysis',
    type: 'Risk',
    generatedDate: '2024-01-28',
    period: 'Q4 2023',
    status: 'Completed',
    size: '1.8 MB'
  },
  {
    id: 'R003',
    name: 'Customer Credit Assessment',
    type: 'Credit',
    generatedDate: '2024-01-25',
    period: 'January 2024',
    status: 'Processing',
    size: null
  }
];

export function ReportsTab() {
  const [reportType, setReportType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-semibold">156</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-semibold">23</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Automated</p>
                <p className="text-2xl font-semibold">18</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Reports</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
              <Filter className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Reports</CardTitle>
                <div className="flex gap-2">
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="risk">Risk Analysis</SelectItem>
                      <SelectItem value="credit">Credit Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{report.type}</Badge>
                          <span>•</span>
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{report.generatedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {report.status}
                      </Badge>
                      {report.status === 'Completed' && (
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio">Portfolio Summary</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="risk">Risk Analysis</SelectItem>
                  <SelectItem value="credit">Credit Assessment</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" />
                <Input type="date" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}