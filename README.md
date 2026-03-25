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
- Image Kit
- Clerk/Express
- NodeMailer


---
## 📂 Project Structure

```bash
Zingle/ # MERN full stack social media
│
├──  client/        # Frontend (React + Vite + tailwind)
│   
├──  server/         # Backend (Node,Express,MongoDB,Clerk)
|
├──  Package.json
├──  README.md
├── .gitignore
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

#### REDUX:
- using  it for state management and api call 
### *Server*

#### Inngest:
- this helps in batch processing, queue and background jobs and cron jobs

#### Clerk/express:
- This is used for auth update of the user in the backend 
#### ImageKit:
- This is an tool to turn the iamge into url change its size type and other things to use

#### Nodemailer:
- Nodemailer is the most popular email sending library for Node.js. It makes sending emails straightforward and secure, with zero runtime dependencies to manage.

---

### Important:-

#### *Client*

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

- we use regex to transform the input to the html format we want
	`post.content.replace(/(#\w+)/g,'<span class="text-indigo-600">$1</span>')`
- We use `dangerouslySetHTML` to use it. Its called dangerous because it can cause XSS(Cross scripting attack).

- In JavaScript, the parameters of `.map()` **must be in the correct order**.
- So the **first parameter is the element (your `message`)**, and the **second is the index**.
```jsx
messages.map((message, index) => (
  <Link key={index} className='flex items-start gap-2 py-2 hover:bg-slate-100'>
    <img src={message.from_user_id.profile_picture} alt="" className='w-8 h-8 rounded-full'/>
  </Link>
))
```
- Now the variables are **swapped**:
	- `index` = actually the **message object**
	- `message` = actually the **number index**
*so this gives error since the messages have (1,2,3,...)*
*Here the index is assigned by JS itself.*


### *Server*
#### INNGEST error:

- *There was an problem in connecting INNGEST  to the clerk clerk was sending the sessions but the INNGEST was not holding a trigger to it due  to  naming and writing technique*
- *Used Triggers keyword for the trigger , Renamed id to hard refresh it make sure the naming of the old is changed and the triggers are added in each of the path.*
- *After the triggers are visible in the apps and the events the events start working.*

#### Image Kit:
- *Its documentation has changed and we don't need to create a separate file for its env it pulls it directly from there*
- *There the path is changed to the source*
- ***What is `src` (or old `path`) actually?
> 	the relative path of your file inside ImageKit storage***


#### Inngest CRON:
- *You can create scheduled jobs using cron schedules within Inngest natively. Inngest's cron schedules also support timezones, allowing you to schedule work in whatever timezone you need work to run in.*

```js
const sendNotificationOfUnseenMessages = inngest.createFunction(
  {
    id: "send-unseen-messages-notification",
    triggers: { cron: "TZ+America/New_York 0 9 * * *" },//everyday at 9 AM
  },
  async (params) => {},
);
```

---

#### Author
*Aarsh-HV*



  
