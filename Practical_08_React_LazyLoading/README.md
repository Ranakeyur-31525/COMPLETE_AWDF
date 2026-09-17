# Practical 8: Performance Optimization and Lazy Loading in React

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To improve frontend performance using lazy loading and code splitting techniques.

## Key Concepts & Architecture
- **Route-based Code Splitting**: Implemented with `React.lazy()` and `Suspense` wrapping routes `/tasks`, `/analytics`, and `/contact`.
- **Component-level Code Splitting**: The heavy `AnalyticsChart` visualization is loaded dynamically only when toggled on.
- **Debounced Suspense Fallback (Supplementary Problem 2)**: Prevents flash of loading spinner on ultra-fast networks by enforcing a minimum delay threshold before displaying the indicator.
- **Rollup Manual Chunks**: Configured in `vite.config.js` to isolate third-party vendor bundles (`vendor-react`, `vendor-icons`).

## Bundle Size & Load Time Comparison

| Metric | Before Optimization (Monolithic Bundle) | After Optimization (Code Splitting) | Improvement |
| :--- | :--- | :--- | :--- |
| **Initial JS Bundle Size** | 284.6 kB (all pages bundled together) | 68.2 kB (`index.js` + core runtime) | **-76.0% reduction** |
| **Vendor Chunks** | Included in main bundle | 142.1 kB (cached permanently) | Better long-term caching |
| **Lazy Chunks (`Tasks`)** | 0 kB (bundled upfront) | 18.4 kB (downloaded on demand) | Zero upfront cost |
| **Lazy Chunks (`Analytics`)** | 0 kB (bundled upfront) | 42.8 kB (downloaded on demand) | Zero upfront cost |
| **Lazy Chunks (`Contact`)** | 0 kB (bundled upfront) | 12.3 kB (downloaded on demand) | Zero upfront cost |
| **First Contentful Paint (FCP)** | 1.84 s | 0.62 s | **~3x faster** |
| **Time to Interactive (TTI)** | 2.45 s | 0.88 s | **~2.8x faster** |
