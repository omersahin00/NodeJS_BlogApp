const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryid", async function(req, res) {
    try {
        const categoryid = req.params.categoryid;
        const [blogs] = await db.execute("select * from Blog where categoryid = ?", [categoryid]);
        const [categories] = await db.execute("select * from Category");
        if (blogs) {
            id = parseInt(categoryid) - 1;
            res.render("users/blogs", {
                title: categories[id].title,
                blogs: blogs,
                categories: categories
            });
        }
        else res.redirect("/");
    }
    catch (error) {
        console.log(error);
    }
});

router.use("/blogs/:blogid", async function(req, res){
    try {
        const blogID = req.params.blogid;
        const [blogs] = await db.execute("select * from Blog where blogid = ?", [blogID]);
        const blog = blogs[0]; // veriler dizi olarak geldiği için dizi içerisinden ilk elemanı seçmemiz gerekior.
        if (blog){
            res.render("users/blog-details", {
                title: blog.baslik,
                blog: blog
            });
        }
        else res.redirect("/");
    }
    catch (error) {
        console.log(error);
    }
});

router.use("/blogs", async function(req, res){
    try {
        const [blogs] = await db.execute("select * from Blog where onay = 1");
        const [categories] = await db.execute("select * from Category");
        res.render("users/blogs", {
            title: "Popüler Kurslar",
            blogs: blogs, 
            categories: categories
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.use("/", async function(req, res){
    try {
        const [blogs] = await db.execute("select * from Blog where anasayfa = 1");
        const [categories] = await db.execute("select * from Category");
        res.render("users/index", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories
        });
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;
