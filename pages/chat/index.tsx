import { useEffect, useState } from "react";
import { firestore } from "../../utils/firebaseConfig"; // Pastikan jalur import benar
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// Definisikan tipe untuk pesan dan ruang
type Message = {
  id: string;
  text: string;
  sender: string;
};

type Room = {
  id: string;
  name: string;
  password: string; // Tambahkan field password
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState(""); // State untuk password
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // State untuk menampilkan prompt password
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // State untuk menyimpan ID ruang yang dipilih

  // Fetch messages for the current room
  const fetchMessages = async () => {
    if (!currentRoom) return;
    const querySnapshot = await getDocs(collection(firestore, `rooms/${currentRoom}/messages`));
    const messagesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
    setMessages(messagesArray);
  };

  // Add a new message to the current room
  const addMessage = async () => {
    if (newMessage.trim() === "" || !currentRoom) return;
    try {
      await addDoc(collection(firestore, `rooms/${currentRoom}/messages`), {
        text: newMessage,
        sender: "User  ", // Ganti dengan nama pengguna yang sesuai
        timestamp: new Date(),
      });
      setNewMessage("");
      fetchMessages(); // Refresh messages after sending
    } catch (e) {
      console.error("Error adding message: ", e);
    }
  };

  // Create a new room
  const createRoom = async () => {
    if (newRoomName.trim() === "") return;
    const password = prompt("Set a password for the room:"); // Minta password saat membuat ruang
    if (!password) return; // Jika tidak ada password, batalkan
    try {
      const roomRef = await addDoc(collection(firestore, "rooms"), {
        name: newRoomName,
        password: password, // Simpan password
      });
      setRooms([...rooms, { id: roomRef.id, name: newRoomName, password: password }]);
      setNewRoomName("");
    } catch (e) {
      console.error("Error creating room: ", e);
    }
  };

  // Join a room by setting the current room
  const joinRoom = async (roomId: string) => {
    setSelectedRoomId(roomId); // Simpan ID ruang yang dipilih
    setShowPasswordPrompt(true); // Tampilkan prompt password
  };

  // Handle password submission
  const handlePasswordSubmit = async () => {
    const roomRef = doc(firestore, "rooms", selectedRoomId!);
    const roomSnapshot = await getDoc(roomRef);
    const roomData = roomSnapshot.data() as Room;

    if (roomData && roomData.password === roomPassword) {
      setCurrentRoom(selectedRoomId);
      setShowPasswordPrompt(false);
      fetchMessages(); // Fetch messages for the selected room
      setRoomPassword(""); // Reset password input
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(firestore, "rooms"));
      const roomsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        password: doc.data().password,
      })) as Room[];
      setRooms(roomsArray);
    };

    fetchRooms();
  }, []);

  // Fetch messages whenever the current room changes
  useEffect(() => {
    fetchMessages();
  }, [currentRoom]);

  return (
    <div className="flex h-screen bg-base text-text">
  <div className="w-1/4 bg-surface0 border-r border-overlay0">
    <div className="p-4">
      <h2 className="text-lg font-bold text-mauve">Rooms</h2>
      <input
        type="text"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        placeholder="Create a new room"
        className="mt-2 p-2 border border-overlay1 rounded-lg w-full bg-surface1 text-subtext1"
      />
      <button onClick={createRoom} className="mt-2 w-full p-2 bg-blue text-crust rounded-lg">
        Create Room
      </button>
      <ul className="mt-4">
        {rooms.map((room) => (
          <li key={room.id} className="my-1">
            <button onClick={() => joinRoom(room.id)} className="text-blue hover:underline">
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className="flex-1 flex flex-col bg-mantle text-text">
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`my-2 p-3 rounded-lg ${
            message.sender === 'User  '
              ? 'bg-blue text-crust self-end'
              : 'bg-overlay1 text-base self-start'
          }`}
        >
          <strong>{message.sender}:</strong> {message.text}
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-overlay1">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
        className="p-2 border border-overlay1 rounded-lg w-4/5 bg-surface1 text-subtext1"
      />
      <button onClick={addMessage} className="ml-2 p-2 bg-blue text-crust rounded-lg">
        Send
      </button>
    </div>
  </div>

      {/* Password Prompt */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-base bg-opacity-50">
          <div className="bg-base p-4 rounded-lg">
            <h3 className="text-mauve">Enter Room Password</h3>
            <input
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border bg-base rounded-lg w-full"
            />
            <button onClick={handlePasswordSubmit} className="mt-2 w-full p-2 bg-lavender text-base rounded-lg">
              Join Room
            </button>
            <button onClick={() => setShowPasswordPrompt(false)} className="mt-2 w-full p-2 bg-red-500 text-text rounded-lg bg-red">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;