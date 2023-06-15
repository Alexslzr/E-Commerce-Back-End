const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tag = await Tag.findAll({
      include: [{model: Product,through: "ProductTag"}]
    })
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tag = Tag.findByPk(req.params.id,{
      where: {
        id: req.params.id
      },
      include: [{model: Product,through: "ProductTag"}]
    })
    if(!tag){
      res(404).json({message: "No tag found with this id"})
    }
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create(req.body)
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag = await Tag.update({
      tag_name: req.params.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(!tag){
      res(404).json({message: "No Tag found with this id"})
    }
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

module.exports = router;
