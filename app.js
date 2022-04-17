
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const ejs = require("ejs");
var _ = require('lodash');
mongoose.connect("mongodb+srv://srimannarayana56:sree@cluster0.h8ubd.mongodb.net/blogDB?retryWrites=true&w=majority");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema={title:String,content:String};
const Post=mongoose.model("Post",postSchema);
const post1=new Post({title:"HOME",content:homeStartingContent})
const defaultPost=[post1];
//
// console.log(defaultPost);
// let posts=[{
//         title :"Home",
//         content  :homeStartingContent
// }];

app.get("/",function(req,res){
Post.find({},function(err,results){
  if(results.length===0){
     Post.insertMany(defaultPost,function(err){
       if(err){
         console.log(err)
       }else{
         // console.log("succesfully saved default posts")
       }})
       res.redirect("/")
  }else{
    // console.log(results)

    res.render("home",{tweets:results})
    // res.render("home",{tweets:posts})
  }
})
})
app.get("/posts/:postId",function(req,res){
  // console.log(req.params.postId)
//   Post.find({},function(err,results){
//   console.log(results);
//   for (var i = 0; i < results.length; i++) {
//     if(_.lowerCase(req.params.postId)===_.lowerCase(results[i]._id)){
//       console.log("true");
//       res.render("blog",{title:results[i].title,content:results[i].content})
//   }
//   }
// })
Post.findOne({_id: req.params.postId}, function(err, post){
  res.render("blog", {
    title: post.title,
    content: post.content
  });
});
})
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact",{aboutContact:contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose",)
})
app.post("/compose",function(req,res){
  const dayPost=new Post({title:_.capitalize(req.body.postTitle),content:req.body.postBody});
  dayPost.save();
  // let post={
  //         title :req.body.postTitle,
  //         content  :req.body.postBody
  // };
  // posts.push(post);
  res.redirect("/")
  // console.log(posts)
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
