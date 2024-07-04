import userModel from '../models/userModel.js'

// add items to user cart


// this is the complete add to cart functionality where we are adding the ItemId inside the database for the user who have added
// we are also checking the userId so as to verfy the userData
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        //if its the first product
        // we check whether that itemId is present in body
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        //if we already have that item then increase product count
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding item to cart"});
    }
}

// remove items from user cart

const removeFromCart = async (req, res) => {
    try {
        //finding userID
        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success: true, message: "Item removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error removing item from cart"});
    }
}

// fetch user cart data

const getCart= async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error fetching cart data"})
    }
}

export { addToCart, removeFromCart, getCart }