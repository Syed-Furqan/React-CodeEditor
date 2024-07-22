import CodeEditor from '../components/CodeEditor';
import CodeOutput from '../components/CodeOutput';
import build from '../bundle/build';
import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';
import '../styles/CodeCell-resize-handler.css';

const CodeCell = () => {

    const [ code, setCode ] = useState('');
    const [ transpiling, setTranspiling] = useState(false)
    const [ bundle, setBundle ] = useState('')
    const [ error, setError ] = useState({status: false, message: ''})

    const transpile = async () => {
        setBundle('')
        setError({status: false, message: ''})
        setTranspiling(true)
          
        try {
          const res = await build(code)
          setBundle(res)
        } catch (error: any) {
          setError({status: true, message: error.message})
        } finally {
          setTranspiling(false)
        }
    }

    const onChange = (value: any) => {
        setCode(value)
    }

    return (
        <div className='flex flex-col h-full codecell'>
          <div className='h-[40px] bg-[#333333] bg flex items-center pl-2 gap-2'>
            <Button variant="contained" endIcon={transpiling ? <CircularProgress sx={{color: 'black'}} size={14} /> : <PlayArrowIcon />} 
              color='success'
              sx={{
                width: '80px', height: '26px', textTransform: 'none', "&.Mui-disabled": {background: "#2e7d32"}
              }}
              onClick={transpile}
              disabled={transpiling || code === ''}
            >
              Run
            </Button>
            <Button variant="contained" endIcon={<ClearIcon />} 
              sx={{width: '80px', height: '26px', textTransform: 'none', "&.Mui-disabled": {background: "#1976d2"}}}
              onClick={() => setCode('')}
              disabled={code === ''}
            >
              Clear
            </Button>
          </div>
          <ResizableBox 
            width={Infinity} 
            height={300} 
            resizeHandles={['s']} 
            maxConstraints={[Infinity, 500]}
            minConstraints={[Infinity, 100]}
          >
            <CodeEditor theme='vs-dark' onChange={onChange} code={code} />
          </ResizableBox>
          <div className='flex-1 bg-black p-2 w-[100%]'>
            {error.status ? <p className='text-red-800'>{error.message}</p> : <CodeOutput bundle={bundle} />}
          </div> 
        </div>
    );
}

export default CodeCell;