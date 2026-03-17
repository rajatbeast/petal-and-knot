const router = require("express").Router();
const Cart = require("../models/Cart");
const { protect } = require("../middleware/auth");

// Get cart
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update item
// router.post("/add", protect, async (req, res) => {
//   try {
//     const { productId, name, price, emoji, quantity = 1 } = req.body;
//     let cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

//     const existing = cart.items.find((i) => i.product.toString() === productId);
//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, name, price, emoji, quantity });
//     }
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post('/add', protect, async (req, res) => {
  try {
    const { productId, name, price, emoji, image, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, name, price, emoji, image, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update quantity
router.put("/update/:productId", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId,
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== req.params.productId,
      );
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId,
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete("/clear", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
