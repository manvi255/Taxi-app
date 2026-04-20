function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} border-4 border-primary-200 dark:border-primary-800 border-t-primary-500 rounded-full animate-spin`}></div>
    </div>
  );
}

export default LoadingSpinner;