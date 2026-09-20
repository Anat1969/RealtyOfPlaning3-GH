import { useEffect } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { migrateAllLegacy } from '@/lib/imageStore'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/Layout';
import Introduction from './pages/Introduction';
import Disciplines from './pages/Disciplines';
import Synthesis from './pages/Synthesis';
import Criteria from './pages/Criteria';
import Relations from './pages/Relations';
import Calibration from './pages/Calibration';
import Tools from './pages/Tools';
import Prompts from './pages/Prompts';

function App() {
  // Move any images saved by the old (localStorage) version into durable IndexedDB
  useEffect(() => { migrateAllLegacy(); }, []);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Introduction />} />
            <Route path="/disciplines" element={<Disciplines />} />
            <Route path="/synthesis" element={<Synthesis />} />
            <Route path="/criteria" element={<Criteria />} />
            <Route path="/relations" element={<Relations />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
