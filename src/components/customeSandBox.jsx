import { Sandpack } from "@codesandbox/sandpack-react";


const CustomSandpack = ({ codeFiles, sandpackKey }) => {
return <Sandpack
template="react"
files={codeFiles}
key={sandpackKey}
options={{ showConsole: true }}
customSetup={{
    dependencies: {
      "react": "latest",
      "react-dom": "latest",
      "antd": "latest",
      "@ant-design/icons": "latest",
      'styled-components': 'latest',
    }
  }}
/>





};

export default CustomSandpack