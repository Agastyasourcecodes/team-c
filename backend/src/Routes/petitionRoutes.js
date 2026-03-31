// backend/src/routes/petitionRoutes.js
router.put("/:id/respond", protect, respondToPetition);