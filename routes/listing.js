const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listing.js");

router.route("/")
    .get(listingController.index)
    .post(isLoggedIn, upload.single('listing[image]'),
        // validateListing,
        (listingController.createListing));
   

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing,
        (listingController.updateListing))
    .delete(isLoggedIn, isOwner, (listingController.destroyListing));


//Edit the route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;