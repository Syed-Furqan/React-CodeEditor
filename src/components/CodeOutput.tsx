import React, { useEffect, useRef } from "react"
import "../styles/CodeOutput.css"

type CodeOutputProps = {
    bundle: string,
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root" style="color: white"></div>
    <script>
      const handleError = (err) => {
        document.getElementById('root').innerHTML = '<div style="color: red"><p>' + err + '</p></div>'
        console.error(err)
      }
      window.addEventListener('message', event => {
        try{
          eval(event.data)
        } catch (err) {
          handleError(err)
        }
      }, false)

      window.addEventListener('error', event => {
        event.preventDefault()
        handleError(event.error)
      })
    </script>
  </body>
</html>
`;

const CodeOutput: React.FC<CodeOutputProps> = ({ bundle }) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    
    if(iFrameRef.current) {
      // Reset iframe
      iFrameRef.current.srcdoc = html;

      iFrameRef.current.addEventListener("load", function onLoad() {
        iFrameRef.current?.contentWindow?.postMessage(bundle, "*");
        iFrameRef.current?.removeEventListener("load", onLoad);
      });
    } 
    
  }, [bundle])

    return ( 
      <div className="w-[100%] h-[100%] relative iframe-wrapper">      
        <iframe ref={iFrameRef} sandbox="allow-scripts" srcDoc={html} className="w-[100%] h-[100%]" />
      </div>
    );
}

export default CodeOutput;