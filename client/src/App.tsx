import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CostCalculator from "./pages/tools/CostCalculator";
import AreaCalculator from "./pages/tools/AreaCalculator";
import MaterialSelector from "./pages/tools/MaterialSelector";
import Properties from "./pages/Properties";
import Craftsmen from "./pages/Craftsmen";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/tools/cost-calculator"} component={CostCalculator} />
      <Route path={"/tools/area-calculator"} component={AreaCalculator} />
      <Route path={"/tools/material-selector"} component={MaterialSelector} />
      <Route path={"/properties"} component={Properties} />
      <Route path={"/craftsmen"} component={Craftsmen} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
