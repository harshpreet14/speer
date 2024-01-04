function Loading() {
    return (
      <div className="fixed inset-0 w-full h-full z-50 flex justify-center items-center bg-gray-200">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-600"/>
      </div>
    );
  }
  
  export default Loading;