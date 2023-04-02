const router = require('express').Router();
const { Tag, Category, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
 Product.findAll({
  include: [
    {
      model: Category,
      attributes: ['id', 'category_name'],
    },
    {
      model: Tag,
      through: ProductTag,
      as: 'tags'
    },
  ],
 })
 .then((products) => res.json(products))
 .catch((err) => {
   console.log(err);
   res.status(500).json(err)
 });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
