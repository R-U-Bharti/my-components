// ===============================================
// Author: R U Bharti
// Component: ErrorBoundary.jsx
// Description: Components Error Handling
// ===============================================

import React from 'react'

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };

    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }


    render() {

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function backAndReload() {
            window.history.back();
            await delay(50);
            window.location.reload();
        }

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <div className='w-screen h-screen flex justify-center items-center bg-slate-950 *:text-white'>
                        <div className='border border-slate-700 bg-slate-700/40 rounded-md p-4 md:p-6 flex flex-col items-center justify-center gap-2'>
                            <h1 className='md:text-lg text-sm'>😔 {this.props?.errorMsg} 😔</h1>
                            <div className='flex items-center gap-2 *:transition-all *:duration-200 *:ease-in-out'>
                                <button onClick={() => backAndReload()} className="px-2 border py-1 text-xs rounded cursor-pointer hover:bg-blue-700">Go Back</button>
                                <button onClick={() => (window.sessionStorage.clear(), window.location.replace('/'))} className="px-2 border py-1 text-xs rounded cursor-pointer hover:bg-red-700">Log Out</button>
                                <button onClick={() => window.location.reload()} className="px-2 border py-1 text-xs rounded cursor-pointer hover:bg-orange-700">Reload</button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary