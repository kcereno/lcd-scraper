const keyframesStyle = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type Props = {
  className?: string;
};

function LoadingSpinner({ className }: Props = {}) {
  return (
    <div className="flex justify-center">
      <div
        className={className}
        style={{
          width: '48px',
          height: '48px',
          border: '5px solid #FFF',
          borderBottomColor: '#FF3D00',
          borderRadius: '50%',
          display: 'inline-block',
          boxSizing: 'border-box',
          animation: 'rotation 1s linear infinite',
        }}
      >
        <style>{keyframesStyle}</style>
      </div>
    </div>
  );
}

export default LoadingSpinner;
