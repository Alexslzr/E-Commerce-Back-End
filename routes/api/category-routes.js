const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const categories = await Category.findAll({
    include: [{ model: Product, as: 'Product'}],
  });
  res.status(200).json(categories);
  } catch(err){
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
   // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product, as: 'Product'}]
    })

    if(!category){
      res.status(404).json({message: "No category found with this id"})
    }
  } catch (err){
    res(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res(200).json(categories)
  } catch (err){
    res(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const tag = await Category.update(req.body,{
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    })
    res(200).json(tag)
  } catch(err){
    res(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!categories){
      res(404).json({message: "No Category found with this id"})
    }
  } catch (err){
    res(400).json(err)
  }
});

module.exports = router;
