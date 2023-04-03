const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({include: Product})
    res.json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!category) {
      res.status(404).json({ message: 'Category can not be found'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
 try {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
 } catch (err) {
  res.status(500).json(err);
 }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {id: req.params.id},
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'Category with that ID can not be found!'});
    } else {
      res.json({ message: 'Category successfully updated!'});
    } 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    if(!deleteCategory) {
      res.status(404).json({ message: 'Category with that ID can not be found!'})
    } else {
      res.json({message: 'Category has been successfully deleted!'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
