# Zingle

- ***This is a social media app that allows functionalities like***
	- creating post 
	- deleting 
	- posting stories 
	- following 
	- sending message


---
## 🛠️ Tech Stack

### Client side
- React js(vite)
- Tailwind css
- Clerk
- moment
### Server side
- Node js
- express js
- MongoDB
- Cloudinary
- cors



---
## 📂 Project Structure

#### *Client*
```bash
Zingle/
│
├── client/        # Frontend (React + Vite + tailwind)
│   ├── src/
│   │   ├── assets/       # Images, icons, Constatants
|	|   |    └── assets.js
|   |   |            
│   │   ├── components/   
|   |   |    ├── Loading.jsx
|	|   |    ├── MenuItem.jsx
|   |   |    ├── SideBar.jsx
|   |   |    ├── StoriesBar.jsx
|   |   |    ├──
|   |   |    ├──
|   |   |    └── MenuItems.jsx
|   |   |     
│   │   ├── pages/       
|   |   |   ├── index.js
|   |   |   ├── ChatBox.jsx
|   |   |   ├── Connections.jsx
|   |   |   ├── Discover.jsx
|   |   |   ├── Feed.jsx
|   |   |   ├── Layout.jsx
|   |   |   ├── Login.jsx
|   |   |   ├── Messages.jsx
|   |   |   ├── Profile.jsx
|   |   |   └── CreatePost.jsx
|   |   |
│   │   ├── utils/        # using functions
|   |   |   └── Index.js
|   |   |
│   │   ├── constants/    
|   |   |   └──index.js # Static values
|   |   |   
│   │   ├── App.jsx
|   |   ├── .env      # env variable for clerck
│   │   └── main.jsx
│
```
#### *Server*
```bash
|
├── server/
|   |
|   ├── mongodb
|   |    |
|   |    ├── models
|   |    |   ├──   # dummy data
|   |    |   └──   #  mongoose Schema
|   |    └──    # mongoDb connect
|   |  
|   ├── routes
|   |    ├── 
|   |    └── 
|   |
|   ├── index.js   # main server
|   |
│   └── package.json
│
├──.gitignore
└── README.md

```

---
## Notes:-

#### Clerk :
-  Its an most comprehensive user authentication and user management platform
- It provides ready to use component like register signup login
#### moment:
- Its an npm package that lets us show time in the format from now
	` moment(story.createdAt).fromNow()`


---
#### Author
*Aarsh-HV*
