
import React, { Suspense, lazy, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import reduxStore from "./redux/store";
import './index.scss';


const Login = lazy(() => import('./page/Login'));
const RegisterForm = lazy(() => import('./page/Register'));

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught in Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Login...</div>}>
                <Login />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Register...</div>}>
                <RegisterForm />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>

  );
};

export default App;




const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<React.StrictMode>
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>

</React.StrictMode >)