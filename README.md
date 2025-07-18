# 🚀 DriveBox

A **Google Drive–like web application** that allows users to **upload, download, and manage files** with full **secure authentication**, **Firebase storage**, and **MongoDB database integration**.

---

## 🔧 Features

- ✅ User Registration and Login (JWT-based authentication)
- ✅ Upload files via UI
- ✅ Download uploaded files
- ✅ Store file metadata in MongoDB
- ✅ Store actual files in Firebase Cloud Storage
- ✅ Responsive and modern UI using TailwindCSS + Flowbite

---

## ⚙️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arshul26/DriveBox.git
   cd DriveBox


2. **Download the packages**
- npm start

3. **Run the server**
- npm start
- PORT=3000

# MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/drivebox

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Firebase credentials path (after downloading service account key)
GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-key.json

# Firebase storage bucket name
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com


# 🔥 Firebase Configuration
- Go to Firebase Console and create a project.

- Navigate to Project Settings > Service Accounts

- Click Generate new private key and download the JSON file.

- Save it in ./config/firebase-service-key.json.

- Ensure .gitignore includes this file:

📄 License
This project is licensed under the MIT License.

🙌 Author
Md Arsul Amin
GitHub - Arshul26