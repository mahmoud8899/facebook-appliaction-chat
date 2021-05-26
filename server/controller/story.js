const StoryModel = require('../model/story')


// create story image 
exports.storyImagetime = async (req, res) => {

    const { storyImage } = req.body

    const {userId} = req.user._id

    try {
        let story = await StoryModel.findOne({user: req.user._id})

        if(story)
        {
              
          let noeSto =   await StoryModel.findOne({storyImage}) 
            if(noeSto) return res.status(404).json({message : `we have Some ${storyImage}`})

            story.storyImage.push(storyImage)
            const  saveStory = await story.save()
            await res.status(201).json(saveStory)

            setTimeout(() => {

                const firstnewx = saveStory.remove()
                console.log('remove', firstnewx)

            }, 15 * 60 * 1000);

            
        }else{


          let sistapost =   await StoryModel.findOne({storyImage}) 
            if(sistapost) return res.status(404).json({message : `we have Some ${storyImage}`})

            let story = await StoryModel.create({
                storyImage,
                user: req.user._id
            })

            const newStory = await story.save()
            await res.status(201).json(newStory)

            setTimeout(() => {

                const lastnewx = newStory.remove()
                console.log('remove', lastnewx)

            }, 15 * 60 * 1000);
        }
 


    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


/*
 let story = await StoryModel.create({
                storyImage,
                user: req.user._id
            })

            const newStory = await story.save()
            await res.status(201).json(newStory)

            setTimeout(() => {

                const newx = newStory.remove()
                console.log('remove', newx)

            }, 15 * 60 * 1000);
*/

// vise User.. and Story 
exports.viewStory = async (req, res) => {

    let story = await StoryModel.find({})
    .populate('user')

    if (story) {

       return res.json(story)
    } else {

        return res.status(404).json({ message: 'Not Story Now...' })
    }
}