import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

const Home = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Logged In:', user);

      // Ambil nama pengguna dari akun Google
      const userName = user.displayName || "User "; // Gunakan "User " sebagai default jika tidak ada nama

      // Simpan nama pengguna di state atau gunakan langsung
      router.push('/chat'); // Redirect ke halaman chat
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="bg-base min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-text">Welcome to Chat App</h1>
      
      <button 
  onClick={handleGoogleLogin} 
  className="flex items-center justify-center bg-surface1 text-white px-6 py-3 rounded-md shadow-md hover:bg-green transition duration-300">
  <svg 
    className="h-6 w-6 mr-3" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.7 0 6.9 1.4 9.4 3.7l7-7C36.2 2.5 30.4 0 24 0 14.7 0 6.7 5.5 2.8 13.4l7.9 6.1C13.2 12.4 18.2 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24c0-1.6-.2-3.1-.5-4.5H24v9h12.7c-.5 2.8-2 5.1-4.1 6.7l6.4 5C43.4 36.1 46.5 30.5 46.5 24z"/>
    <path fill="#FBBC05" d="M12.1 28.8l-7.9-6.1C2.1 26.4 0 30 0 34c0 3.6 1.4 6.9 3.7 9.4l7-7c-1.6-1.5-2.7-3.6-2.7-6.1 0-1.3.3-2.6.8-3.7z"/>
    <path fill="#4285F4" d="M24 48c6.5 0 12.2-2.2 16.3-6l-7-7c-2.3 1.6-5.3 2.5-9.3 2.5-5.7 0-10.7-3.9-12.5-9.2l-7.9 6.1C6.7 42.5 14.7 48 24 48z"/>
  </svg>
  Login with Google
</button>


      <div className="absolute top-4 right-4">
        <a 
        target='_blank'
        href="https://saweria.co/bimrin"> 
        <button 
          className="bg-surface1 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink transition duration-300">
          Donate😊
        </button>
        </a>
      </div>
      

      <footer className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-surface1 text-text px-6 py-2 rounded-md">
        <p>Made with ❤️ by Bima Adam</p>
      </footer>
    </div>
  );
};

export default Home;
