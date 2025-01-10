const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
global.StatusCodes = require("http-status-codes").StatusCodes;

const { ConnectDatabase } = require("./database/databaseConnector");

// ✅ CORS Configuration Updated for Vercel Deployment
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serving Static Files for Image Uploads
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routes
const booksRouter = require("./routes/bookRoutes");
const bookCategoryRouter = require("./routes/bookCategoryRoutes");
const booksRouterLimitSkip = require("./routes/bookRoutesLimitSkip");
const booksRouterRecentBooks = require("./routes/booksRoutesRecentBooks");
const booksRouterFeaturedBooks = require("./routes/booksRoutesFeatured");
const requestBookRouter = require("./routes/requestBooksRoute");
const popularBooksRouter = require("./routes/popularBooksRoutes");
const userRouter = require("./routes/usersRoute");
const CheckBookReturnRouter = require("./routes/checkBookReturn");
const signUpRouter = require("./routes/signUpRoute");
const loginRouter = require("./routes/loginRoutes");
const logoutRouter = require("./routes/logoutRoute");
const forgotpasswordRouter = require("./routes/forgotpassword");
const filterRouter = require("./routes/filterRoutes");
const adminHomePageInfoRouter = require("./routes/adminHomePageInfoRoute");

// ✅ Middleware Imports
const CustomError = require("./errorHandler/CustomError");
const PageNotFound = require("./errorHandler/PageNotFound");
const verifyToken = require("./middleware/verifyToken");
const adminAuthorization = require("./middleware/adminAuth");

// ✅ Route Handling
app.use("/api/v1/signup", signUpRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", verifyToken, logoutRouter);
app.use("/api/v1/forgotpassword", forgotpasswordRouter);
app.use("/api/v1/filter", filterRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/book_category", bookCategoryRouter);
app.use("/api/v1/book", booksRouterLimitSkip);
app.use("/api/v1/recentBooks", booksRouterRecentBooks);
app.use("/api/v1/featuredBooks", booksRouterFeaturedBooks);
app.use("/api/v1/requestBooks", verifyToken, requestBookRouter);
app.use("/api/v1/popularBooks", popularBooksRouter);
app.use("/api/v1/users", verifyToken, userRouter);
app.use("/api/v1/checkbookreturn", CheckBookReturnRouter);
app.use("/api/v1/adminHomePageInfo", verifyToken, adminAuthorization, adminHomePageInfoRouter);

// ✅ Additional Routes
const UpdateUserEmailRouter = require("./routes/updateUserEmailRoute");
app.use("/api/v1/updateUserEmail", verifyToken, adminAuthorization, UpdateUserEmailRouter);

const SimilarBooksRouter = require("./routes/similarBooksRouter");
app.use("/api/v1/similarBooks", SimilarBooksRouter);

const recommendedBooksRouter = require("./routes/recommendBooksRouter");
app.use("/api/v1/recommendedBooks", verifyToken, recommendedBooksRouter);

// ✅ Recommendation Algorithm Testing Endpoint
const { algoTest } = require("./controller/bookRecommendationAlgorithm");
app.get("/api/algotest", algoTest);

// ✅ MongoDB Query Test Route
const QueryRouter = require("./utils/MongoDbQuery");
app.use("/api/v1/query", QueryRouter);

// ✅ Error Handling Middlewares
app.use(CustomError);
app.use(PageNotFound);

// ✅ Database Connection and Server Initialization
const port = process.env.PORT || 5000;
const InitiateServer = async () => {
    try {
        await ConnectDatabase(process.env.CONNECTION_URL);
        console.log("✅ Connected to Database Successfully");
        
        // ✅ Adjusted for Vercel Deployment (port handling)
        app.listen(port, () => {
            console.log(`🚀 Server started at port ${port}`);
        });
    } catch (error) {
        console.error("❌ Error Starting Server:", error.message);
        process.exit(1);  // Ensure proper failure handling
    }
};

InitiateServer();

// ✅ Exporting for Vercel's Serverless Handling
module.exports = app;
