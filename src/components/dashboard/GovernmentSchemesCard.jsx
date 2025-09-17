import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, CheckCircle, Clock, Gift, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const GovernmentSchemesCard = () => {
  const [isSchemesOpen, setIsSchemesOpen] = useState(false);
  const { toast } = useToast();

  const availableSchemes = [
    {
      name: 'Drip Irrigation Scheme',
      benefit: 'Up to ₹50,000 assistance',
      status: 'new',
      description: 'Subsidy for installing drip irrigation systems to promote water conservation'
    },
    {
      name: 'PM-KISAN',
      benefit: '₹6,000/year direct benefit',
      status: 'due',
      description: 'Direct income support to small and marginal farmers'
    },
    {
      name: 'Crop Insurance Scheme',
      benefit: 'Premium subsidy available',
      status: 'eligible',
      description: 'Comprehensive crop insurance coverage against natural disasters'
    },
    {
      name: 'Soil Health Card Scheme',
      benefit: 'Free soil testing',
      status: 'eligible',
      description: 'Free soil health assessment and recommendations'
    }
  ];

  const allSchemes = [
    ...availableSchemes,
    {
      name: 'National Mission on Sustainable Agriculture',
      benefit: 'Technical and financial support',
      status: 'eligible',
      description: 'Promoting sustainable farming practices and technologies'
    },
    {
      name: 'Rashtriya Krishi Vikas Yojana',
      benefit: 'Infrastructure development support',
      status: 'eligible',
      description: 'State-level agricultural development programs'
    }
  ];

  const checkEligibility = () => {
    const eligibleSchemes = availableSchemes.filter(scheme => 
      scheme.status === 'eligible' || scheme.status === 'new'
    );
    
    toast({
      title: "Eligibility Check Complete",
      description: `You are eligible for ${eligibleSchemes.length} schemes`,
    });

    // Simulate detailed eligibility results
    setTimeout(() => {
      const details = eligibleSchemes.map(scheme => 
        `${scheme.name}: ${scheme.benefit}`
      ).join(', ');
      
      toast({
        title: "Eligible Schemes",
        description: details,
      });
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Gift className="h-4 w-4 text-green-600" />;
      case 'due':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'eligible':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new':
        return 'New Scheme Available';
      case 'due':
        return 'Payment Due Soon';
      case 'eligible':
        return 'You are Eligible';
      default:
        return 'Check Eligibility';
    }
  };

  const getAlertVariant = (status) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'due':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Government Schemes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Alert variant={getAlertVariant('new')}>
          <Gift className="h-4 w-4 text-green-600" />
          <AlertDescription>
            🎉 New subsidy available: Drip Irrigation Scheme - Up to ₹50,000 assistance
          </AlertDescription>
        </Alert>

        <Alert variant={getAlertVariant('due')}>
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            ⏰ PM-KISAN payment due in 3 days. Ensure KYC is updated.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button onClick={checkEligibility} size="sm" className="flex-1">
            <CheckCircle className="w-4 h-4 mr-2" />
            Check Eligibility
          </Button>
          
          <Dialog open={isSchemesOpen} onOpenChange={setIsSchemesOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                View All
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>All Government Schemes</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {allSchemes.map((scheme, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{scheme.name}</h4>
                        <p className="text-sm text-muted-foreground">{scheme.description}</p>
                        <div className="text-sm font-medium text-primary mt-1">
                          Benefit: {scheme.benefit}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {getStatusIcon(scheme.status)}
                        <span>{getStatusText(scheme.status)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1">Apply for Eligible Schemes</Button>
                <Button variant="outline">Download Guidelines</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Quick Status</h4>
          {availableSchemes.slice(0, 2).map((scheme, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
              <span className="text-sm">{scheme.name}</span>
              <div className="flex items-center gap-1 text-xs">
                {getStatusIcon(scheme.status)}
                <span>{getStatusText(scheme.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};