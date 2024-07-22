import './App.css'
import { useEffect, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeCell from './components/CodeCell';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { LinearProgress } from '@mui/material';

function App() {

  const [ loading, setLoading] = useState(true)
  const [ error, setError ] = useState({status: false, message: ''})

  useEffect(() => {
    initializeESBuild()
      .then(() => setLoading(false))
      .catch(err => {
        setError({status: true, message: err.message})
      })
      .finally(() => setLoading(false))
  }, [])

  const initializeESBuild = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.23.0/esbuild.wasm'
    })
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className={`flex flex-row h-[calc(100vh-50px)] w-[100%]`}>
        <Sidebar />
        <div className='h-full flex-grow'>
          { loading ? 
            <div className='w-[100%]'>
              <LinearProgress />
            </div>
            : error.status ? <p>{error.message}</p> : 
            <CodeCell /> 
          }
        </div>
      </div>
    </div>
  );
}

export default App;