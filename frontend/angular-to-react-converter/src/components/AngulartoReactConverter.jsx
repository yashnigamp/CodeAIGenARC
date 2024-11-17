import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Code2, ArrowRight } from "lucide-react";
import axios from "axios";

const AngularToReactConverter = () => {
  const [angularCode, setAngularCode] = useState("");
  const [reactCode, setReactCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConversion = async () => {
    setIsLoading(true);
    // Simulate API call
    //     const exampleConversion = `import React from 'react';

    // const YourComponent = () => {
    //   return (
    //     <div>
    //       {/* Converted component will appear here */}
    //       <p>Your converted React component</p>
    //     </div>
    //   );
    // };

    // export default YourComponent;`;

    //     setTimeout(() => {
    //       setReactCode(exampleConversion);
    //       setIsLoading(false);
    //     }, 1000);
    const response = await axios.post("http://localhost:3000/api/query", {
      prompt: angularCode,
    });
    console.log(response);
    setReactCode(response.data.message);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-indigo-600">
          <CardTitle className="text-white flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            Angular to React Converter
          </CardTitle>
          <p className="text-blue-100 pb-2">
            Transform your Angular components into React with ease
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Angular Component Code
                <span className="text-xs text-gray-500">(Required)</span>
              </label>
              <textarea
                className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-gray-50 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={angularCode}
                onChange={(e) => setAngularCode(e.target.value)}
                placeholder="Paste your Angular component code here..."
                spellCheck="false"
              />
            </div>

            <div className="flex justify-center">
              <button
                className={`
                  group px-6 py-3 rounded-lg font-medium
                  ${
                    isLoading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  }
                  transition-all duration-200 ease-in-out
                  flex items-center gap-2
                `}
                onClick={handleConversion}
                disabled={isLoading || !angularCode}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Converting...
                  </>
                ) : (
                  <>
                    Convert to React
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {reactCode && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  React Component Code
                  <span className="text-xs text-green-500">(Generated)</span>
                </label>
                <div className="relative">
                  <pre className="w-full h-64 p-4 border rounded-lg bg-gray-50 overflow-auto">
                    <code className="text-sm font-mono text-gray-800">
                      {reactCode}
                    </code>
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(reactCode)}
                    className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 
                             text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AngularToReactConverter;
