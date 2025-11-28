# Frontend Walkthrough Speech

Hi everyone, thanks for joining. I’m excited to guide you through the Azure Demand Forecasting frontend and show how it brings the FastAPI data to life.

Let’s start at the **Dashboard Preview**. As soon as we land, the cards, radial heatmap, and charts all call the backend through `useBackendData`. Every metric you see—CPU utilization, cost efficiency, top regions—comes directly from `/api/kpis`, `/api/insights`, and the other FastAPI endpoints. Update the CSV in `back/data/processed` and this page reflects it instantly.

Next, I’ll jump into the **Forecast Dashboard**. The controls on top let us pick horizon, region, metric, and model. Behind the scenes we reuse the same backend responses, recompute confidence bands, and show region share plus dataset stats that align with the FastAPI insights. The export button even gives us the JSON slice used for the chart so analysts can take it offline.

From there, I like to highlight the **API Integration Center**. This page is our developer landing zone. It lists every FastAPI route, gives copy-paste code examples for Python, JavaScript, and cURL, and includes a live tester. When I click “Send Request,” it hits the running backend (respecting `VITE_API_BASE_URL`) and echoes the JSON so teams can verify their environment quickly.

Throughout the app we use a shared design system—glassmorphism cards, neon gradients, and motion micro-interactions—to keep the experience consistent, but the real value is the tight coupling with the backend. Any change to the FastAPI data layer surfaces instantly across dashboards, modals, and API docs.

To wrap up: the frontend isn’t a mockup. It’s a fully wired experience that helps stakeholders explore the modeling output, planners monitor capacity, and developers integrate the API without leaving the site. Thanks, and I’m happy to dive deeper into any section.

