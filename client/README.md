# Client Structure

```bash
Zingle/
│
├── client/        # Frontend (React + Vite + tailwind)
│   ├── src/
│   │   ├── assets/       # Images, icons, Constatants
|	|   |    └── assets.js
|	|   | 
|	|   | 
│   │   ├── api/       # redux store for storing the reducers
|	|   |    └── store.js
|   |   |   
│   │   ├── app/       # axios file for calling base url
|	|   |    └── axios.js
|	|   | 
│   │   ├── features/  
|   |   |     ├── user/ 
|	|   |     |     └──userSlice.js # redux actions reducer file
|   |   |     ├── connections /   
|   |   |     |       └── connectionSlice.js
|   |   |     ├── message/
|   |   |           └── messageSlice.js
|   |   |    
│   │   ├── components/   
|   |   |    ├── Loading
|	|   |    ├── MenuItem
|   |   |    ├── SideBar
|   |   |    ├── StoriesBar
|   |   |    ├── StoryModal
|   |   |    ├── StoryViewer
|   |   |    ├── PostCard
|   |   |    ├── UserCard
|   |   |    ├── UserProfile
|   |   |    ├── Notification
|   |   |    └── MenuItems
|   |   |     
│   │   ├── pages/       
|   |   |   ├── index.js
|   |   |   ├── ChatBox
|   |   |   ├── Connections
|   |   |   ├── Discover
|   |   |   ├── Feed
|   |   |   ├── Layout
|   |   |   ├── Login
|   |   |   ├── Messages
|   |   |   ├── Profile
|   |   |   └── CreatePost
|   |   |
│   │   ├── constants/    
|   |   |   └──index.js # Static values
|   |   |   
│   │   ├── App.jsx
|   |   ├── .env      # env variable for clerck
│   │   └── main.jsx
│
```