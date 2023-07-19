import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="100"
      viewBox="0 0 200 100"
      onClick={() => router.push('/')}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7FFF00" />
          <stop offset="100%" stopColor="#87CEEB" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fill="url(#gradient)"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        NebulaYoon
      </text>
    </svg>
  );
};

export default Logo;
