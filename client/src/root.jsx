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

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Workout Buddy App</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Header />
            <main class="main">
              <Routes>
                <FileRoutes />
              </Routes>
            </main>
            <Footer />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
