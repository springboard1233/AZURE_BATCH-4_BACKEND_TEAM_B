import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import DashboardPreviewPage from './pages/DashboardPreviewPage';
import ModelHealthPage from './pages/ModelHealthPage';
import OptimizationPage from './pages/OptimizationPage';
import BehaviorIntelligencePage from './pages/BehaviorIntelligencePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ResourcesPage from './pages/ResourcesPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import DeploymentPage from './pages/DeploymentPage';
import LiveDemoPage from './pages/LiveDemoPage';
import FAQPage from './pages/FAQPage';
import SecurityPage from './pages/SecurityPage';
import APIDocsPage from './pages/APIDocsPage';
import PartnersPage from './pages/PartnersPage';
import { KPIModalDemo } from './pages/KPIModalDemo';
import ForecastDashboardPage from './pages/ForecastDashboardPage';
import VisualizationPage from './pages/VisualizationPage';
import ModelComparisonPage from './pages/ModelComparisonPage';
import APIIntegrationPage from './pages/APIIntegrationPage';
import UserEnhancementsPage from './pages/UserEnhancementsPage';
import ModalAnimationsPage from './pages/ModalAnimationsPage';
import AnimationsShowcasePage from './pages/AnimationsShowcasePage';
import UITransitionsShowcasePage from './pages/UITransitionsShowcasePage';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/features':
        return <FeaturesPage />;
      case '/dashboard':
        return <DashboardPreviewPage />;
      case '/model-health':
        return <ModelHealthPage />;
      case '/optimization':
        return <OptimizationPage />;
      case '/behavior':
        return <BehaviorIntelligencePage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/integrations':
        return <IntegrationsPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/why-choose-us':
        return <WhyChooseUsPage />;
      case '/deployment':
        return <DeploymentPage />;
      case '/live-demo':
        return <LiveDemoPage />;
      case '/api-docs':
        return <APIDocsPage />;
      case '/security':
        return <SecurityPage />;
      case '/partners':
        return <PartnersPage />;
      case '/faq':
        return <FAQPage />;
      case '/about':
        return <AboutPage />;
      case '/kpi-modal-demo':
        return <KPIModalDemo />;
      case '/forecast-dashboard':
        return <ForecastDashboardPage />;
      case '/visualization':
        return <VisualizationPage />;
      case '/model-comparison':
        return <ModelComparisonPage />;
      case '/api-integration':
        return <APIIntegrationPage />;
      case '/user-enhancements':
        return <UserEnhancementsPage />;
      case '/modal-animations':
        return <ModalAnimationsPage />;
      case '/animations-showcase':
        return <AnimationsShowcasePage />;
      case '/ui-transitions-showcase':
        return <UITransitionsShowcasePage />;
      default:
        return <HomePage />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}