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
- React JS (VITE)
- Tailwind CSS
- Clerk
- moment
- React-hot-toast
### Server side
- Node JS
- express JS
- MongoDB
- CLOUDINARY
- CORS



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

#### React-hot-toast:
- Add beautiful notifications to your React app with [react-hot-toast](https://github.com/timolins/react-hot-toast).
- `npm i react-hot-toast`
- put `<Toaster/>` in app.jsx
- then we can use toast with promise
```jsx
onClick={()=>toast.promise(handleCreateStory(),{
            loading:'Saving...',
            success:<p>story Added</p>,
            error:e=><p>{e.message}</p>
        })}
```

---

#### Important:-
- *Here the `media.type` is the MIME type it can be anything image video null. `?` allows if it null it doesn't crash.*
- *If the mime type starts with image like `image/png` , `image/jpeg` it gives true.*
```jsx
(media?.type.startswith("image") ? (
              <img
                src={previewUrl}
                alt=""
                className="object-contain max-h-full"
              />
            ) : (
              <video src={previewUrl} className="object-contain max-h-full" />
            ))
```

---
#### Author
*Aarsh-HV*
