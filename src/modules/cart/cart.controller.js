import Cart from './cart.model.js';
import Product from '../product/product.model.js';
import asyncHandler from '../../utils/asyncHandler.js';

// Helper
const calcTotalPrice = (cart) => {
    let total = 0;
    cart.cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    cart.totalPrice = total;
    cart.totalPriceAfterDiscount = undefined;
};

// POST /cart 
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;


    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });


    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product: productId, quantity, price: product.price }],
        });
    } else {
        const itemIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {

            cart.cartItems[itemIndex].quantity += quantity;
        } else {
            cart.cartItems.push({ product: productId, quantity, price: product.price });
        }
    }

    calcTotalPrice(cart);
    await cart.save();

    res.status(200).json({ message: 'Product Added to Cart', cart });
});

// GET /cart
export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('cartItems.product', 'title imageCover price');

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json({ message: 'Success', cart });
});

// DELETE /cart/:itemId  
export const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { cartItems: { _id: req.params.itemId } } },
        { new: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    calcTotalPrice(cart);
    await cart.save();

    res.status(200).json({ message: 'Item Removed', cart });
});

// PUT /cart/:itemId 
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    console.log('itemId from params:', req.params.itemId);
    console.log('cartItems:', JSON.stringify(cart.cartItems, null, 2));

    const item = cart.cartItems.find(
        item => item._id.toString() === req.params.itemId
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;

    calcTotalPrice(cart);
    await cart.save();

    res.status(200).json({ message: 'Quantity Updated', cart });
});

// DELETE /cart 
export const clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(200).json({ message: 'Cart Cleared' });
});