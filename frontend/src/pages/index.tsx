import BackgroundVideo from '../components/Background';
import Introduce from '../components/Introduce';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <div style={{ marginTop: '88px', position: 'sticky', top: 0, zIndex: 1 }}>
        <BackgroundVideo />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Introduce />
        <Contact />
      </div>
    </>
  );
}
