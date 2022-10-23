// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./scss/index.scss";
import AuthProvider from "./context/auth";
import WorkoutProvider from "./context/workouts";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Workout Buddy App</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="#" type="image/x-icon" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <AuthProvider>
              <WorkoutProvider>
                <Header />
                <main class="main">
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </main>
                <Footer />
              </WorkoutProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
