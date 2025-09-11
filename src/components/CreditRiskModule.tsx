import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calculator,
  BarChart3,
  Users,
  DollarSign,
  Target,
  Zap,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const creditRiskData = {
  portfolioRisk: {
    totalExposure: "K125,000,000",
    highRisk: "K15,200,000",
    mediumRisk: "K45,800,000",
    lowRisk: "K64,000,000",
    par30: 8.5,
    par90: 3.2,
    nplRatio: 2.8
  },
  creditScoring: [
    { id: "CS001", borrower: "John Smith", score: 720, riskLevel: "Low", lastUpdated: "2024-01-20" },
    { id: "CS002", borrower: "Sarah Johnson", score: 650, riskLevel: "Medium", lastUpdated: "2024-01-19" },
    { id: "CS003", borrower: "Michael Brown", score: 580, riskLevel: "High", lastUpdated: "2024-01-18" },
    { id: "CS004", borrower: "Emily Davis", score: 780, riskLevel: "Low", lastUpdated: "2024-01-17" },
    { id: "CS005", borrower: "David Wilson", score: 620, riskLevel: "Medium", lastUpdated: "2024-01-16" },
  ],
  riskAlerts: [
    { id: "RA001", type: "High Risk", borrower: "Michael Brown", amount: "K50,000", reason: "Multiple late payments", severity: "Critical" },
    { id: "RA002", type: "Concentration", borrower: "ABC Corp", amount: "K200,000", reason: "Exceeds exposure limit", severity: "High" },
    { id: "RA003", type: "Industry", borrower: "XYZ Ltd", amount: "K75,000", reason: "High-risk industry exposure", severity: "Medium" },
  ],
  riskModels: [
    { name: "PD Model v2.1", type: "Probability of Default", accuracy: 87.5, lastCalibrated: "2024-01-15", status: "Active" },
    { name: "EAD Model v1.8", type: "Exposure at Default", accuracy: 92.3, lastCalibrated: "2024-01-10", status: "Active" },
    { name: "LGD Model v1.5", type: "Loss Given Default", accuracy: 85.7, lastCalibrated: "2024-01-05", status: "Active" },
  ]
};

export function CreditRiskModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredScoring = creditRiskData.creditScoring.filter(item => {
    const matchesSearch = item.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRiskLevel === 'all' || item.riskLevel.toLowerCase() === selectedRiskLevel;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credit & Risk Management</h1>
          <p className="text-gray-600">Advanced risk assessment and credit scoring tools</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Portfolio Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exposure</p>
                <p className="text-2xl font-semibold">{creditRiskData.portfolioRisk.totalExposure}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">PAR 30</p>
                <p className="text-2xl font-semibold text-orange-600">{creditRiskData.portfolioRisk.par30}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NPL Ratio</p>
                <p className="text-2xl font-semibold text-red-600">{creditRiskData.portfolioRisk.nplRatio}%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Risk Exposure</p>
                <p className="text-2xl font-semibold text-red-600">{creditRiskData.portfolioRisk.highRisk}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Low Risk</span>
              <span className="text-sm text-muted-foreground">51.2%</span>
            </div>
            <Progress value={51.2} className="h-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Medium Risk</span>
              <span className="text-sm text-muted-foreground">36.6%</span>
            </div>
            <Progress value={36.6} className="h-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">High Risk</span>
              <span className="text-sm text-muted-foreground">12.2%</span>
            </div>
            <Progress value={12.2} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scoring">Credit Scoring</TabsTrigger>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          <TabsTrigger value="models">Risk Models</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Risk Assessment Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Run Credit Bureau Check
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Analyze Borrower Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Risk Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Automated Scoring
                </Button>
              </CardContent>
            </Card>

            {/* Recent Risk Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditRiskData.creditScoring.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.borrower}</p>
                        <p className="text-sm text-muted-foreground">Score: {item.score}</p>
                      </div>
                      <Badge className={getRiskColor(item.riskLevel)}>
                        {item.riskLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Borrowers</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Risk Level</Label>
                  <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Scoring Table */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Borrower ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScoring.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.borrower}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.score}</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(item.score / 850) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Risk Alerts ({creditRiskData.riskAlerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditRiskData.riskAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      alert.severity === 'Critical' ? 'bg-red-500' :
                      alert.severity === 'High' ? 'bg-orange-500' :
                      alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="text-sm font-medium">{alert.type}</span>
                      </div>
                      <p className="font-medium">{alert.borrower}</p>
                      <p className="text-sm text-muted-foreground">{alert.reason}</p>
                      <p className="text-sm font-semibold text-red-600">{alert.amount}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Risk Models & Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditRiskData.riskModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">{model.type}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">Accuracy: {model.accuracy}%</span>
                        <span className="text-sm">Last Calibrated: {model.lastCalibrated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={model.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {model.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Calibrate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}