# Server structure

```bash
|
├── server/
|   |
|   ├── configs
|   |    |
|   |    ├── db.js           # connect db
|   |    ├── multer.js       # multi-part form data        
|   |    └── nodemailer.js
|   | 
|   ├── models
|   |    |
|   |    ├──  user.js         # user schema
|   |    ├──  connections.js
|   |    ├──  message.js
|   |    ├──  post.js 
|   |    └──  story.js
|   | 
|   ├── controllers
|   |    |
|   |    ├──  userController.js
|   |    ├──  connectionController.js
|   |    ├──  postController.js  
|   |    ├──  storyController.js  
|   |    └──  messageController.js  
|   | 
|   ├── middleware
|   |    └── auth.js         # auth middleware
|   | 
|   ├── routes
|   |    ├── userRoutes.js
|   |    ├── connectionRoutes.js
|   |    ├── postRoutes.js
|   |    ├── storyRoutes.js
|   |    └── messageRoutes.js 
|   | 
|   |
|   ├── server.js            # main server
|   ├── .env                 # enviroment variables
│   └── package.json
│
├──.gitignore
└── README.md

```