// const express = require('express');
// const router = express.Router();
// const { ensureAuth } = require('../middleware/auth');
// const Story = require('../models/Story');






// // @desc    Show Add Story Page
// // @route   GET /stories/add
// router.get('/add', ensureAuth, (req, res) => {
//     res.render('stories/add');
// });


// // @desc    Show All public stories
// // @route   GET /stories/
// router.get('/', ensureAuth, async(req, res)=>{
//     try {
//         const stories=  await Story.find({status:'public'})
//         .populate('user')
//         .sort({createdAt:'desc'})
//         .lean()
//         res.render('stories/show',{stories, user: req.user})
//     } catch (error) {
//         console.log(error)
//         res.render('error/500')
//     }
// })


// // @desc    Process the Add Story Form
// // @route   POST /stories
// router.post('/', ensureAuth, async (req, res) => {
//     try {
//         const { title, body, status } = req.body;
        
//         // Check if required fields are present
//         if (!title || !body || !status) {
//             return res.status(400).send("All fields are required");
//         }
        
//         // Create a new story with user association
//         await Story.create({
//             title,
//             body,
//             status,
//             user: req.user.id
//         });
        
//         // Redirect to dashboard after successful creation
//         res.redirect('/dashboard');
//     } catch (error) {
//         console.error(error);
//         res.render('error/500');
//     }
// });




// // @desc   single story page
// // @route   GET /stories/:id
// router.get('/:id', ensureAuth, async(req, res) => {
//     try {
//         const story = await Story.findById(req.params.id)
//             .populate('user')
//             .lean()
        
//         if (!story) {
//             return res.render('error/404')
//         }
        
//         res.render('stories/showsinglestory', {
//             story,
//             user: req.user
//         })
//     } catch (error) {
//         console.log(error)
//         res.render('error/500')
//     }
// })




// // @desc    Show edit page
// // @route   GET /stories/edit/:id
// router.get('/edit/:id', ensureAuth, async (req, res) => {
//     const story = await Story.findOne({_id:req.params.id}).lean()
//    if(!story){
//     res.render('error/404')
//    }
   
//    if(story.user != req.user.id){
//     res.redirect('/stories')
//    } else{
//     res.render('stories/edit',{story})
//    }
// });


// // @desc    Delete story
// // @route   DELETE /stories/:id
// router.post('/:id', ensureAuth, async (req, res) => {
//     try {
//         // Find the story by ID
//         let story = await Story.findById(req.params.id).lean()
        
//         // Check if story exists
//         if (!story) {
//             return res.render('error/404')
//         }
        
//         // Check if user is the story owner
//         if (story.user.toString() !== req.user.id) {
//             res.redirect('/stories')
//         } else {
//             await Story.deleteOne({ _id: req.params.id })
//             res.redirect('/dashboard')
//         }
//     } catch (error) {
//         console.error(error)
//         return res.render('error/500')
//     }
// })
// module.exports = router;




const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// @desc    Show Add Story Page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const story = await Story.findOne({_id: req.params.id}).lean()
    if(!story){
        return res.render('error/404')
    }
    
    if(story.user.toString() !== req.user.id){
        return res.redirect('/stories')
    } else{
        res.render('stories/edit', {story})
    }
});

// @desc    Show stories from a specific user
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean()
        
        res.render('stories/show', {
            stories,
            user: req.user
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
});

// @desc    Show All public stories
// @route   GET /stories/
router.get('/', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean()
        
        res.render('stories/show', {
            stories, 
            user: req.user
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
});

// @desc   Single story page
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async(req, res) => {
    try {
        const story = await Story.findById(req.params.id)
            .populate('user')
            .lean()
            
        if (!story) {
            return res.render('error/404')
        }
            
        res.render('stories/showsinglestory', {
            story,
            user: req.user
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
});

// @desc    Process the Add Story Form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        const { title, body, status } = req.body;
            
        // Check if required fields are present
        if (!title || !body || !status) {
            return res.status(400).send("All fields are required");
        }
            
        // Create a new story with user association
        await Story.create({
            title,
            body,
            status,
            user: req.user.id
        });
            
        // Redirect to dashboard after successful creation
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
});

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        // Find the story by ID
        let story = await Story.findById(req.params.id).lean()
            
        // Check if story exists
        if (!story) {
            return res.render('error/404')
        }
            
        // Check if user is the story owner
        if (story.user.toString() !== req.user.id) {
            return res.redirect('/stories')
        } else {
            await Story.deleteOne({ _id: req.params.id })
            return res.redirect('/dashboard')
        }
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }
});

module.exports = router;