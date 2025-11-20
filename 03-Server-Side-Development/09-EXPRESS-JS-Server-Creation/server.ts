import express from "express";
import path from "path";
import type { IProfile } from "./database/IProfile";

const app: express.Application = express();

const hostName: string = "127.0.0.1";
const port: number = 5000;

// ⭐ Required for __dirname in TS (Node ESM)
const __dirname = path.resolve();

// -------------------------------------------
// STATIC FILES (CSS / JS / IMAGES)
// -------------------------------------------
app.use("/public", express.static(path.join(__dirname, "public")));

// -------------------------------------------
// BASIC HTML RESPONSE
// -------------------------------------------
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`<h2>Welcome to Express JS</h2>`);
});

// -------------------------------------------
// SEND COMPLETE HTML PAGE
// -------------------------------------------
app.get("/home", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

// -------------------------------------------
// JSON RESPONSE (Profile Data)
// -------------------------------------------
const profile: IProfile = {
  login: "sandeepanshu",
  id: 25869485,
  node_id: "MDQ6VXNlcjI1ODY5NDg1",
  avatar_url: "https://avatars.githubusercontent.com/u/25869485?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/sandeepanshu",
  html_url: "https://github.com/sandeepanshu",
  followers_url: "https://api.github.com/users/sandeepanshu/followers",
  following_url:
    "https://api.github.com/users/sandeepanshu/following{/other_user}",
  gists_url: "https://api.github.com/users/sandeepanshu/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/sandeepanshu/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/sandeepanshu/subscriptions",
  organizations_url: "https://api.github.com/users/sandeepanshu/orgs",
  repos_url: "https://api.github.com/users/sandeepanshu/repos",
  events_url: "https://api.github.com/users/sandeepanshu/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/sandeepanshu/received_events",
  type: "User",
  site_admin: false,
  name: "NAVEEN SAGGAM",
  company: "https://www.youtube.com/c/uibrains",
  blog: "https://t.me/joinchat/H3ErUQ91InUKU50o1EIwCg",
  location: "Hyderabad",
  email: null,
  hireable: null,
  bio: "Enthusiastic Web Developer , Trainer and Blogger ",
  twitter_username: null,
  public_repos: 20,
  public_gists: 82,
  followers: 1789,
  following: 1,
  created_at: "2017-02-18T18:44:26Z",
  updated_at: "2021-02-04T12:06:00Z",
};

// API route
app.get("/profile", (req, res) => {
  res.status(200).json(profile);
});

// -------------------------------------------
// DOWNLOAD FILE
// -------------------------------------------
app.get("/notes", (req, res) => {
  const filePath = path.join(__dirname, "notes", "notes.txt");

  console.log("Looking for:", filePath);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File not found");
    }
  });
});

// -------------------------------------------
// START SERVER
// -------------------------------------------
app.listen(port, hostName, () => {
  console.log(`Express Server is Started at http://${hostName}:${port}`);
});
